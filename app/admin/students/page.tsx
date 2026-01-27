'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Key,
  Download,
  Upload,
  Eye,
  GraduationCap,
  Loader2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ImportDialog } from '@/components/admin/import-dialog'
import * as XLSX from 'xlsx'
import {
  parseStudentExcel,
  generateStudentTemplate,
  downloadExcelTemplate,
  type ParsedStudent,
} from '@/lib/excel-parser'

interface Student {
  id: number
  student_id: string
  name: string
  class_name: string | null
  major: string | null
  status: 'active' | 'inactive' | 'locked'
  last_login: string | null
  created_at: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [classes, setClasses] = useState<string[]>([])
  const [majors, setMajors] = useState<string[]>([])
  const [filters, setFilters] = useState({
    status: 'all',
    class_name: 'all',
    major: 'all',
    hasPractice: 'all'
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    total: 0,
  })
  const [newStudent, setNewStudent] = useState({
    student_id: '',
    name: '',
    class_name: '',
    major: '',
    password: '123456',
  })

  const fetchStudents = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set('search', searchQuery)
      if (filters.status !== 'all') params.set('status', filters.status)
      if (filters.class_name !== 'all') params.set('class_name', filters.class_name)
      if (filters.major !== 'all') params.set('major', filters.major)
      if (filters.hasPractice !== 'all') params.set('hasPractice', filters.hasPractice)
      
      params.set('limit', pagination.pageSize.toString())
      params.set('offset', ((pagination.page - 1) * pagination.pageSize).toString())
      params.set('sort', 'student_id')
      
      const res = await fetch(`/api/students?${params}`)
      const data = await res.json()
      if (data.success && Array.isArray(data.data)) {
        setStudents(data.data)
        setPagination(prev => ({
          ...prev,
          total: data.total || 0,
        }))
      }
    } catch (error) {
      console.error('Failed to fetch students:', error)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, filters, pagination.page, pagination.pageSize])

  useEffect(() => {
    fetchStudents()
    fetchClasses()
    fetchMajors()
  }, [fetchStudents])

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/classes')
      const data = await res.json()
      if (data.success) {
        setClasses(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch classes:', error)
    }
  }

  const fetchMajors = async () => {
    try {
      const res = await fetch('/api/students/majors')
      const data = await res.json()
      if (data.success) {
        setMajors(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch majors:', error)
    }
  }

  const handleAddStudent = async () => {
    if (!newStudent.student_id || !newStudent.name) return
    
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      })
      const data = await res.json()
      if (data.success) {
        setNewStudent({ student_id: '', name: '', class_name: '', major: '', password: '123456' })
        setIsAddDialogOpen(false)
        fetchStudents()
      } else {
        alert(data.error || '添加失败')
      }
    } catch (error) {
      console.error('Failed to add student:', error)
      alert('添加失败')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateStudent = async () => {
    if (!editingStudent) return
    
    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/students/${editingStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingStudent.name,
          class_name: editingStudent.class_name,
          major: editingStudent.major,
          status: editingStudent.status,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setEditingStudent(null)
        fetchStudents()
      } else {
        alert(data.error || '更新失败')
      }
    } catch (error) {
      console.error('Failed to update student:', error)
      alert('更新失败')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteStudent = async (id: number) => {
    if (!confirm('确定要删除该学生吗？')) return
    
    try {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        fetchStudents()
      } else {
        alert(data.error || '删除失败')
      }
    } catch (error) {
      console.error('Failed to delete student:', error)
      alert('删除失败')
    }
  }

  const handleResetPassword = async (student: Student) => {
    if (!confirm(`确定要重置 ${student.name} 的密码为 123456 吗？`)) return
    
    try {
      const res = await fetch(`/api/students/${student.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: '123456' }),
      })
      const data = await res.json()
      if (data.success) {
        alert(`已重置 ${student.name} 的密码为: 123456`)
      } else {
        alert(data.error || '重置失败')
      }
    } catch (error) {
      console.error('Failed to reset password:', error)
      alert('重置失败')
    }
  }

  const handleImportStudents = async (data: ParsedStudent[]) => {
    const res = await fetch('/api/students', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ students: data }),
    })
    const result = await res.json()
    if (result.success) {
      fetchStudents()
      alert(`共${data.length}名记录\n成功${result.data.success || 0}条\n失败${result.data.failed || 0}条\n重复${result.data.duplicate || 0}条`)
    } else {
      throw new Error(result.error || '导入失败')
    }
  }

  const handleDownloadTemplate = () => {
    const template = generateStudentTemplate()
    downloadExcelTemplate(template, '学生导入模板.xlsx')
  }

  const handleExportStudents = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set('search', searchQuery)
      if (filters.status !== 'all') params.set('status', filters.status)
      if (filters.class_name !== 'all') params.set('class_name', filters.class_name)
      if (filters.major !== 'all') params.set('major', filters.major)
      if (filters.hasPractice !== 'all') params.set('hasPractice', filters.hasPractice)
      params.set('sort', 'student_id')
      params.set('limit', '0')
      
      const res = await fetch(`/api/students?${params}`)
      const data = await res.json()
      if (data.success && Array.isArray(data.data)) {
        const allStudents = data.data
        const ws = XLSX.utils.aoa_to_sheet([
          ['学号', '姓名', '班级', '专业', '状态', '最后登录', '创建时间'],
          ...allStudents.map(student => [
            student.student_id,
            student.name,
            student.class_name || '',
            student.major || '',
            student.status === 'active' ? '活跃' : student.status === 'locked' ? '锁定' : '不活跃',
            student.last_login ? new Date(student.last_login).toLocaleString('zh-CN') : '',
            new Date(student.created_at).toLocaleString('zh-CN')
          ])
        ])
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, '学生信息')
        const excelData = XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
        downloadExcelTemplate(excelData, `学生数据_${new Date().toISOString().slice(0, 10)}.xlsx`)
      }
    } catch (error) {
      console.error('Failed to export students:', error)
      alert('导出失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">学生管理</h1>
          <p className="text-muted-foreground mt-1">管理学生账号和查看学习记录</p>
        </div>
        <div className="flex items-center gap-2">
          <ImportDialog<ParsedStudent>
            title="批量导入学生"
            description="上传 Excel 文件批量导入学生信息"
            trigger={
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                批量导入
              </Button>
            }
            onParse={parseStudentExcel}
            onImport={handleImportStudents}
            onDownloadTemplate={handleDownloadTemplate}
            templateName="学生导入模板.xlsx"
            previewColumns={[
              { key: 'student_id', label: '学号' },
              { key: 'name', label: '姓名' },
              { key: 'class_name', label: '班级' },
              { key: 'major', label: '专业' },
            ]}
          />
          <Button variant="outline" size="sm" onClick={handleExportStudents}>
            <Download className="w-4 h-4 mr-2" />
            导出数据
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                添加学生
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>添加学生</DialogTitle>
                <DialogDescription>创建新的学生账号</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>学号 *</Label>
                  <Input
                    placeholder="请输入学号"
                    value={newStudent.student_id}
                    onChange={(e) => setNewStudent({ ...newStudent, student_id: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>姓名 *</Label>
                  <Input
                    placeholder="请输入姓名"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>班级</Label>
                  <Input
                    placeholder="请输入班级"
                    value={newStudent.class_name}
                    onChange={(e) => setNewStudent({ ...newStudent, class_name: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>专业</Label>
                  <Input
                    placeholder="请输入专业"
                    value={newStudent.major}
                    onChange={(e) => setNewStudent({ ...newStudent, major: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>初始密码</Label>
                  <Input
                    value={newStudent.password}
                    onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                    className="bg-input border-border"
                  />
                  <p className="text-xs text-muted-foreground">默认密码为 123456</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>取消</Button>
                <Button onClick={handleAddStudent} disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  确定添加
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Advanced Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索学号或姓名..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-input border-border"
              />
            </div>
            
            {/* Filter Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <Select 
                value={filters.status} 
                onValueChange={(value) => setFilters({ ...filters, status: value })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="学生状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="active">活跃</SelectItem>
                  <SelectItem value="inactive">不活跃</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Class Filter */}
              <Select 
                value={filters.class_name} 
                onValueChange={(value) => setFilters({ ...filters, class_name: value })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="班级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部班级</SelectItem>
                  {classes.map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Major Filter */}
              <Select 
                value={filters.major} 
                onValueChange={(value) => setFilters({ ...filters, major: value })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="专业" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部专业</SelectItem>
                  {majors.map(major => (
                    <SelectItem key={major} value={major}>{major}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Practice Filter */}
              <Select 
                value={filters.hasPractice} 
                onValueChange={(value) => setFilters({ ...filters, hasPractice: value })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="练习记录" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部</SelectItem>
                  <SelectItem value="true">有练习记录</SelectItem>
                  <SelectItem value="false">无练习记录</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            学生列表
          </CardTitle>
          <CardDescription>共 {pagination.total} 名学生</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : students.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              暂无学生数据
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>学号</TableHead>
                    <TableHead>姓名</TableHead>
                    <TableHead>班级</TableHead>
                    <TableHead>专业</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>最后登录</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id} className="border-border">
                      <TableCell className="font-mono">{student.student_id}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.class_name || '-'}</TableCell>
                      <TableCell className="text-muted-foreground">{student.major || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                          {student.status === 'active' ? '活跃' : student.status === 'locked' ? '锁定' : '不活跃'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {student.last_login ? new Date(student.last_login).toLocaleString('zh-CN') : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditingStudent(student)}>
                              <Edit className="w-4 h-4 mr-2" />
                              编辑信息
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleResetPassword(student)}>
                              <Key className="w-4 h-4 mr-2" />
                              重置密码
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              删除账号
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        {!loading && students.length > 0 && (
          <CardContent className="border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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
                  <Button 
                    variant="ghost" 
                    size="sm"
                  >
                    {pagination.page} / {Math.ceil(pagination.total / pagination.pageSize)}
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

      {/* Edit Dialog */}
      <Dialog open={!!editingStudent} onOpenChange={(open) => !open && setEditingStudent(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>编辑学生信息</DialogTitle>
            <DialogDescription>修改学生的基本信息</DialogDescription>
          </DialogHeader>
          {editingStudent && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>学号</Label>
                <Input value={editingStudent.student_id} disabled className="bg-input border-border" />
              </div>
              <div className="space-y-2">
                <Label>姓名</Label>
                <Input
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>班级</Label>
                <Input
                  value={editingStudent.class_name || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, class_name: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>专业</Label>
                <Input
                  value={editingStudent.major || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, major: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>状态</Label>
                <Select 
                  value={editingStudent.status} 
                  onValueChange={(v) => setEditingStudent({ ...editingStudent, status: v as Student['status'] })}
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">活跃</SelectItem>
                    <SelectItem value="inactive">不活跃</SelectItem>
                    <SelectItem value="locked">锁定</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingStudent(null)}>取消</Button>
            <Button onClick={handleUpdateStudent} disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              保存修改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
