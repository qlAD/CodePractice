import mysql from 'mysql2/promise'

// 数据库连接池配置
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'code_practice',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

// 导出数据库查询方法
export const db = {
  // 执行查询 - 使用 query 而非 execute 以更好地处理动态参数
  async query<T>(sql: string, params?: unknown[]): Promise<T[]> {
    // 将参数转换为正确的类型，确保数字参数正确传递
    const safeParams = params?.map(p => {
      if (typeof p === 'number') return p
      if (typeof p === 'string') return p
      if (p === null || p === undefined) return null
      return String(p)
    })
    const [rows] = await pool.query(sql, safeParams)
    return rows as T[]
  },

  // 执行单条查询
  async queryOne<T>(sql: string, params?: unknown[]): Promise<T | null> {
    const rows = await this.query<T>(sql, params)
    return rows[0] || null
  },

  // 插入数据
  async insert(
    table: string,
    data: Record<string, unknown>
  ): Promise<{ insertId: number }> {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const placeholders = keys.map(() => '?').join(', ')

    const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`
    const [result] = await pool.query(sql, values)
    return { insertId: (result as mysql.ResultSetHeader).insertId }
  },

  // 更新数据
  async update(
    table: string,
    data: Record<string, unknown>,
    where: string,
    whereParams: unknown[]
  ): Promise<{ affectedRows: number }> {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const setClause = keys.map((key) => `${key} = ?`).join(', ')

    const sql = `UPDATE ${table} SET ${setClause} WHERE ${where}`
    const [result] = await pool.query(sql, [...values, ...whereParams])
    return { affectedRows: (result as mysql.ResultSetHeader).affectedRows }
  },

  // 删除数据
  async delete(
    table: string,
    where: string,
    whereParams: unknown[]
  ): Promise<{ affectedRows: number }> {
    const sql = `DELETE FROM ${table} WHERE ${where}`
    const [result] = await pool.query(sql, whereParams)
    return { affectedRows: (result as mysql.ResultSetHeader).affectedRows }
  },

  // 获取连接池
  getPool() {
    return pool
  },
}

// 数据库类型定义
export interface DBStudent {
  id: number
  student_id: string
  password: string
  name: string
  class_name: string | null
  major: string | null
  status: 'active' | 'inactive' | 'locked'
  last_login: Date | null
  created_at: Date
  updated_at: Date
}

export interface DBTeacher {
  id: number
  teacher_id: string
  password: string
  name: string
  department: string | null
  role: 'admin' | 'teacher'
  permissions: string | null
  status: 'active' | 'inactive'
  last_login: Date | null
  created_at: Date
  updated_at: Date
}

export interface DBQuestion {
  id: number
  language: 'java' | 'cpp' | 'python'
  type: 'single_choice' | 'fill_blank' | 'error_fix' | 'programming'
  chapter_id: number | null
  difficulty: 'easy' | 'medium' | 'hard'
  content: string
  options: string | null
  code_template: string | null
  answer: string
  score: number
  created_at: Date
  updated_at: Date
}

export interface DBChapter {
  id: number
  language: 'java' | 'cpp' | 'python'
  name: string
  description: string | null
  sort_order: number
  question_count: number
  created_at: Date
  updated_at: Date
}

export interface DBPracticeRecord {
  id: number
  student_id: number
  practice_config_id: number | null
  practice_mode: 'by_language' | 'by_type' | 'by_chapter' | 'exam'
  language: 'java' | 'cpp' | 'python' | null
  question_type:
    | 'single_choice'
    | 'fill_blank'
    | 'error_fix'
    | 'programming'
    | null
  chapter_id: number | null
  total_questions: number
  correct_count: number
  wrong_count: number
  score: number
  total_score: number
  time_spent: number
  status: 'in_progress' | 'completed' | 'abandoned'
  started_at: Date
  completed_at: Date | null
}

export interface DBAnswerRecord {
  id: number
  practice_record_id: number
  question_id: number
  student_answer: string | null
  is_correct: boolean | null
  score: number
  time_spent: number
  is_marked: boolean
  answered_at: Date
}

export interface DBWrongAnswer {
  id: number
  student_id: number
  question_id: number
  wrong_answer: string | null
  wrong_count: number
  review_count: number
  status: 'pending' | 'reviewing' | 'mastered'
  last_wrong_at: Date
  last_review_at: Date | null
  created_at: Date
  updated_at: Date
}

export default db
