import re
import json
import datetime
import os
import sys


def paper_id_from_filename(filepath):
    stem = os.path.splitext(os.path.basename(filepath))[0]
    if stem.isdigit():
        return int(stem)
    return None

def escape_sql(text):
    if text is None: return 'NULL'
    # Escape backslashes first, then single quotes
    # MySQL requires backslashes to be escaped (e.g. \n -> \\n in the string literal if we want literal \n, 
    # but here we want the actual character in the DB? 
    # If the file contains a newline character, we write it as is.
    # But if the file contains a literal backslash (e.g. in code), we need to double it.
    escaped = text.replace('\\', '\\\\').replace("'", "''")
    return "'" + escaped + "'"

def parse_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')

    questions = []

    language = 'java'
    default_paper_id = paper_id_from_filename(filepath)

    # 新格式：第1题 （1.0分）；旧格式：含 题号: 难度: 第N章
    question_start_new = re.compile(r'^第\d+题\s*[（(](\d+\.?\d*)分[）)]')
    question_start_old = re.compile(
        r'^第\d+题.*[（(](\d+\.?\d*)分[）)].*题号:\d+.*难度:.+.*第(\d+)章'
    )
    option_pattern = re.compile(r'^\(([A-Z])\)(.*)')

    current_section_type = None

    if default_paper_id is None:
        for line in lines[:40]:
            if '试卷编号' in line:
                m = re.search(r'试卷编号\s*[：:]\s*(\d+)', line)
                if m:
                    default_paper_id = int(m.group(1))
                break

    for line in lines[:20]:
        if '所属科目：' in line:
            lang_str = line.split('：')[1].strip().lower()
            if 'java' in lang_str:
                language = 'java'
            elif 'c++' in lang_str:
                language = 'cpp'
            elif 'python' in lang_str:
                language = 'python'
            break
            
    current_q = None
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Check for section headers
        if '一、单选' in line:
            current_section_type = 'single_choice'
            i += 1
            continue
        elif '二、程序填空' in line:
            current_section_type = 'fill_blank'
            i += 1
            continue
        elif '三、程序改错' in line:
            current_section_type = 'error_fix'
            i += 1
            continue
        elif '四、程序设计' in line:
            current_section_type = 'programming'
            i += 1
            continue
            
        if '━━━━━━━━━━━━━━━━' in line:
            i += 1
            continue
            
        # Check for question start
        match = question_start_new.match(line)
        paper_id = default_paper_id
        score = None
        if match:
            score = float(match.group(1))
        else:
            match = question_start_old.match(line)
            if match:
                score = float(match.group(1))
                paper_id = int(match.group(2))

        if match and current_section_type is not None and score is not None:
            if current_q:
                questions.append(current_q)

            current_q = {
                'language': language,
                'type': current_section_type,
                'paper_id': paper_id,
                'score': int(score),
                'content': '',
                'options': [],
                'code_template': None,
                'answer': '',
                'lines': [] # Temp storage for lines
            }
            i += 1
            continue
            
        if current_q:
            # We store the raw line (not stripped) to preserve indentation in code
            current_q['lines'].append(lines[i]) 
            
        i += 1
        
    # Append last question
    if current_q:
        questions.append(current_q)
        
    # Now process each question to extract fields
    processed_questions = []
    
    for q in questions:
        lines_list = q['lines']
        
        # 1. Separate Answer
        # Find "答案："
        answer_idx = -1
        for idx, line in enumerate(lines_list):
            if line.strip().startswith('答案：'):
                answer_idx = idx
                break
        
        if answer_idx != -1:
            answer_part = lines_list[answer_idx:]
            # answer_part[0] is "答案：X" or "答案："
            
            # Remove "答案：" from the first line
            answer_part[0] = answer_part[0].replace('答案：', '', 1)
            
            # Join all lines. This handles single line answers (rest are empty/non-existent)
            # and multi-line answers (rest are code/text).
            final_answer = '\n'.join(answer_part).strip()
            
            q['answer'] = final_answer
            content_lines = lines_list[:answer_idx]
        else:
            # No answer found
            content_lines = lines_list
            
        # 2. Process Content/Options/Code
        
        # Remove empty lines at start/end of content
        while content_lines and not content_lines[0].strip():
            content_lines.pop(0)
        while content_lines and not content_lines[-1].strip():
            content_lines.pop()
            
        if q['type'] == 'single_choice':
            # Extract Options
            options = []
            final_content_lines = []
            
            # Logic: Content lines until first option (A)
            # Then options capture
            
            current_option_text = []
            in_options = False
            
            for line in content_lines:
                stripped = line.strip()
                match = option_pattern.match(stripped)
                
                if match:
                    # Start of a new option
                    in_options = True
                    # If we were building an option, save it
                    if current_option_text:
                        options.append('\n'.join(current_option_text).strip())
                        current_option_text = []
                    
                    # Start new option text
                    # The pattern captures content after (X)
                    current_option_text.append(match.group(2).strip())
                else:
                    if in_options:
                        # Continue current option
                        if stripped:
                            current_option_text.append(stripped)
                    else:
                        # Still in content
                        if stripped:
                            final_content_lines.append(line.rstrip())
            
            # Append last option
            if current_option_text:
                options.append('\n'.join(current_option_text).strip())
            
            q['content'] = '\n'.join(final_content_lines).strip()
            q['options'] = json.dumps(options)
            
        else:
            # Fill Blank / Error Fix / Programming
            
            # Find comment block for Content
            comment_start = -1
            comment_end = -1
            
            for idx, line in enumerate(content_lines):
                if '/*' in line and comment_start == -1:
                    comment_start = idx
                if '*/' in line and comment_start != -1:
                    comment_end = idx
                    break # Stop at the first closing of the first comment block
            
            if comment_start != -1 and comment_end != -1:
                # Content is inside comment
                desc_lines = content_lines[comment_start:comment_end+1]
                cleaned_desc = []
                for l in desc_lines:
                    l_strip = l.strip()
                    if '/*' in l_strip or '*/' in l_strip or l_strip.startswith('----') or l_strip.startswith('==='):
                        continue
                    if not l_strip: continue # Skip empty lines in description?
                    # Remove "【程序填空】" etc
                    if '【' in l_strip and '】' in l_strip: continue
                    
                    cleaned_desc.append(l.rstrip())
                
                q['content'] = '\n'.join(cleaned_desc).strip()
                
                # Code template is after comment
                code_lines = content_lines[comment_end+1:]
                # Remove leading empty lines from code
                while code_lines and not code_lines[0].strip():
                    code_lines.pop(0)
                    
                q['code_template'] = '\n'.join(code_lines) # Preserve indent
                
            else:
                # Fallback
                q['content'] = '\n'.join([l.rstrip() for l in content_lines if l.strip()]).strip()
        
        processed_questions.append(q)

    return processed_questions

def generate_sql(questions):
    if not questions:
        return '-- 无题目\n'

    parts = []
    paper_id = questions[0].get('paper_id')

    paper_id_sql = 'NULL'
    papers_id_lit = None
    if paper_id is not None:
        pid = int(paper_id)
        papers_id_lit = escape_sql(str(pid))
        # 题目挂 papers.id；后台建的卷往往是 id=1、papers_id=66，不能写死 paper_id=66
        paper_id_sql = (
            f'(SELECT id FROM code_practice.papers WHERE papers_id = {papers_id_lit} LIMIT 1)'
        )
        parts.append(
            '-- 请先在后台创建该试卷，papers_id 须与文件名数字一致（如 66.txt -> papers_id=66）\n'
        )

    sql_header = (
        'INSERT INTO code_practice.questions '
        '(`language`,`type`,paper_id,content,`options`,code_template,answer,score,created_at,updated_at) VALUES\n'
    )

    values_list = []
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    for q in questions:
        lang = f"'{q['language']}'"
        q_type = f"'{q['type']}'"
        pid = paper_id_sql

        content = escape_sql(q['content'])

        options = q.get('options')
        if options:
            options = escape_sql(options)
        else:
            options = 'NULL'

        code_tpl = escape_sql(q['code_template'])

        answer = escape_sql(q['answer'])

        score = str(q['score'])

        val = f"\t ({lang},{q_type},{pid},{content},{options},{code_tpl},{answer},{score},'{now}','{now}')"
        values_list.append(val)

    parts.append(sql_header + ',\n'.join(values_list) + ';\n')

    if paper_id is not None and papers_id_lit is not None:
        parts.append(
            '\nUPDATE code_practice.papers p '
            'SET p.question_count = (SELECT COUNT(*) FROM code_practice.questions q WHERE q.paper_id = p.id) '
            f'WHERE p.papers_id = {papers_id_lit};\n'
        )

    return ''.join(parts)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("用法: python txt_to_sql.py <试卷编号>.txt")
        print("示例: python txt_to_sql.py 66.txt  -> 生成 66.sql")
        sys.exit(1)

    file_path = sys.argv[1]
    if not os.path.isfile(file_path):
        print(f"文件不存在: {file_path}")
        sys.exit(1)

    stem = os.path.splitext(os.path.basename(file_path))[0]
    out_path = os.path.join(os.path.dirname(os.path.abspath(file_path)), f'{stem}.sql')

    qs = parse_file(file_path)
    sql = generate_sql(qs)

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(sql)

    print(f"已解析 {len(qs)} 道题目 -> {out_path}")
