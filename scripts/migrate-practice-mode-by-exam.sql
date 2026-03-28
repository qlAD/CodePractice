ALTER TABLE practice_records
  MODIFY COLUMN practice_mode ENUM(
    'by_language', 'by_type', 'by_paper', 'by_exam',
    'exam', 'by_chapter'
  ) NOT NULL COMMENT '练习模式';

UPDATE practice_records SET practice_mode = 'by_paper' WHERE practice_mode = 'by_chapter';
UPDATE practice_records SET practice_mode = 'by_exam' WHERE practice_mode = 'exam';

ALTER TABLE practice_records
  MODIFY COLUMN practice_mode ENUM('by_language', 'by_type', 'by_paper', 'by_exam') NOT NULL COMMENT '练习模式';
