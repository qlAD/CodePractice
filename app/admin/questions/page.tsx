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
import { cn } from '@/lib/utils'
import type { Language, QuestionType } from '@/lib/types'
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
  paper_id: number | null
  papers_id?: string | null
  paper_name?: string
  content: string
  options?: string[]
  code_template?: string
  answer: string
  score: number
  status: string
  created_at: string
}

interface Paper {
  id: number
  papers_id: string | null
  language: Language
  name: string
  description?: string
  sort_order: number
  question_count?: number
}

const typeLabels: Record<QuestionType, string> = {
  single_choice: '单选题',
  fill_blank: '填空题',
  error_fix: '改错题',
  programming: '编程题',
}

const languageLabels: Record<Language, string> = {
  java: 'Java',
  cpp: 'C/C++',
  python: 'Python',
}

const languageBadgeClass: Record<Language, string> = {
  java: 'border-0 bg-java text-white',
  cpp: 'border-0 bg-cpp text-white',
  python: 'border-0 bg-python text-white',
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [questionStats, setQuestionStats] = useState({
    total: 0,
    byLanguage: { java: 0, cpp: 0, python: 0 },
  })
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')
  const [selectedPaper, setSelectedPaper] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewingQuestion, setViewingQuestion] = useState<Question | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [isPaperDialogOpen, setIsPaperDialogOpen] = useState(false)
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null)
  const [newPaper, setNewPaper] = useState({
    language: 'java' as Language,
    papers_id: '',
    name: '',
    description: '',
    sort_order: 1,
  })
  
  const [isCreatingNewPaper, setIsCreatingNewPaper] = useState(false)
  const [inlineNewPaperName, setInlineNewPaperName] = useState('')
  const [inlineNewPaperPapersId, setInlineNewPaperPapersId] = useState('')
  
  const [newQuestion, setNewQuestion] = useState({
    language: 'java' as Language,
    type: 'single_choice' as QuestionType,
    paper_id: '',
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
      if (selectedPaper !== 'all') params.set('paper_id', selectedPaper)
      if (selectedType !== 'all') params.set('type', selectedType)
      if (searchQuery.trim()) params.set('search', searchQuery.trim())
      params.set('limit', pagination.pageSize.toString())
      params.set('offset', ((pagination.page - 1) * pagination.pageSize).toString())

      const res = await fetch(`/api/questions?${params}`)
      const data = await res.json()
      if (data.success && Array.isArray(data.data)) {
        setQuestions(data.data)
        setPagination(prev => ({
          ...prev,
          total: Number(data.total) || 0,
        }))
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedLanguage, selectedPaper, selectedType, searchQuery, pagination.page, pagination.pageSize])

  const fetchQuestionStats = useCallback(async () => {
    try {
      const [all, java, cpp, python] = await Promise.all([
        fetch('/api/questions?limit=1').then(r => r.json()),
        fetch('/api/questions?language=java&limit=1').then(r => r.json()),
        fetch('/api/questions?language=cpp&limit=1').then(r => r.json()),
        fetch('/api/questions?language=python&limit=1').then(r => r.json()),
      ])
      const n = (x: unknown) => Number(x) || 0
      setQuestionStats({
        total: all.success ? n(all.total) : 0,
        byLanguage: {
          java: java.success ? n(java.total) : 0,
          cpp: cpp.success ? n(cpp.total) : 0,
          python: python.success ? n(python.total) : 0,
        },
      })
    } catch (error) {
      console.error('Failed to fetch question stats:', error)
    }
  }, [])

  const fetchPapers = async () => {
    try {
      const res = await fetch('/api/papers')
      const data = await res.json()
      if (data.success) {
        setPapers(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch papers:', error)
    }
  }

  useEffect(() => {
    fetchQuestions()
    fetchPapers()
    fetchQuestionStats()
  }, [fetchQuestions, fetchQuestionStats])

  const languagePapers = papers.filter(c => c.language === newQuestion.language)
  
  const handleCreatePaperInline = async () => {
    if (!inlineNewPaperName.trim() || !inlineNewPaperPapersId.trim()) return
    
    try {
      const maxOrder = languagePapers.reduce((max, ch) => Math.max(max, ch.sort_order), 0)
      const res = await fetch('/api/papers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: newQuestion.language,
          papers_id: inlineNewPaperPapersId.trim(),
          name: inlineNewPaperName.trim(),
          description: '',
          sort_order: maxOrder + 1,
        }),
      })
      const data = await res.json()
      if (data.success) {
        await fetchPapers()
        setNewQuestion({ ...newQuestion, paper_id: data.data.id.toString() })
        setInlineNewPaperName('')
        setInlineNewPaperPapersId('')
        setIsCreatingNewPaper(false)
      } else {
        alert(data.error || '创建试卷失败')
      }
    } catch (error) {
      console.error('Failed to create paper:', error)
      alert('创建试卷失败')
    }
  }

  const isQuestionDuplicate = (question: {
    language: Language
    type: QuestionType
    paper_id?: string | number | null
    content: string
    options?: string[]
    code_template?: string
  }): boolean => {
    const raw =
      question.paper_id !== undefined && question.paper_id !== null && question.paper_id !== ''
        ? String(question.paper_id).trim()
        : ''
    let pid: number | null = null
    if (raw) {
      if (/^\d+$/.test(raw)) {
        pid = Number(raw)
      } else {
        const p = papers.find(x => x.papers_id === raw && x.language === question.language)
        pid = p?.id ?? null
      }
    }
    const options = question.type === 'single_choice' ? (question.options ?? []).filter((o: string) => o).sort().join(',') : null
    const codeTemplate = ['fill_blank', 'error_fix', 'programming'].includes(question.type) ? question.code_template : null
    
    return questions.some(q => 
      q.language === question.language &&
      q.type === question.type &&
      q.paper_id === pid &&
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
          paper_id: newQuestion.paper_id?.trim() || null,
          options: newQuestion.type === 'single_choice' ? newQuestion.options.filter(o => o) : null,
          code_template: ['fill_blank', 'error_fix', 'programming'].includes(newQuestion.type) ? newQuestion.code_template : null,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setNewQuestion({
          language: 'java',
          type: 'single_choice',
          paper_id: '',
          content: '',
          code_template: '',
          options: ['', '', '', ''],
          answer: '',
          score: 10,
        })
        setIsAddDialogOpen(false)
        fetchQuestions()
        fetchQuestionStats()
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
          paper_id: editingQuestion.paper_id ?? null,
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
        fetchQuestionStats()
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
        fetchQuestionStats()
      } else {
        alert(data.error || '删除失败')
      }
    } catch (error) {
      console.error('Failed to delete question:', error)
      alert('删除失败')
    }
  }
  
  const handleAddPaper = async () => {
    if (!newPaper.name.trim() || !newPaper.papers_id.trim()) return
    
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/papers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPaper),
      })
      const data = await res.json()
      if (data.success) {
        setNewPaper({ language: 'java', papers_id: '', name: '', description: '', sort_order: 1 })
        setIsPaperDialogOpen(false)
        fetchPapers()
      } else {
        alert(data.error || '添加失败')
      }
    } catch (error) {
      console.error('Failed to add paper:', error)
      alert('添加失败')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleUpdatePaper = async () => {
    if (!editingPaper) return
    if (!(editingPaper.papers_id || '').trim()) {
      alert('请填写试卷编号')
      return
    }
    
    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/papers/${editingPaper.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          papers_id: (editingPaper.papers_id || '').trim(),
          name: editingPaper.name,
          description: editingPaper.description,
          sort_order: editingPaper.sort_order,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setEditingPaper(null)
        fetchPapers()
      } else {
        alert(data.error || '更新失败')
      }
    } catch (error) {
      console.error('Failed to update paper:', error)
      alert('更新失败')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleDeletePaper = async (id: number) => {
    if (!confirm('确定要删除该试卷吗？须先清空或移走卷内题目。')) return
    
    try {
      const res = await fetch(`/api/papers/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        fetchPapers()
      } else {
        alert(data.error || '删除失败')
      }
    } catch (error) {
      console.error('Failed to delete paper:', error)
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
        paper_id: q.paper_id?.toString() || '',
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
            paper_id: q.paper_id?.trim() || null,
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
    await fetchQuestionStats()
    
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
      if (selectedPaper !== 'all') params.set('paper_id', selectedPaper)
      if (selectedType !== 'all') params.set('type', selectedType)
      params.set('limit', '0')
      
      const res = await fetch(`/api/questions?${params}`)
      const data = await res.json()
      if (data.success && Array.isArray(data.data)) {
        const allQuestions = data.data as Question[]
        const ws = XLSX.utils.aoa_to_sheet([
          ['题目ID', '语言', '题型', '试卷编号', '题目内容', '选项', '代码模板', '答案', '解析', '分值', '创建时间'],
          ...allQuestions.map((q: Question) => [
            q.id,
            languageLabels[q.language],
            typeLabels[q.type],
            q.papers_id || '',
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">题库管理</h1>
          <p className="text-muted-foreground mt-1">管理试卷与各卷题目</p>
        </div>
      </div>

      <Tabs defaultValue="papers" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="papers">试卷管理</TabsTrigger>
          <TabsTrigger value="questions">题目管理</TabsTrigger>
        </TabsList>
        
        <TabsContent value="papers" className="space-y-6">
          <div className="flex items-center gap-2 justify-end">
            <Dialog open={isPaperDialogOpen} onOpenChange={setIsPaperDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  添加试卷
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border">
                <DialogHeader>
                  <DialogTitle>添加试卷</DialogTitle>
                  <DialogDescription>为指定语言创建新试卷</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>语言</Label>
                    <Select value={newPaper.language} onValueChange={(v: Language) => setNewPaper({ ...newPaper, language: v })}>
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
                    <Label>试卷编号 *</Label>
                    <Input
                      placeholder="如 66，导入 Excel 用此列"
                      value={newPaper.papers_id}
                      onChange={(e) => setNewPaper({ ...newPaper, papers_id: e.target.value })}
                      className="bg-input border-border font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>试卷名称 *</Label>
                    <Input
                      placeholder="例如：Java 基础模拟卷"
                      value={newPaper.name}
                      onChange={(e) => setNewPaper({ ...newPaper, name: e.target.value })}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>描述</Label>
                    <Textarea
                      placeholder="试卷说明（可选）"
                      value={newPaper.description}
                      onChange={(e) => setNewPaper({ ...newPaper, description: e.target.value })}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>排序</Label>
                    <Input
                      type="number"
                      value={newPaper.sort_order}
                      onChange={(e) => setNewPaper({ ...newPaper, sort_order: Number(e.target.value) })}
                      className="bg-input border-border w-24"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsPaperDialogOpen(false)}>取消</Button>
                  <Button onClick={handleAddPaper} disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    确定添加
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {(['java', 'cpp', 'python'] as Language[]).map((lang) => {
            const langPapers = papers.filter(c => c.language === lang).sort((a, b) => a.sort_order - b.sort_order)
            return (
              <Card key={lang} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge className={cn('text-xs font-medium', languageBadgeClass[lang])}>{languageLabels[lang]}</Badge>
                    <span className="text-muted-foreground text-sm font-normal">({langPapers.length} 套试卷)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {langPapers.length === 0 ? (
                    <p className="text-muted-foreground text-sm">暂无试卷，点击上方按钮添加</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground w-16">排序</TableHead>
                          <TableHead className="text-muted-foreground">试卷编号</TableHead>
                          <TableHead className="text-muted-foreground">试卷名称</TableHead>
                          <TableHead className="text-muted-foreground">描述</TableHead>
                          <TableHead className="text-muted-foreground w-24">题目数</TableHead>
                          <TableHead className="text-muted-foreground w-10"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {langPapers.map((paper) => (
                          <TableRow key={paper.id} className="border-border">
                            <TableCell>{paper.sort_order}</TableCell>
                            <TableCell className="font-mono text-sm">{paper.papers_id || '—'}</TableCell>
                            <TableCell className="font-medium">{paper.name}</TableCell>
                            <TableCell className="text-muted-foreground">{paper.description || '-'}</TableCell>
                            <TableCell>{paper.question_count ?? '—'}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-popover border-border">
                                  <DropdownMenuItem onClick={() => setEditingPaper(paper)}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    编辑
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeletePaper(paper.id)} className="text-destructive">
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
                { key: 'paper_id', label: '试卷编号' },
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
                      <Select value={newQuestion.language} onValueChange={(v: Language) => setNewQuestion({ ...newQuestion, language: v, paper_id: '' })}>
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

              <div className="space-y-2">
                  <Label>所属试卷</Label>
                  {isCreatingNewPaper ? (
                        <div className="space-y-2">
                          <Input
                            placeholder="试卷编号 papers_id"
                            value={inlineNewPaperPapersId}
                            onChange={(e) => setInlineNewPaperPapersId(e.target.value)}
                            className="bg-input border-border font-mono text-sm"
                          />
                          <div className="flex gap-2">
                            <Input
                              placeholder="试卷名称"
                              value={inlineNewPaperName}
                              onChange={(e) => setInlineNewPaperName(e.target.value)}
                              className="bg-input border-border flex-1"
                            />
                            <Button size="sm" onClick={handleCreatePaperInline}>
                              创建
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => { setIsCreatingNewPaper(false); setInlineNewPaperName(''); setInlineNewPaperPapersId('') }}>
                              取消
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Select value={newQuestion.paper_id} onValueChange={(v) => setNewQuestion({ ...newQuestion, paper_id: v })}>
                            <SelectTrigger className="bg-input border-border flex-1">
                              <SelectValue placeholder="选择试卷" />
                            </SelectTrigger>
                            <SelectContent>
                              {languagePapers.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground text-center">暂无试卷，请先创建</div>
                              ) : (
                                languagePapers.map((ch) => (
                                  <SelectItem key={ch.id} value={ch.id.toString()}>
                                    {ch.papers_id ? `[${ch.papers_id}] ` : ''}{ch.name}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                          <Button size="icon" variant="outline" onClick={() => setIsCreatingNewPaper(true)} title="新建试卷">
                            <FolderPlus className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
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
            <Card className="border-border shadow-card transition-card hover:shadow-card-hover">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground">{questionStats.total}</div>
                <p className="text-sm text-muted-foreground">总题目数</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-card transition-card hover:shadow-card-hover">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-java">{questionStats.byLanguage.java}</div>
                <p className="text-sm text-muted-foreground">Java 题目</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-card transition-card hover:shadow-card-hover">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-cpp">{questionStats.byLanguage.cpp}</div>
                <p className="text-sm text-muted-foreground">C/C++ 题目</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-card transition-card hover:shadow-card-hover">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-python">{questionStats.byLanguage.python}</div>
                <p className="text-sm text-muted-foreground">Python 题目</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-border shadow-card transition-card hover:shadow-card-hover">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索题目内容或ID..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setPagination(p => ({ ...p, page: 1 }))
                    }}
                    className="pl-9 bg-input border-border"
                  />
                </div>
                <Select value={selectedLanguage} onValueChange={(v) => {
                  setSelectedLanguage(v)
                  setSelectedPaper('all')
                  setPagination(p => ({ ...p, page: 1 }))
                }}>
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
                <Select value={selectedPaper} onValueChange={(v) => {
                  setSelectedPaper(v)
                  setPagination(p => ({ ...p, page: 1 }))
                }}>
                  <SelectTrigger className="w-full sm:w-40 bg-input border-border">
                    <SelectValue placeholder="试卷" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部试卷</SelectItem>
                    {papers
                      .filter(p => selectedLanguage === 'all' || p.language === selectedLanguage)
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map(p => (
                        <SelectItem key={p.id} value={String(p.id)}>
                          {p.papers_id ? `[${p.papers_id}] ` : ''}{p.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={(v) => {
                  setSelectedType(v)
                  setPagination(p => ({ ...p, page: 1 }))
                }}>
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
              </div>
            </CardContent>
          </Card>

          {/* Questions Table */}
          <Card className="border-border shadow-card transition-card hover:shadow-card-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">题目列表</CardTitle>
              <CardDescription>共 {pagination.total} 道题目</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : questions.length === 0 ? (
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
                      <TableHead className="text-muted-foreground">试卷</TableHead>
                      <TableHead className="text-muted-foreground max-w-xs">题目内容</TableHead>
                      <TableHead className="text-muted-foreground">分值</TableHead>
                      <TableHead className="text-muted-foreground w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questions.map((question) => (
                      <TableRow key={question.id} className="border-border">
                        <TableCell className="font-mono text-sm">{question.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-secondary">
                            {languageLabels[question.language]}
                          </Badge>
                        </TableCell>
                        <TableCell>{typeLabels[question.type]}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {question.papers_id
                            ? `[${question.papers_id}] ${question.paper_name || ''}`
                            : question.paper_name || '-'}
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
            {!loading && pagination.total > 0 && (
              <CardContent className="border-t border-border py-3">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 min-h-[2.5rem]">
                  <div className="text-muted-foreground text-sm">
                    共 {pagination.total} 条记录
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={pagination.pageSize.toString()}
                      onValueChange={(value) => {
                        setPagination(prev => ({ ...prev, pageSize: Number(value), page: 1 }))
                      }}
                    >
                      <SelectTrigger className="w-24 bg-input border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="20">20条/页</SelectItem>
                        <SelectItem value="50">50条/页</SelectItem>
                        <SelectItem value="100">100条/页</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={pagination.page === 1}
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                      >
                        ←
                      </Button>
                      <Button variant="ghost" size="sm">
                        {pagination.page} / {Math.max(1, Math.ceil(pagination.total / pagination.pageSize))}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={pagination.page * pagination.pageSize >= pagination.total}
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                      >
                        →
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
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
                  <Select value={editingQuestion.language} onValueChange={(v: Language) => setEditingQuestion({ ...editingQuestion, language: v, paper_id: null })}>
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

              <div className="space-y-2">
                  <Label>所属试卷</Label>
                  <Select value={editingQuestion.paper_id != null ? String(editingQuestion.paper_id) : ''} onValueChange={(v) => setEditingQuestion({ ...editingQuestion, paper_id: v ? Number(v) : null })}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="选择试卷" />
                    </SelectTrigger>
                    <SelectContent>
                      {papers.filter(c => c.language === editingQuestion.language).length === 0 ? (
                        <div className="p-2 text-sm text-muted-foreground text-center">暂无试卷，请先创建</div>
                      ) : (
                        papers.filter(c => c.language === editingQuestion.language).map((ch) => (
                          <SelectItem key={ch.id} value={ch.id.toString()}>
                            {ch.papers_id ? `[${ch.papers_id}] ` : ''}{ch.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
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

      <Dialog open={!!editingPaper} onOpenChange={() => setEditingPaper(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>编辑试卷</DialogTitle>
          </DialogHeader>
          {editingPaper && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>试卷编号 papers_id *</Label>
                <Input
                  value={editingPaper.papers_id || ''}
                  onChange={(e) => setEditingPaper({ ...editingPaper, papers_id: e.target.value })}
                  className="bg-input border-border font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label>试卷名称</Label>
                <Input
                  value={editingPaper.name}
                  onChange={(e) => setEditingPaper({ ...editingPaper, name: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>描述</Label>
                <Textarea
                  value={editingPaper.description || ''}
                  onChange={(e) => setEditingPaper({ ...editingPaper, description: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>排序</Label>
                <Input
                  type="number"
                  value={editingPaper.sort_order}
                  onChange={(e) => setEditingPaper({ ...editingPaper, sort_order: Number(e.target.value) })}
                  className="bg-input border-border w-24"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPaper(null)}>取消</Button>
            <Button onClick={handleUpdatePaper} disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              保存修改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
