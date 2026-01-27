import re
import json
import datetime
import os

# 多个输入文件
INPUT_FILES = [
    r'c:\Users\qlAD\Documents\Projects\CodePractice\scripts\text2sql\745.txt',
    r'c:\Users\qlAD\Documents\Projects\CodePractice\scripts\text2sql\746.txt',
    r'c:\Users\qlAD\Documents\Projects\CodePractice\scripts\text2sql\752.txt'
]
OUTPUT_FILE = r'c:\Users\qlAD\Documents\Projects\CodePractice\scripts\text2sql\questions.sql'

def parse_difficulty(text):
    if '易' in text: return 'easy'
    if '中' in text: return 'medium'
    if '难' in text: return 'hard'
    return 'medium'

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
    
    # Global metadata
    language = 'java' # Default
    
    # Regex patterns
    question_start_pattern = re.compile(r'^第\d+题.*（(\d+\.?\d*)分）.*题号:\d+.*难度:(.).*第(\d+)章')
    option_pattern = re.compile(r'^\(([A-Z])\)(.*)')
    
    current_section_type = None
    
    # Identify language
    for line in lines[:20]:
        if '所属科目：' in line:
            lang_str = line.split('：')[1].strip().lower()
            if 'java' in lang_str: language = 'java'
            elif 'c++' in lang_str: language = 'cpp'
            elif 'python' in lang_str: language = 'python'
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
        match = question_start_pattern.match(line)
        if match:
            # Save previous question if exists
            if current_q:
                questions.append(current_q)
            
            # Start new question
            score = float(match.group(1))
            difficulty_char = match.group(2)
            chapter_id = int(match.group(3))
            
            current_q = {
                'language': language,
                'type': current_section_type,
                'chapter_id': chapter_id,
                'difficulty': parse_difficulty(difficulty_char),
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

def deduplicate_questions(questions):
    """去除重复题目"""
    seen = {}
    unique_questions = []
    
    for q in questions:
        # 构建去重键
        key_parts = [
            q['language'],
            q['type'],
            str(q['chapter_id']),
            q['difficulty'],
            q['content'],
            q.get('options') or 'NULL',
            q.get('code_template') or 'NULL'
        ]
        # 确保所有部分都是字符串
        key_parts = [str(part) for part in key_parts]
        key = "|".join(key_parts)
        
        if key not in seen:
            seen[key] = True
            unique_questions.append(q)
    
    return unique_questions

def generate_sql(questions):
    # 去重
    unique_questions = deduplicate_questions(questions)
    
    sql_header = "INSERT INTO code_practice.questions (`language`,`type`,chapter_id,difficulty,content,`options`,code_template,answer,score,created_at,updated_at) VALUES\n"
    
    values_list = []
    
    # Use fixed timestamp to match example or current? User said "match example.sql".
    # Example has '2026-01-25 13:23:36'. I'll use current.
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    for q in unique_questions:
        lang = f"'{q['language']}'"
        q_type = f"'{q['type']}'"
        chap = str(q['chapter_id'])
        diff = f"'{q['difficulty']}'"
        
        content = escape_sql(q['content'])
        
        options = q.get('options')
        if options:
             options = escape_sql(options) # json string to sql string
        else:
            options = 'NULL'
        
        code_tpl = escape_sql(q['code_template'])
        
        answer = escape_sql(q['answer'])
        
        score = str(q['score'])
        
        val = f"\t ({lang},{q_type},{chap},{diff},{content},{options},{code_tpl},{answer},{score},'{now}','{now}')"
        values_list.append(val)
        
    return sql_header + ",\n".join(values_list) + ";"

if __name__ == '__main__':
    all_questions = []
    processed_files = 0
    
    # 解析所有文件
    for file_path in INPUT_FILES:
        if os.path.exists(file_path):
            qs = parse_file(file_path)
            all_questions.extend(qs)
            processed_files += 1
            print(f"已解析 {file_path}，获取 {len(qs)} 道题目")
        else:
            print(f"警告：文件 {file_path} 不存在")
    
    original_count = len(all_questions)
    
    # 去重
    unique_questions = deduplicate_questions(all_questions)
    unique_count = len(unique_questions)
    duplicate_count = original_count - unique_count
    
    # 生成 SQL
    sql_header = "INSERT INTO code_practice.questions (`language`,`type`,chapter_id,difficulty,content,`options`,code_template,answer,score,created_at,updated_at) VALUES\n"
    
    values_list = []
    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    for q in unique_questions:
        lang = f"'{q['language']}'"
        q_type = f"'{q['type']}'"
        chap = str(q['chapter_id'])
        diff = f"'{q['difficulty']}'"
        
        content = escape_sql(q['content'])
        
        options = q.get('options')
        if options:
             options = escape_sql(options)
        else:
            options = 'NULL'
        
        code_tpl = escape_sql(q['code_template'])
        
        answer = escape_sql(q['answer'])
        
        score = str(q['score'])
        
        val = f"\t ({lang},{q_type},{chap},{diff},{content},{options},{code_tpl},{answer},{score},'{now}','{now}')"
        values_list.append(val)
    
    sql = sql_header + ",\n".join(values_list) + ";"
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(sql)
    
    print(f"\n处理完成：")
    print(f"共处理 {processed_files} 个文件")
    print(f"解析出 {original_count} 道题目")
    print(f"去除重复后剩余 {unique_count} 道题目")
    print(f"共去除 {duplicate_count} 道重复题目")
    print(f"已生成 SQL 到 {OUTPUT_FILE}")
