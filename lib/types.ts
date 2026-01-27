// User types
export interface Student {
  id: number
  student_id: string
  name: string
  class_name: string
  major: string
  password_hash: string
  created_at: string
  updated_at: string
}

export interface Teacher {
  id: number
  username: string
  name: string
  password_hash: string
  role: 'admin' | 'teacher'
  permissions: string[]
  created_at: string
  updated_at: string
}

// Question types
export type Language = 'java' | 'cpp' | 'python'
export type QuestionType = 'single_choice' | 'fill_blank' | 'error_fix' | 'programming'
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Question {
  id: number
  language: Language
  type: QuestionType
  chapter: string
  difficulty: Difficulty
  content: string
  code_template?: string
  options?: string[] // For single choice questions
  answer: string
  score: number
  created_at: string
  updated_at: string
}

// Practice types
export interface PracticeSession {
  id: number
  student_id: number
  language?: Language
  type?: QuestionType
  chapter?: string
  mode: 'language' | 'type' | 'chapter' | 'exam'
  started_at: string
  finished_at?: string
  total_questions: number
  correct_count: number
  score: number
}

export interface PracticeAnswer {
  id: number
  session_id: number
  question_id: number
  student_answer: string
  is_correct: boolean
  time_spent: number // in seconds
  created_at: string
}

// Wrong answer book
export interface WrongAnswer {
  id: number
  student_id: number
  question_id: number
  wrong_answer: string
  wrong_count: number
  status: 'pending' | 'reviewing' | 'mastered'
  last_practiced_at?: string
  created_at: string
}

// Statistics
export interface StudentStats {
  total_questions: number
  correct_count: number
  accuracy_rate: number
  by_language: Record<Language, { total: number; correct: number; rate: number }>
  by_type: Record<QuestionType, { total: number; correct: number; rate: number }>
  by_chapter: Record<string, Record<string, { total: number; correct: number; rate: number }>>
  recent_sessions: PracticeSession[]
}

// Chapter configuration
export interface Chapter {
  id: string
  name: string
  language: Language
  order: number
}

// Exam configuration
export interface ExamConfig {
  language: Language
  single_choice_count: number
  single_choice_score: number
  fill_blank_count: number
  fill_blank_score: number
  error_fix_count: number
  error_fix_score: number
  programming_count: number
  programming_score: number
  time_limit: number // in minutes
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Auth types
export interface AuthUser {
  id: number
  student_id: string
  name: string
  class_name: string
  major: string
}

export interface LoginRequest {
  student_id: string
  password: string
  remember_me?: boolean
}

export interface LoginResponse {
  user: AuthUser
  token: string
}

// Teacher auth types
export interface TeacherAuthUser {
  id: number
  username: string
  name: string
  role: 'admin' | 'teacher'
  permissions: TeacherPermission[]
}

export type TeacherPermission = 
  | 'user_management'
  | 'question_management'
  | 'practice_management'
  | 'system_management'
  | 'all'

export interface TeacherLoginRequest {
  username: string
  password: string
}

export interface TeacherLoginResponse {
  user: TeacherAuthUser
  token: string
}

// Announcement type
export interface Announcement {
  id: number
  title: string
  content: string
  type: 'notice' | 'exam' | 'update'
  created_at: string
  updated_at: string
}

// System log type
export interface SystemLog {
  id: number
  user_id: number
  user_type: 'student' | 'teacher'
  user_name: string
  action: string
  details: string
  ip_address: string
  created_at: string
}

// Practice rule configuration
export interface PracticeRuleConfig {
  allow_view_answer_during_practice: boolean
  wrong_answer_book_retention_days: number
  max_exam_retake_count: number
}

// Mock exam type
export interface MockExam {
  id: number
  title: string
  language: Language
  class_ids: number[]
  exam_config: ExamConfig
  start_time: string
  end_time: string
  status: 'draft' | 'published' | 'in_progress' | 'ended'
  created_at: string
}

// Class type
export interface ClassInfo {
  id: number
  name: string
  major: string
  student_count: number
  created_at: string
}
