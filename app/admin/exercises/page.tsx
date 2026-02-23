'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Loader2,
  Clock,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import * as XLSX from 'xlsx'

interface PracticeRecord {
  id: number
  student_name: string
  student_id: string
  language: string | null
  question_type: string | null
  chapter_id: number | null
  chapter_name: string | null
  mode: string
  total_count: number
  correct_count: number
  score: number
  created_at: string
  finished_at: string | null
}

const languageNames: Record<string, string> = {
  java: 'Java',
  cpp: 'C/C++',
  python: 'Python',
}

const modeNames: Record<string, string> = {
  by_language: '按语言',
  by_type: '按题型',
  by_chapter: '按章节',
  exam: '模拟考试',
}

const questionTypeNames: Record<string, string> = {
  single_choice: '单选题',
  fill_blank: '填空题',
  error_fix: '改错题',
  programming: '编程题',
}

export default function PracticeManagementPage() {
  const [records, setRecords] = useState<PracticeRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const limit = 200
      let offset = 0
      let total = 0
      const allRecords: PracticeRecord[] = []

      do {
        const recordsRes = await fetch(`/api/practice/records?limit=${limit}&offset=${offset}`)
        const recordsData = await recordsRes.json()
        if (!recordsData.success) break

        const batch = recordsData.data || []
        total = recordsData.total || 0
        allRecords.push(...batch)
        offset += batch.length

        if (batch.length === 0) break
      } while (offset < total)

      setRecords(allRecords)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleString('zh-CN')
  }

  const formatLanguage = (language: string | null) => {
    if (!language) return ''
    return languageNames[language] || language
  }

  const formatMode = (record: PracticeRecord) => {
    if (record.mode === 'by_language') {
      if (!record.language) return '错题本'
      const language = languageNames[record.language] || record.language
      return `按语言（${language}）`
    }

    if (record.mode === 'by_type') {
      if (!record.question_type) return '按题型（-）'
      const typeNames = record.question_type
        .split(',')
        .map(type => type.trim())
        .filter(Boolean)
        .map(type => questionTypeNames[type] || type)
      return `按题型（${typeNames.join('、') || '-'}）`
    }

    if (record.mode === 'by_chapter') {
      return `按章节（${record.chapter_name || '-'}）`
    }

    if (record.mode === 'exam') {
      const details: string[] = []

      if (record.language) {
        details.push(`${languageNames[record.language] || record.language}`)
      }

      if (record.question_type) {
        const typeNames = record.question_type
          .split(',')
          .map(type => type.trim())
          .filter(Boolean)
          .map(type => questionTypeNames[type] || type)
        if (typeNames.length > 0) {
          details.push(`题型：${typeNames.join('、')}`)
        }
      }

      if (record.chapter_name) {
        details.push(`章节：${record.chapter_name}`)
      }

      return details.length > 0 ? `模拟考试（${details.join('，')}）` : '模拟考试'
    }

    return modeNames[record.mode] || record.mode
  }

  const handleDownload = () => {
    const headers = ['学生姓名', '学号', '语言', '模式', '题目数', '正确数', '得分', '开始时间', '完成时间']
    const rows = records.map(record => [
      record.student_name,
      record.student_id,
      formatLanguage(record.language),
      formatMode(record),
      record.total_count,
      record.correct_count,
      record.score,
      formatDate(record.created_at),
      formatDate(record.finished_at),
    ])
    
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, '练习记录')
    XLSX.writeFile(workbook, `练习记录_${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
        <h1 className="text-2xl font-bold text-foreground">练习管理</h1>
        <p className="text-muted-foreground mt-1">查看学生练习记录</p>
       </div>
       <Button onClick={handleDownload} variant="outline">
         <Download className="w-4 h-4 mr-2" />
         下载数据
       </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>练习记录</CardTitle>
          <CardDescription>共 {records.length} 条学生练习记录</CardDescription>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>暂无练习记录</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>学生</TableHead>
                  <TableHead>学号</TableHead>
                  <TableHead>语言</TableHead>
                  <TableHead>模式</TableHead>
                  <TableHead>题目数</TableHead>
                  <TableHead>正确数</TableHead>
                  <TableHead>得分</TableHead>
                  <TableHead>开始时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.student_name}</TableCell>
                    <TableCell>{record.student_id}</TableCell>
                    <TableCell>{formatLanguage(record.language)}</TableCell>
                    <TableCell>{formatMode(record)}</TableCell>
                    <TableCell>{record.total_count}</TableCell>
                    <TableCell>{record.correct_count}</TableCell>
                    <TableCell>
                      <Badge variant={record.score >= 60 ? 'default' : 'destructive'}>
                        {record.score}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(record.created_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
