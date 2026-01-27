// Excel Parser using SheetJS (xlsx)
import * as XLSX from 'xlsx'

export interface ParsedStudent {
  student_id: string
  name: string
  class_name: string
  major: string
  password?: string
}

export interface ParsedTeacher {
  teacher_id: string
  name: string
  department: string
  role: 'teacher' | 'admin'
}

export interface ParsedQuestion {
  type: 'single_choice' | 'fill_blank' | 'error_fix' | 'programming'
  language: 'java' | 'cpp' | 'python'
  chapter_id: string
  difficulty: 'easy' | 'medium' | 'hard'
  content: string
  options?: string // JSON string for single choice
  code_template?: string
  answer: string
  score: number
}

export interface ParseResult<T> {
  success: boolean
  data: T[]
  errors: Array<{ row: number; message: string }>
  totalRows: number
}

// Parse Excel file to JSON
export function parseExcelFile(file: File): Promise<any[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }) as any[][]
        resolve(jsonData)
      } catch (error) {
        reject(new Error('Excel文件解析失败'))
      }
    }
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsArrayBuffer(file)
  })
}

// Parse student data from Excel
export async function parseStudentExcel(file: File): Promise<ParseResult<ParsedStudent>> {
  const rows = await parseExcelFile(file)
  const errors: Array<{ row: number; message: string }> = []
  const data: ParsedStudent[] = []

  // Skip header row
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (!row || row.length === 0 || !row[0]) continue

    const [student_id, name, class_name, major, password] = row.map(cell => 
      cell?.toString().trim() || ''
    )

    // Validation
    if (!student_id) {
      errors.push({ row: i + 1, message: '学号不能为空' })
      continue
    }
    if (!name) {
      errors.push({ row: i + 1, message: '姓名不能为空' })
      continue
    }
    if (!class_name) {
      errors.push({ row: i + 1, message: '班级不能为空' })
      continue
    }

    data.push({
      student_id,
      name,
      class_name,
      major: major || '',
      password: password || '123456',
    })
  }

  return {
    success: errors.length === 0,
    data,
    errors,
    totalRows: rows.length - 1,
  }
}

// Parse teacher data from Excel
export async function parseTeacherExcel(file: File): Promise<ParseResult<ParsedTeacher>> {
  const rows = await parseExcelFile(file)
  const errors: Array<{ row: number; message: string }> = []
  const data: ParsedTeacher[] = []

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (!row || row.length === 0 || !row[0]) continue

    const [teacher_id, name, department, role] = row.map(cell => 
      cell?.toString().trim() || ''
    )

    if (!teacher_id) {
      errors.push({ row: i + 1, message: '工号不能为空' })
      continue
    }
    if (!name) {
      errors.push({ row: i + 1, message: '姓名不能为空' })
      continue
    }

    data.push({
      teacher_id,
      name,
      department: department || '',
      role: role === 'admin' ? 'admin' : 'teacher',
    })
  }

  return {
    success: errors.length === 0,
    data,
    errors,
    totalRows: rows.length - 1,
  }
}

// Parse question data from Excel
export async function parseQuestionExcel(file: File): Promise<ParseResult<ParsedQuestion>> {
  const rows = await parseExcelFile(file)
  const errors: Array<{ row: number; message: string }> = []
  const data: ParsedQuestion[] = []

  const validTypes = ['single_choice', 'fill_blank', 'error_fix', 'programming']
  const validLanguages = ['java', 'cpp', 'python']
  const validDifficulties = ['easy', 'medium', 'hard']

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (!row || row.length === 0 || !row[0]) continue

    const [type, language, chapter_id, difficulty, content, options, code_template, answer,score] = 
      row.map(cell => cell?.toString().trim() || '')

    // Validation
    if (!validTypes.includes(type)) {
      errors.push({ row: i + 1, message: `题型无效: ${type}` })
      continue
    }
    if (!validLanguages.includes(language)) {
      errors.push({ row: i + 1, message: `语言无效: ${language}` })
      continue
    }
    if (!validDifficulties.includes(difficulty)) {
      errors.push({ row: i + 1, message: `难度无效: ${difficulty}` })
      continue
    }
    if (!content) {
      errors.push({ row: i + 1, message: '题目内容不能为空' })
      continue
    }
    if (!answer) {
      errors.push({ row: i + 1, message: '答案不能为空' })
      continue
    }

    data.push({
      type: type as ParsedQuestion['type'],
      language: language as ParsedQuestion['language'],
      chapter_id: chapter_id || '1',
      difficulty: difficulty as ParsedQuestion['difficulty'],
      content,
      options: type === 'single_choice' ? options : undefined,
      code_template: code_template || undefined,
      answer,
      score: Number.parseInt(score) || 10,
    })
  }

  return {
    success: errors.length === 0,
    data,
    errors,
    totalRows: rows.length - 1,
  }
}

// Generate template Excel for download
export function generateStudentTemplate(): Uint8Array {
  const ws = XLSX.utils.aoa_to_sheet([
    ['学号', '姓名', '班级', '专业', '初始密码(可选)'],
    ['2021001001', '张三', '计算机2101班', '计算机科学与技术', '123456'],
    ['2021001002', '李四', '计算机2101班', '计算机科学与技术', ''],
  ])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '学生信息')
  return XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
}

export function generateTeacherTemplate(): Uint8Array {
  const ws = XLSX.utils.aoa_to_sheet([
    ['工号', '姓名', '邮箱', '电话', '院系', '角色(teacher/admin)'],
    ['T001', '王老师', 'wang@example.com', '13800138000', '计算机学院', 'teacher'],
    ['T002', '李老师', 'li@example.com', '13900139000', '计算机学院', 'admin'],
  ])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '教师信息')
  return XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
}

export function generateQuestionTemplate(): Uint8Array {
  const ws = XLSX.utils.aoa_to_sheet([
    ['题型', '语言', '章节ID', '难度', '题目内容', '选项(JSON)', '代码模板', '答案', '解析', '分值'],
    ['single_choice', 'java', '1', 'easy', 'Java中以下哪个不是基本数据类型？', '["int","String","boolean","char"]', '', 'B', 'String是引用类型', '10'],
    ['fill_blank', 'python', '2', 'medium', '请补充代码，实现列表排序', '', 'list._____()', 'sort', '使用sort()方法原地排序', '15'],
    ['programming', 'cpp', '3', 'hard', '编写一个函数计算斐波那契数列第n项', '', '#include <iostream>\n// 在此编写代码', 'int fib(int n) { ... }', '可以使用递归或动态规划', '20'],
  ])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '题库')
  return XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
}

// Helper to download file
export function downloadExcelTemplate(data: Uint8Array, filename: string) {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
