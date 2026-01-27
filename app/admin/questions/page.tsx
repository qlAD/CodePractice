'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Upload,
  Download,
  BookOpen,
  Eye,
  Loader2,
  FolderPlus,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Language, QuestionType, Difficulty } from '@/lib/types'
import { ImportDialog } from '@/components/admin/import-dialog'
import * as XLSX from 'xlsx'
import {
  parseQuestionExcel,
  generateQuestionTemplate,
  downloadExcelTemplate,
  type ParsedQuestion,
} from '@/lib/excel-parser'

interface Question {
  id: number
  language: Language
  type: QuestionType
  chapter_id: number | null
  chapter_name?: string
  difficulty: Difficulty
  content: string
  options?: string[]
  code_template?: string
  answer: string
  score: number
  status: string
  created_at: string
}

interface Chapter {
  id: number
  language: Language
  name: string
  description?: string
  sort_order: number
  status: string
}

const typeLabels: Record<QuestionType, string> = {
  single_choice: '单选题',
  fill_blank: '填空题',
  error_fix: '改错题',
  programming: '编程题',
}

const difficultyLabels: Record<Difficulty, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
}

const languageLabels: Record<Language, string> = {
  java: 'Java',
  cpp: 'C/C++',
  python: 'Python',
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewingQuestion, setViewingQuestion] = useState<Question | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Chapter management
  const [isChapterDialogOpen, setIsChapterDialogOpen] = useState(false)
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null)
  const [newChapter, setNewChapter] = useState({
    language: 'java' as Language,
    name: '',
    description: '',
    sort_order: 1,
  })
  
  // New chapter inline creation
  const [isCreatingNewChapter, setIsCreatingNewChapter] = useState(false)
  const [inlineNewChapterName, setInlineNewChapterName] = useState('')
  
  const [newQuestion, setNewQuestion] = useState({
    language: 'java' as Language,
    type: 'single_choice' as QuestionType,
    chapter_id: '',
    difficulty: 'easy' as Difficulty,
    content: '',
    code_template: '',
    options: ['', '', '', ''],
    answer: '',
    score: 10,
  })

  const fetchQuestions = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedLanguage !== 'all') params.set('language', selectedLanguage)
      if (selectedType !== 'all') params.set('type', selectedType)
      if (selectedDifficulty !== 'all') params.set('difficulty', selectedDifficulty)
      params.set('limit', '100')
      
      const res = await fetch(`/api/questions?${params}`)
      const data = await res.json()
      if (data.success) {
        setQuestions(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedLanguage, selectedType, selectedDifficulty])

  const fetchChapters = async () => {
    try {
      const res = await fetch('/api/chapters')
      const data = await res.json()
      if (data.success) {
        setChapters(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch chapters:', error)
    }
  }

  useEffect(() => {
    fetchQuestions()
    fetchChapters()
  }, [fetchQuestions])

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.content.includes(searchQuery) || q.id.toString().includes(searchQuery)
    return matchesSearch
  })

  const languageChapters = chapters.filter(c => c.language === newQuestion.language)
  
  // Create new chapter inline
  const handleCreateChapterInline = async () => {
    if (!inlineNewChapterName.trim()) return
    
    try {
      const maxOrder = languageChapters.reduce((max, ch) => Math.max(max, ch.sort_order), 0)
      const res = await fetch('/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: newQuestion.language,
          name: inlineNewChapterName.trim(),
          description: '',
          sort_order: maxOrder + 1,
        }),
      })
      const data = await res.json()
      if (data.success) {
        await fetchChapters()
        // Select the new chapter
        setNewQuestion({ ...newQuestion, chapter_id: data.data.id.toString() })
        setInlineNewChapterName('')
        setIsCreatingNewChapter(false)
      } else {
        alert(data.error || '创建章节失败')
      }
    } catch (error) {
      console.error('Failed to create chapter:', error)
      alert('创建章节失败')
    }
  }

  const isQuestionDuplicate = (question: any): boolean => {
    const chapterId = question.chapter_id ? Number(question.chapter_id) : null
    const options = question.type === 'single_choice' ? question.options.filter((o: string) => o).sort().join(',') : null
    const codeTemplate = ['fill_blank', 'error_fix', 'programming'].includes(question.type) ? question.code_template : null
    
    return questions.some(q => 
      q.language === question.language &&
      q.type === question.type &&
      q.chapter_id === chapterId &&
      q.difficulty === question.difficulty &&
      q.content === question.content &&
      JSON.stringify(q.options?.sort()) === JSON.stringify(options?.split(',').sort()) &&
      q.code_template === codeTemplate
    )
  }

  const handleAddQuestion = async () => {
    if (!newQuestion.content || !newQuestion.answer) return
    
    if (isQuestionDuplicate(newQuestion)) {
      alert('该题目已存在，请勿重复添加')
      return
    }
    
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newQuestion,
          chapter_id: newQuestion.chapter_id ? Number(newQuestion.chapter_id) : null,
          options: newQuestion.type === 'single_choice' ? newQuestion.options.filter(o => o) : null,
          code_template: ['fill_blank', 'error_fix', 'programming'].includes(newQuestion.type) ? newQuestion.code_template : null,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setNewQuestion({
          language: 'java',
          type: 'single_choice',
          chapter_id: '',
          difficulty: 'easy',
          content: '',
          code_template: '',
          options: ['', '', '', ''],
          answer: '',
          score: 10,
        })
        setIsAddDialogOpen(false)
        fetchQuestions()
      } else {
        alert(data.error || '添加失败')
      }
    } catch (error) {
      console.error('Failed to add question:', error)
      alert('添加失败')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateQuestion = async () => {
    if (!editingQuestion || !editingQuestion.content || !editingQuestion.answer) return

    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/questions/${editingQuestion.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: editingQuestion.language,
          type: editingQuestion.type,
          chapter_id: editingQuestion.chapter_id || null,
          difficulty: editingQuestion.difficulty,
          content: editingQuestion.content,
          options: editingQuestion.type === 'single_choice' ? editingQuestion.options : null,
          code_template: editingQuestion.code_template,
          answer: editingQuestion.answer,
          score: editingQuestion.score,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setEditingQuestion(null)
        setIsEditDialogOpen(false)
        fetchQuestions()
      } else {
        alert(data.error || '更新失败')
      }
    } catch (error) {
      console.error('Failed to update question:', error)
      alert('更新失败')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteQuestion = async (id: number) => {
    if (!confirm('确定要删除该题目吗？')) return
    
    try {
      const res = await fetch(`/api/questions/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        fetchQuestions()
      } else {
        alert(data.error || '删除失败')
      }
    } catch (error) {
      console.error('Failed to delete question:', error)
      alert('删除失败')
    }
  }
  
  // Chapter CRUD
  const handleAddChapter = async () => {
    if (!newChapter.name.trim()) return
    
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChapter),
      })
      const data = await res.json()
      if (data.success) {
        setNewChapter({ language: 'java', name: '', description: '', sort_order: 1 })
        setIsChapterDialogOpen(false)
        fetchChapters()
      } else {
        alert(data.error || '添加失败')
      }
    } catch (error) {
      console.error('Failed to add chapter:', error)
      alert('添加失败')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleUpdateChapter = async () => {
    if (!editingChapter) return
    
    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/chapters/${editingChapter.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingChapter.name,
          description: editingChapter.description,
          sort_order: editingChapter.sort_order,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setEditingChapter(null)
        fetchChapters()
      } else {
        alert(data.error || '更新失败')
      }
    } catch (error) {
      console.error('Failed to update chapter:', error)
      alert('更新失败')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleDeleteChapter = async (id: number) => {
    if (!confirm('确定要删除该章节吗？删除后该章节下的题目将不再关联任何章节。')) return
    
    try {
      const res = await fetch(`/api/chapters/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        fetchChapters()
      } else {
        alert(data.error || '删除失败')
      }
    } catch (error) {
      console.error('Failed to delete chapter:', error)
      alert('删除失败')
    }
  }

  const handleImportQuestions = async (data: ParsedQuestion[]) => {
    let importedCount = 0
    let duplicateCount = 0
    let failedCount = 0
    
    for (const q of data) {
      const importQuestion = {
        language: q.language,
        type: q.type,
        chapter_id: q.chapter_id?.toString() || '',
        difficulty: q.difficulty,
        content: q.content,
        options: q.options ? JSON.parse(q.options) : ['', '', '', ''],
        code_template: q.code_template || '',
        answer: q.answer,
        score: q.score,
      }
      
      if (isQuestionDuplicate(importQuestion)) {
        duplicateCount++
        continue
      }
      
      try {
        const res = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: q.language,
            type: q.type,
            chapter_id: q.chapter_id || null,
            difficulty: q.difficulty,
            content: q.content,
            options: q.options ? JSON.parse(q.options) : null,
            code_template: q.code_template,
            answer: q.answer,
            score: q.score,
          }),
        })
        const result = await res.json()
        if (result.success) {
          importedCount++
        } else {
          failedCount++
        }
      } catch {
        failedCount++
      }
    }
    
    await fetchQuestions()
    
    alert(`批量导入完成\n共 ${data.length} 条\n成功 ${importedCount} 条\n失败 ${failedCount} 条\n重复 ${duplicateCount} 条`)
  }

  const handleDownloadQuestionTemplate = () => {
    const template = generateQuestionTemplate()
    downloadExcelTemplate(template, '题库导入模板.xlsx')
  }

  const handleExportQuestions = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedLanguage !== 'all') params.set('language', selectedLanguage)
      if (selectedType !== 'all') params.set('type', selectedType)
      if (selectedDifficulty !== 'all') params.set('difficulty', selectedDifficulty)
      params.set('limit', '0')
      
      const res = await fetch(`/api/questions?${params}`)
      const data = await res.json()
      if (data.success && Array.isArray(data.data)) {
        const allQuestions = data.data
        const ws = XLSX.utils.aoa_to_sheet([
          ['题目ID', '语言', '题型', '章节', '难度', '题目内容', '选项', '代码模板', '答案', '解析', '分值', '创建时间'],
          ...allQuestions.map(q => [
            q.id,
            languageLabels[q.language],
            typeLabels[q.type],
            q.chapter_name || '',
            difficultyLabels[q.difficulty],
            q.content,
            q.options ? q.options.join('|') : '',
            q.code_template || '',
            q.answer,
            q.score,
            new Date(q.created_at).toLocaleString('zh-CN')
          ])
        ])
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, '题目信息')
        const excelData = XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
        downloadExcelTemplate(excelData, `题库数据_${new Date().toISOString().slice(0, 10)}.xlsx`)
      }
    } catch (error) {
      console.error('Failed to export questions:', error)
      alert('导出失败')
    } finally {
      setLoading(false)
    }
  }

  const getQuestionStats = () => {
    return {
      total: questions.length,
      byLanguage: {
        java: questions.filter(q => q.language === 'java').length,
        cpp: questions.filter(q => q.language === 'cpp').length,
        python: questions.filter(q => q.language === 'python').length,
      },
    }
  }

  const stats = getQuestionStats()

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">题库管理</h1>
          <p className="text-muted-foreground mt-1">管理各语言的练习题目和章节</p>
        </div>
      </div>

      <Tabs defaultValue="questions" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="questions">题目管理</TabsTrigger>
          <TabsTrigger value="chapters">章节管理</TabsTrigger>
        </TabsList>
        
        {/* Questions Tab */}
        <TabsContent value="questions" className="space-y-6">
          <div className="flex items-center gap-2 justify-end">
            <ImportDialog<ParsedQuestion>
              title="批量导入题目"
              description="上传 Excel 文件批量导入练习题目"
              trigger={
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  批量导入
                </Button>
              }
              onParse={parseQuestionExcel}
              onImport={handleImportQuestions}
              onDownloadTemplate={handleDownloadQuestionTemplate}
              templateName="题库导入模板.xlsx"
              previewColumns={[
                { key: 'type', label: '题型' },
                { key: 'language', label: '语言' },
                { key: 'difficulty', label: '难度' },
                { key: 'content', label: '内容' },
              ]}
            />
            <Button variant="outline" size="sm" onClick={handleExportQuestions}>
              <Download className="w-4 h-4 mr-2" />
              导出题库
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  添加题目
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>添加题目</DialogTitle>
                  <DialogDescription>创建新的练习题目</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>语言</Label>
                      <Select value={newQuestion.language} onValueChange={(v: Language) => setNewQuestion({ ...newQuestion, language: v, chapter_id: '' })}>
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="java">Java</SelectItem>
                          <SelectItem value="cpp">C/C++</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>题型</Label>
                      <Select value={newQuestion.type} onValueChange={(v: QuestionType) => setNewQuestion({ ...newQuestion, type: v })}>
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single_choice">单选题</SelectItem>
                          <SelectItem value="fill_blank">程序填空题</SelectItem>
                          <SelectItem value="error_fix">程序改错题</SelectItem>
                          <SelectItem value="programming">程序设计题</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>章节</Label>
                      {isCreatingNewChapter ? (
                        <div className="flex gap-2">
                          <Input
                            placeholder="输入新章节名称"
                            value={inlineNewChapterName}
                            onChange={(e) => setInlineNewChapterName(e.target.value)}
                            className="bg-input border-border"
                          />
                          <Button size="sm" onClick={handleCreateChapterInline}>
                            创建
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => { setIsCreatingNewChapter(false); setInlineNewChapterName('') }}>
                            取消
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Select value={newQuestion.chapter_id} onValueChange={(v) => setNewQuestion({ ...newQuestion, chapter_id: v })}>
                            <SelectTrigger className="bg-input border-border flex-1">
                              <SelectValue placeholder="选择章节" />
                            </SelectTrigger>
                            <SelectContent>
                              {languageChapters.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground text-center">暂无章节，请先创建</div>
                              ) : (
                                languageChapters.map((ch) => (
                                  <SelectItem key={ch.id} value={ch.id.toString()}>{ch.name}</SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          <Button size="icon" variant="outline" onClick={() => setIsCreatingNewChapter(true)} title="创建新章节">
                            <FolderPlus className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>难度</Label>
                      <Select value={newQuestion.difficulty} onValueChange={(v: Difficulty) => setNewQuestion({ ...newQuestion, difficulty: v })}>
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">简单</SelectItem>
                          <SelectItem value="medium">中等</SelectItem>
                          <SelectItem value="hard">困难</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>分值</Label>
                    <Input
                      type="number"
                      value={newQuestion.score}
                      onChange={(e) => setNewQuestion({ ...newQuestion, score: Number(e.target.value) })}
                      className="bg-input border-border w-24"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>题目内容 *</Label>
                    <Textarea
                      placeholder="请输入题目内容"
                      value={newQuestion.content}
                      onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                      className="bg-input border-border min-h-24"
                    />
                  </div>

                  {newQuestion.type === 'single_choice' && (
                    <div className="space-y-2">
                      <Label>选项</Label>
                      <div className="space-y-2">
                        {['A', 'B', 'C', 'D'].map((opt, idx) => (
                          <div key={opt} className="flex items-center gap-2">
                            <span className="text-sm font-medium w-6">{opt}.</span>
                            <Input
                              placeholder={`选项 ${opt}`}
                              value={newQuestion.options[idx]}
                              onChange={(e) => {
                                const newOptions = [...newQuestion.options]
                                newOptions[idx] = e.target.value
                                setNewQuestion({ ...newQuestion, options: newOptions })
                              }}
                              className="bg-input border-border"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {['fill_blank', 'error_fix', 'programming'].includes(newQuestion.type) && (
                    <div className="space-y-2">
                      <Label>代码模板</Label>
                      <Textarea
                        placeholder="请输入代码模板，填空题使用 ______ 表示空白处"
                        value={newQuestion.code_template}
                        onChange={(e) => setNewQuestion({ ...newQuestion, code_template: e.target.value })}
                        className="bg-input border-border min-h-32 font-mono text-sm"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>正确答案 *</Label>
                    {newQuestion.type === 'single_choice' ? (
                      <Select value={newQuestion.answer} onValueChange={(v) => setNewQuestion({ ...newQuestion, answer: v })}>
                        <SelectTrigger className="bg-input border-border w-24">
                          <SelectValue placeholder="选择" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="D">D</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Textarea
                        placeholder="请输入正确答案"
                        value={newQuestion.answer}
                        onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                        className="bg-input border-border min-h-20 font-mono text-sm"
                      />
                    )}
                  </div>

                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>取消</Button>
                  <Button onClick={handleAddQuestion} disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    确定添加
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                <p className="text-sm text-muted-foreground">总题目数</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-java">{stats.byLanguage.java}</div>
                <p className="text-sm text-muted-foreground">Java 题目</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-cpp">{stats.byLanguage.cpp}</div>
                <p className="text-sm text-muted-foreground">C/C++ 题目</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-python">{stats.byLanguage.python}</div>
                <p className="text-sm text-muted-foreground">Python 题目</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索题目内容或ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-input border-border"
                  />
                </div>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-full sm:w-32 bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部语言</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C/C++</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-32 bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部题型</SelectItem>
                    <SelectItem value="single_choice">单选题</SelectItem>
                    <SelectItem value="fill_blank">填空题</SelectItem>
                    <SelectItem value="error_fix">改错题</SelectItem>
                    <SelectItem value="programming">编程题</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-full sm:w-32 bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部难度</SelectItem>
                    <SelectItem value="easy">简单</SelectItem>
                    <SelectItem value="medium">中等</SelectItem>
                    <SelectItem value="hard">困难</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Questions Table */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">题目列表</CardTitle>
              <CardDescription>共筛选出 {filteredQuestions.length} 道题目</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : filteredQuestions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>暂无题目数据</p>
                  <p className="text-sm mt-1">点击上方"添加题目"按钮创建第一道题目</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">ID</TableHead>
                      <TableHead className="text-muted-foreground">语言</TableHead>
                      <TableHead className="text-muted-foreground">题型</TableHead>
                      <TableHead className="text-muted-foreground">章节</TableHead>
                      <TableHead className="text-muted-foreground">难度</TableHead>
                      <TableHead className="text-muted-foreground max-w-xs">题目内容</TableHead>
                      <TableHead className="text-muted-foreground">分值</TableHead>
                      <TableHead className="text-muted-foreground w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuestions.map((question) => (
                      <TableRow key={question.id} className="border-border">
                        <TableCell className="font-mono text-sm">{question.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-secondary">
                            {languageLabels[question.language]}
                          </Badge>
                        </TableCell>
                        <TableCell>{typeLabels[question.type]}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {question.chapter_name || '-'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={question.difficulty === 'easy' ? 'default' : question.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                            {difficultyLabels[question.difficulty]}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={question.content}>
                          {question.content.substring(0, 50)}{question.content.length > 50 ? '...' : ''}
                        </TableCell>
                        <TableCell>{question.score}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover border-border">
                              <DropdownMenuItem onClick={() => setViewingQuestion(question)}>
                                <Eye className="w-4 h-4 mr-2" />
                                查看详情
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                setEditingQuestion(question)
                                setIsEditDialogOpen(true)
                              }}>
                                <Edit className="w-4 h-4 mr-2" />
                                编辑
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteQuestion(question.id)} className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                删除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Chapters Tab */}
        <TabsContent value="chapters" className="space-y-6">
          <div className="flex items-center gap-2 justify-end">
            <Dialog open={isChapterDialogOpen} onOpenChange={setIsChapterDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  添加章节
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>添加章节</DialogTitle>
                  <DialogDescription>为指定语言创建新章节</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>语言</Label>
                    <Select value={newChapter.language} onValueChange={(v: Language) => setNewChapter({ ...newChapter, language: v })}>
                      <SelectTrigger className="bg-input border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="cpp">C/C++</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>章节名称 *</Label>
                    <Input
                      placeholder="例如：Java基础语法"
                      value={newChapter.name}
                      onChange={(e) => setNewChapter({ ...newChapter, name: e.target.value })}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>描述</Label>
                    <Textarea
                      placeholder="章节描述（可选）"
                      value={newChapter.description}
                      onChange={(e) => setNewChapter({ ...newChapter, description: e.target.value })}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>排序</Label>
                    <Input
                      type="number"
                      value={newChapter.sort_order}
                      onChange={(e) => setNewChapter({ ...newChapter, sort_order: Number(e.target.value) })}
                      className="bg-input border-border w-24"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsChapterDialogOpen(false)}>取消</Button>
                  <Button onClick={handleAddChapter} disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    确定添加
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Chapters by Language */}
          {(['java', 'cpp', 'python'] as Language[]).map((lang) => {
            const langChapters = chapters.filter(c => c.language === lang).sort((a, b) => a.sort_order - b.sort_order)
            return (
              <Card key={lang} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge variant="outline" className={`bg-${lang}`}>{languageLabels[lang]}</Badge>
                    <span className="text-muted-foreground text-sm font-normal">({langChapters.length} 个章节)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {langChapters.length === 0 ? (
                    <p className="text-muted-foreground text-sm">暂无章节，点击上方按钮添加</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground w-16">排序</TableHead>
                          <TableHead className="text-muted-foreground">章节名称</TableHead>
                          <TableHead className="text-muted-foreground">描述</TableHead>
                          <TableHead className="text-muted-foreground w-24">题目数</TableHead>
                          <TableHead className="text-muted-foreground w-10"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {langChapters.map((chapter) => (
                          <TableRow key={chapter.id} className="border-border">
                            <TableCell>{chapter.sort_order}</TableCell>
                            <TableCell className="font-medium">{chapter.name}</TableCell>
                            <TableCell className="text-muted-foreground">{chapter.description || '-'}</TableCell>
                            <TableCell>{questions.filter(q => q.chapter_id === chapter.id).length}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-popover border-border">
                                  <DropdownMenuItem onClick={() => setEditingChapter(chapter)}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    编辑
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteChapter(chapter.id)} className="text-destructive">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    删除
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>

      {/* View Question Dialog */}
      <Dialog open={!!viewingQuestion} onOpenChange={() => setViewingQuestion(null)}>
        <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>题目详情</DialogTitle>
          </DialogHeader>
          {viewingQuestion && (
            <div className="space-y-4 py-4">
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">{languageLabels[viewingQuestion.language]}</Badge>
                <Badge variant="outline">{typeLabels[viewingQuestion.type]}</Badge>
                <Badge variant={viewingQuestion.difficulty === 'easy' ? 'default' : viewingQuestion.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                  {difficultyLabels[viewingQuestion.difficulty]}
                </Badge>
                <Badge variant="outline">分值: {viewingQuestion.score}</Badge>
              </div>
              <div>
                <Label className="text-muted-foreground">题目内容</Label>
                <p className="mt-1 text-foreground whitespace-pre-wrap">{viewingQuestion.content}</p>
              </div>
              {viewingQuestion.options && (
                <div>
                  <Label className="text-muted-foreground">选项</Label>
                  <div className="mt-1 space-y-1">
                    {viewingQuestion.options.map((opt, idx) => (
                      <p key={idx} className={viewingQuestion.answer === String.fromCharCode(65 + idx) ? 'text-success font-medium' : ''}>
                        {String.fromCharCode(65 + idx)}. {opt}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {viewingQuestion.code_template && (
                <div>
                  <Label className="text-muted-foreground">代码模板</Label>
                  <pre className="mt-1 p-3 bg-secondary rounded-lg text-sm font-mono overflow-x-auto">{viewingQuestion.code_template}</pre>
                </div>
              )}
              <div>
                <Label className="text-muted-foreground">正确答案</Label>
                <pre className="mt-1 p-3 bg-success/10 border border-success/30 rounded-lg text-sm font-mono text-success overflow-x-auto whitespace-pre-wrap">{viewingQuestion.answer}</pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Question Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open)
        if (!open) setEditingQuestion(null)
      }}>
        <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑题目</DialogTitle>
          </DialogHeader>
          {editingQuestion && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>语言</Label>
                  <Select value={editingQuestion.language} onValueChange={(v: Language) => setEditingQuestion({ ...editingQuestion, language: v, chapter_id: null })}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C/C++</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>题型</Label>
                  <Select value={editingQuestion.type} onValueChange={(v: QuestionType) => setEditingQuestion({ ...editingQuestion, type: v })}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single_choice">单选题</SelectItem>
                      <SelectItem value="fill_blank">程序填空题</SelectItem>
                      <SelectItem value="error_fix">程序改错题</SelectItem>
                      <SelectItem value="programming">程序设计题</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>章节</Label>
                  <Select value={editingQuestion.chapter_id?.toString() || ''} onValueChange={(v) => setEditingQuestion({ ...editingQuestion, chapter_id: v ? Number(v) : null })}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="选择章节" />
                    </SelectTrigger>
                    <SelectContent>
                      {chapters.filter(c => c.language === editingQuestion.language).length === 0 ? (
                        <div className="p-2 text-sm text-muted-foreground text-center">暂无章节，请先创建</div>
                      ) : (
                        chapters.filter(c => c.language === editingQuestion.language).map((ch) => (
                          <SelectItem key={ch.id} value={ch.id.toString()}>{ch.name}</SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>难度</Label>
                  <Select value={editingQuestion.difficulty} onValueChange={(v: Difficulty) => setEditingQuestion({ ...editingQuestion, difficulty: v })}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">简单</SelectItem>
                      <SelectItem value="medium">中等</SelectItem>
                      <SelectItem value="hard">困难</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>分值</Label>
                <Input
                  type="number"
                  value={editingQuestion.score}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, score: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label>题目内容</Label>
                <Textarea
                  value={editingQuestion.content}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, content: e.target.value })}
                  className="bg-input border-border min-h-24"
                />
              </div>

              {editingQuestion.type === 'single_choice' && (
                <div className="space-y-2">
                  <Label>选项</Label>
                  <div className="space-y-2">
                    {['A', 'B', 'C', 'D'].map((opt, idx) => (
                      <div key={opt} className="flex items-center gap-2">
                        <span className="text-sm font-medium w-6">{opt}.</span>
                        <Input
                          value={editingQuestion.options?.[idx] || ''}
                          onChange={(e) => {
                            const newOptions = [...(editingQuestion.options || ['', '', '', ''])]
                            newOptions[idx] = e.target.value
                            setEditingQuestion({ ...editingQuestion, options: newOptions })
                          }}
                          className="bg-input border-border"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {['fill_blank', 'error_fix', 'programming'].includes(editingQuestion.type) && (
                <div className="space-y-2">
                  <Label>代码模板</Label>
                  <Textarea
                    value={editingQuestion.code_template || ''}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, code_template: e.target.value })}
                    className="bg-input border-border min-h-32 font-mono text-sm"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>正确答案</Label>
                {editingQuestion.type === 'single_choice' ? (
                  <Select value={editingQuestion.answer} onValueChange={(v) => setEditingQuestion({ ...editingQuestion, answer: v })}>
                    <SelectTrigger className="bg-input border-border w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Textarea
                    value={editingQuestion.answer}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, answer: e.target.value })}
                    className="bg-input border-border min-h-20 font-mono text-sm"
                  />
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false)
              setEditingQuestion(null)
            }}>取消</Button>
            <Button onClick={handleUpdateQuestion} disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              保存修改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Chapter Dialog */}
      <Dialog open={!!editingChapter} onOpenChange={() => setEditingChapter(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>编辑章节</DialogTitle>
          </DialogHeader>
          {editingChapter && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>章节名称</Label>
                <Input
                  value={editingChapter.name}
                  onChange={(e) => setEditingChapter({ ...editingChapter, name: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>描述</Label>
                <Textarea
                  value={editingChapter.description || ''}
                  onChange={(e) => setEditingChapter({ ...editingChapter, description: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>排序</Label>
                <Input
                  type="number"
                  value={editingChapter.sort_order}
                  onChange={(e) => setEditingChapter({ ...editingChapter, sort_order: Number(e.target.value) })}
                  className="bg-input border-border w-24"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingChapter(null)}>取消</Button>
            <Button onClick={handleUpdateChapter} disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              保存修改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
