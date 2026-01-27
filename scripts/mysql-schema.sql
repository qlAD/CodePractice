-- =====================================================
-- CodePractice 多语言程序设计在线练习平台 - MySQL 数据库建表脚本
-- =====================================================

-- 设置客户端字符集
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_connection = utf8mb4;

-- 删除旧数据库（如果需要重新创建）
DROP DATABASE IF EXISTS code_practice;

-- 创建数据库
CREATE DATABASE code_practice 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE code_practice;

-- 设置数据库默认字符集
ALTER DATABASE code_practice CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- =====================================================
-- 1. 用户相关表
-- =====================================================

-- 学生表
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id VARCHAR(20) NOT NULL UNIQUE COMMENT '学号',
  password VARCHAR(255) NOT NULL COMMENT '密码',
  name VARCHAR(50) NOT NULL COMMENT '姓名',
  class_name VARCHAR(50) COMMENT '班级',
  major VARCHAR(100) COMMENT '专业',
  status ENUM('active', 'inactive', 'locked') DEFAULT 'active' COMMENT '状态',
  last_login DATETIME COMMENT '最后登录时间',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_student_id (student_id),
  INDEX idx_class (class_name),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='学生表';

-- 教师表
CREATE TABLE teachers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  teacher_id VARCHAR(20) NOT NULL UNIQUE COMMENT '工号',
  password VARCHAR(255) NOT NULL COMMENT '密码',
  name VARCHAR(50) NOT NULL COMMENT '姓名',
  department VARCHAR(100) COMMENT '部门',
  role ENUM('admin', 'teacher') DEFAULT 'teacher' COMMENT '角色',
  permissions JSON COMMENT '权限列表',
  status ENUM('active', 'inactive') DEFAULT 'active' COMMENT '状态',
  last_login DATETIME COMMENT '最后登录时间',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_teacher_id (teacher_id),
  INDEX idx_role (role),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='教师表';

-- =====================================================
-- 2. 题库相关表
-- =====================================================

-- 章节表
CREATE TABLE chapters (
  id INT PRIMARY KEY AUTO_INCREMENT,
  language ENUM('java', 'cpp', 'python') NOT NULL COMMENT '编程语言',
  name VARCHAR(100) NOT NULL COMMENT '章节名称',
  description TEXT COMMENT '章节描述',
  sort_order INT DEFAULT 0 COMMENT '排序',
  question_count INT DEFAULT 0 COMMENT '题目数量',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_language (language),
  INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='章节表';

-- 题目表
CREATE TABLE questions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  language ENUM('java', 'cpp', 'python') NOT NULL COMMENT '编程语言',
  type ENUM('single_choice', 'fill_blank', 'error_fix', 'programming') NOT NULL COMMENT '题型',
  chapter_id INT COMMENT '章节ID',
  difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium' COMMENT '难度',
  content TEXT NOT NULL COMMENT '题目内容',
  options JSON COMMENT '选项(选择题)',
  code_template TEXT COMMENT '代码模板(非选择题)',
  answer TEXT NOT NULL COMMENT '答案',
  score INT DEFAULT 10 COMMENT '分值',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE SET NULL,
  INDEX idx_language (language),
  INDEX idx_type (type),
  INDEX idx_chapter (chapter_id),
  INDEX idx_difficulty (difficulty),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='题目表';

-- =====================================================
-- 3. 练习相关表
-- =====================================================

-- 练习记录表
CREATE TABLE practice_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL COMMENT '学生ID',
  practice_mode ENUM('by_language', 'by_type', 'by_chapter', 'exam') NOT NULL COMMENT '练习模式',
  language ENUM('java', 'cpp', 'python') COMMENT '语言',
  question_type ENUM('single_choice', 'fill_blank', 'error_fix', 'programming') COMMENT '题型',
  chapter_id INT COMMENT '章节ID',
  total_questions INT NOT NULL COMMENT '总题数',
  correct_count INT DEFAULT 0 COMMENT '正确数',
  wrong_count INT DEFAULT 0 COMMENT '错误数',
  score INT DEFAULT 0 COMMENT '得分',
  total_score INT DEFAULT 100 COMMENT '总分',
  time_spent INT DEFAULT 0 COMMENT '用时(秒)',
  status ENUM('in_progress', 'completed', 'abandoned') DEFAULT 'in_progress' COMMENT '状态',
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME COMMENT '完成时间',
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE SET NULL,
  INDEX idx_student (student_id),
  INDEX idx_status (status),
  INDEX idx_time (started_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='练习记录表';

-- 答题记录表
CREATE TABLE answer_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  practice_record_id INT NOT NULL COMMENT '练习记录ID',
  question_id INT NOT NULL COMMENT '题目ID',
  student_answer TEXT COMMENT '学生答案',
  is_correct TINYINT(1) COMMENT '是否正确',
  score INT DEFAULT 0 COMMENT '得分',
  time_spent INT DEFAULT 0 COMMENT '用时(秒)',
  is_marked TINYINT(1) DEFAULT 0 COMMENT '是否标记',
  answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (practice_record_id) REFERENCES practice_records(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
  INDEX idx_practice (practice_record_id),
  INDEX idx_question (question_id),
  INDEX idx_correct (is_correct)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='答题记录表';

-- =====================================================
-- 4. 错题本表
-- =====================================================

CREATE TABLE wrong_answers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL COMMENT '学生ID',
  question_id INT NOT NULL COMMENT '题目ID',
  wrong_answer TEXT COMMENT '错误答案',
  wrong_count INT DEFAULT 1 COMMENT '错误次数',
  review_count INT DEFAULT 0 COMMENT '复习次数',
  status ENUM('pending', 'reviewing', 'mastered') DEFAULT 'pending' COMMENT '状态',
  last_wrong_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '最后错误时间',
  last_review_at DATETIME COMMENT '最后复习时间',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
  UNIQUE KEY uk_student_question (student_id, question_id),
  INDEX idx_student (student_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='错题本表';

-- =====================================================
-- 5. 系统日志表
-- =====================================================

CREATE TABLE system_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_type ENUM('student', 'teacher', 'system') NOT NULL COMMENT '用户类型',
  user_id INT COMMENT '用户ID',
  user_name VARCHAR(50) COMMENT '用户名',
  module VARCHAR(50) NOT NULL COMMENT '模块',
  action VARCHAR(100) NOT NULL COMMENT '操作',
  detail TEXT COMMENT '详情',
  ip_address VARCHAR(45) COMMENT 'IP地址',
  user_agent TEXT COMMENT '浏览器信息',
  status ENUM('success', 'failed', 'warning') DEFAULT 'success' COMMENT '状态',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user (user_type, user_id),
  INDEX idx_module (module),
  INDEX idx_time (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统日志表';

-- =====================================================
-- 6. 系统设置表
-- =====================================================

CREATE TABLE system_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  setting_key VARCHAR(50) NOT NULL UNIQUE COMMENT '设置键',
  setting_value TEXT COMMENT '设置值',
  setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string' COMMENT '值类型',
  description VARCHAR(255) COMMENT '描述',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统设置表';

-- 提示信息
SELECT '数据库初始化完成！' AS message;
SELECT '请访问 /admin/login 登录管理后台' AS login_url;
