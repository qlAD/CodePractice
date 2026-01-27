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
  language: '按语言',
  type: '按题型',
  chapter: '按章节',
  exam: '模拟考试',
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
      const recordsRes = await fetch('/api/practice/records?limit=50')
      const recordsData = await recordsRes.json()
      if (recordsData.success) setRecords((recordsData.data || []).filter((record: PracticeRecord) => record.mode === 'exam'))
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

  const handleDownload = () => {
    const headers = ['学生姓名', '学号', '语言', '模式', '题目数', '正确数', '得分', '开始时间', '完成时间']
    const rows = records.map(record => [
      record.student_name,
      record.student_id,
      record.language ? (languageNames[record.language] || record.language) : '-',
      modeNames[record.mode] || record.mode,
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
          <CardDescription>最近 {records.length} 条学生模拟考试记录</CardDescription>
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
                    <TableCell>{record.language ? (languageNames[record.language] || record.language) : '-'}</TableCell>
                    <TableCell>{modeNames[record.mode] || record.mode}</TableCell>
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
