'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

import type { Language, QuestionType, Chapter } from '@/lib/types'
import {
  Code2,
  Target,
  BookOpen,
  FileCode,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

const languageConfig = {
  java: { name: 'Java', color: 'bg-java', textColor: 'text-java', description: '面向对象编程语言' },
  cpp: { name: 'C/C++', color: 'bg-cpp', textColor: 'text-cpp', description: '系统级编程语言' },
  python: { name: 'Python', color: 'bg-python', textColor: 'text-python', description: '简洁高效的脚本语言' },
}

const questionTypeConfig = {
  single_choice: { name: '单选题', description: '选择正确答案', icon: Target },
  fill_blank: { name: '程序填空', description: '补全代码片段', icon: Code2 },
  error_fix: { name: '程序改错', description: '找出并修正错误', icon: FileCode },
  programming: { name: '程序设计', description: '编写完整程序', icon: BookOpen },
}

interface QuestionCounts {
  total: number
  byType: Record<string, number>
  byLanguage: Record<string, number>
}

export default function PracticePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialMode = searchParams.get('mode') || 'language'

  const [activeTab, setActiveTab] = useState(initialMode)
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>([])
  const [selectedChapters, setSelectedChapters] = useState<string[]>([])
  const [examLanguage, setExamLanguage] = useState<Language | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [isLoadingChapters, setIsLoadingChapters] = useState(false)
  const [questionCounts, setQuestionCounts] = useState<QuestionCounts | null>(null)

  // Fetch question counts on mount
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('/api/questions/counts')
        const data = await response.json()
        if (data.success) {
          setQuestionCounts(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch question counts:', error)
      }
    }
    fetchCounts()
  }, [])

  // Fetch chapters when language is selected for chapter practice
  useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedLanguage && activeTab === 'chapter') return
      
      setIsLoadingChapters(true)
      try {
        const url = selectedLanguage 
          ? `/api/chapters?language=${selectedLanguage}`
          : '/api/chapters'
        const response = await fetch(url)
        const data = await response.json()
        if (data.success) {
          setChapters(data.data || [])
        }
      } catch (error) {
        console.error('Failed to fetch chapters:', error)
      } finally {
        setIsLoadingChapters(false)
      }
    }

    if (activeTab === 'chapter') {
      fetchChapters()
    }
  }, [selectedLanguage, activeTab])

  const handleTypeToggle = (type: QuestionType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const handleChapterToggle = (chapterId: string) => {
    setSelectedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(c => c !== chapterId)
        : [...prev, chapterId]
    )
  }

  const startPractice = (mode: string) => {
    const params = new URLSearchParams()
    params.set('mode', mode)

    if (mode === 'language' && selectedLanguage) {
      params.set('language', selectedLanguage)
    } else if (mode === 'type' && selectedLanguage && selectedTypes.length > 0) {
      params.set('language', selectedLanguage)
      selectedTypes.forEach(type => {
        params.append('type', type)
      })
    } else if (mode === 'chapter' && selectedLanguage && selectedChapters.length > 0) {
      params.set('language', selectedLanguage)
      selectedChapters.forEach(chapter => {
        params.append('chapter', chapter)
      })
    } else if (mode === 'exam' && examLanguage) {
      params.set('language', examLanguage)
    }

    router.push(`/dashboard/practice/session?${params.toString()}`)
  }

  const filteredChapters = selectedLanguage
    ? chapters.filter(c => c.language === selectedLanguage)
    : chapters

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">题库练习</h1>
        <p className="text-muted-foreground mt-1">选择一种练习模式开始学习</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value)
        const url = new URL(window.location.href)
        url.searchParams.set('mode', value)
        router.replace(url.toString())
      }} className="space-y-6">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent p-0">
          <TabsTrigger
            value="language"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-secondary text-secondary-foreground py-3"
          >
            <Code2 className="w-4 h-4 mr-2" />
            按语言练习
          </TabsTrigger>
          <TabsTrigger
            value="type"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-secondary text-secondary-foreground py-3"
          >
            <Target className="w-4 h-4 mr-2" />
            按题型练习
          </TabsTrigger>
          <TabsTrigger
            value="chapter"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-secondary text-secondary-foreground py-3"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            按章节练习
          </TabsTrigger>
          <TabsTrigger
            value="exam"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground bg-secondary text-secondary-foreground py-3"
          >
            <FileCode className="w-4 h-4 mr-2" />
            模拟考试
          </TabsTrigger>
        </TabsList>

        {/* Language Practice */}
        <TabsContent value="language" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">选择编程语言</CardTitle>
              <CardDescription>选择你想要练习的编程语言</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(Object.keys(languageConfig) as Language[]).map((lang) => {
                  const config = languageConfig[lang]
                  const isSelected = selectedLanguage === lang
                  return (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-secondary/50 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-12 h-12 rounded-lg ${config.color} flex items-center justify-center`}>
                          <Code2 className="w-6 h-6 text-white" />
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">{config.name}</h3>
                      <p className="text-sm text-muted-foreground">{config.description}</p>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => startPractice('language')}
                  disabled={!selectedLanguage}
                  className="bg-primary text-primary-foreground"
                >
                  开始练习
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Type Practice */}
        <TabsContent value="type" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">按题型练习</CardTitle>
              <CardDescription>先选择语言，再选择一种或多种题型进行练习</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>选择语言</Label>
                <Select value={selectedLanguage || ''} onValueChange={(v) => {
                  setSelectedLanguage(v as Language)
                  setSelectedTypes([])
                }}>
                  <SelectTrigger className="w-full md:w-64 bg-input border-border">
                    <SelectValue placeholder="请选择编程语言" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(languageConfig) as Language[]).map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {languageConfig[lang].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedLanguage && (
                <div className="space-y-2">
                  <Label>选择题型</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(Object.keys(questionTypeConfig) as QuestionType[]).map((type) => {
                      const config = questionTypeConfig[type]
                      const Icon = config.icon
                      const isSelected = selectedTypes.includes(type)
                      const count = questionCounts?.byType[type] || 0
                      return (
                        <div
                      key={type}
                      onClick={() => handleTypeToggle(type)}
                      className={`p-4 rounded-lg border-2 transition-all text-left flex items-center gap-4 cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-secondary/50 hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{config.name}</h3>
                        <p className="text-sm text-muted-foreground">{config.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">题库共 {count} 题</p>
                      </div>
                      <Checkbox checked={isSelected} className="shrink-0" />
                    </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={() => startPractice('type')}
                  disabled={!selectedLanguage || selectedTypes.length === 0}
                  className="bg-primary text-primary-foreground"
                >
                  开始练习 ({selectedTypes.length} 种题型)
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chapter Practice */}
        <TabsContent value="chapter" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">选择章节</CardTitle>
              <CardDescription>先选择语言，再选择具体章节进行针对性练习</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>选择语言</Label>
                <Select value={selectedLanguage || ''} onValueChange={(v) => {
                  setSelectedLanguage(v as Language)
                  setSelectedChapters([])
                }}>
                  <SelectTrigger className="w-full md:w-64 bg-input border-border">
                    <SelectValue placeholder="请选择编程语言" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(languageConfig) as Language[]).map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {languageConfig[lang].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedLanguage && (
                <div className="space-y-2">
                  <Label>选择章节</Label>
                  {isLoadingChapters ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-14 w-full" />
                      ))}
                    </div>
                  ) : filteredChapters.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground border rounded-lg bg-secondary/30">
                      该语言暂无章节，请先在管理端添加章节
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredChapters.map((chapter) => {
                        const isSelected = selectedChapters.includes(String(chapter.id))
                        return (
                          <div
                            key={chapter.id}
                            onClick={() => handleChapterToggle(String(chapter.id))}
                            className={`p-4 rounded-lg border-2 transition-all text-left flex items-center gap-4 cursor-pointer ${
                              isSelected
                                ? 'border-primary bg-primary/10'
                                : 'border-border bg-secondary/50 hover:border-primary/50'
                            }`}
                          >
                            <div className="flex-1">
                              <span className="font-medium text-foreground">{chapter.name}</span>
                            </div>
                            <Checkbox checked={isSelected} className="shrink-0" />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={() => startPractice('chapter')}
                  disabled={!selectedLanguage || selectedChapters.length === 0}
                  className="bg-primary text-primary-foreground"
                >
                  开始练习 ({selectedChapters.length} 个章节)
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exam Mode */}
        <TabsContent value="exam" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">模拟考试</CardTitle>
              <CardDescription>模拟真实考试环境，限时完成</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>选择考试语言</Label>
                <Select value={examLanguage || ''} onValueChange={(v) => setExamLanguage(v as Language)}>
                  <SelectTrigger className="w-full md:w-64 bg-input border-border">
                    <SelectValue placeholder="请选择考试语言" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(languageConfig) as Language[]).map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {languageConfig[lang].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {examLanguage && (
                <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <h4 className="font-medium text-foreground mb-4">考试配置</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-lg bg-background">
                      <div className="text-2xl font-bold text-foreground">30</div>
                      <div className="text-xs text-muted-foreground">单选题</div>
                      <div className="text-xs text-primary">每题1分</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-background">
                      <div className="text-2xl font-bold text-foreground">3</div>
                      <div className="text-xs text-muted-foreground">程序填空</div>
                      <div className="text-xs text-primary">每题5分</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-background">
                      <div className="text-2xl font-bold text-foreground">3</div>
                      <div className="text-xs text-muted-foreground">程序改错</div>
                      <div className="text-xs text-primary">每题5分</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-background">
                      <div className="text-2xl font-bold text-foreground">4</div>
                      <div className="text-xs text-muted-foreground">程序设计</div>
                      <div className="text-xs text-primary">每题10分</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">考试时长：60 分钟</span>
                    <span className="mx-2">|</span>
                    <span className="text-sm">总分：100 分</span>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={() => startPractice('exam')}
                  disabled={!examLanguage}
                  className="bg-primary text-primary-foreground"
                >
                  开始考试
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
