'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
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
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Key,
  UserCog,
  Shield,
  Loader2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useTeacherAuth } from '@/lib/teacher-auth-context'

interface Teacher {
  id: number
  teacher_id: string
  name: string
  role: string
  permissions: string[]
  status: string
  last_login: string | null
  department?: string
}

const permissionLabels: Record<string, string> = {
  all: '全部权限',
  user_management: '用户管理',
  question_management: '题库管理',
  practice_management: '练习管理',
  system_management: '系统管理',
}

export default function TeachersPage() {
  const { user } = useTeacherAuth()
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [newTeacher, setNewTeacher] = useState({
    teacher_id: '',
    name: '',
    password: '',
    department: '',
    permissions: [] as string[],
  })

  const isAdmin = user?.role === 'admin'

  const fetchTeachers = async () => {
    try {
      const res = await fetch('/api/teachers')
      const data = await res.json()
      if (data.success && Array.isArray(data.data)) {
        setTeachers(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch teachers:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeachers()
  }, [])

  const filteredTeachers = teachers.filter(teacher => {
    return teacher.name.includes(searchQuery) || teacher.teacher_id.includes(searchQuery)
  })

  const handleAddTeacher = async () => {
    if (!newTeacher.teacher_id || !newTeacher.name || !newTeacher.password) {
      setError('请填写完整信息')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeacher),
      })

      const data = await res.json()

      if (data.success) {
        await fetchTeachers()
        setNewTeacher({ teacher_id: '', name: '', password: '', department: '', permissions: [] })
        setIsAddDialogOpen(false)
      } else {
        setError(data.error || '添加失败')
      }
    } catch {
      setError('网络错误，请稍后重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteTeacher = async (id: number, name: string) => {
    if (!confirm(`确定要删除教师 "${name}" 吗？此操作不可恢复。`)) {
      return
    }

    try {
      const res = await fetch(`/api/teachers/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (data.success) {
        await fetchTeachers()
      } else {
        alert(data.error || '删除失败')
      }
    } catch {
      alert('网络错误，请稍后重试')
    }
  }

  const handleResetPassword = async (teacher: Teacher) => {
    if (!confirm(`确定要重置 "${teacher.name}" 的密码吗？`)) {
      return
    }

    try {
      const res = await fetch(`/api/teachers/${teacher.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: '123456' }),
      })

      const data = await res.json()

      if (data.success) {
        alert(`已重置 ${teacher.name} 的密码为: 123456`)
      } else {
        alert(data.error || '重置失败')
      }
    } catch {
      alert('网络错误，请稍后重试')
    }
  }

  const togglePermission = (permission: string) => {
    setNewTeacher(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  const handleUpdateTeacher = async () => {
    if (!editingTeacher) return

    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch(`/api/teachers/${editingTeacher.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingTeacher.name,
          department: editingTeacher.department,
          permissions: editingTeacher.permissions,
        }),
      })

      const data = await res.json()

      if (data.success) {
        await fetchTeachers()
        setEditingTeacher(null)
      } else {
        setError(data.error || '更新失败')
      }
    } catch {
      setError('网络错误，请稍后重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAdmin) {
    return (
      <div className="p-6 lg:p-8">
        <Card className="bg-card border-border">
          <CardContent className="p-12 text-center">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">权限不足</h2>
            <p className="text-muted-foreground">只有管理员可以管理教师账号</p>
          </CardContent>
        </Card>
      </div>
    )
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
          <h1 className="text-2xl font-bold text-foreground">教师管理</h1>
          <p className="text-muted-foreground mt-1">管理教师账号和权限分配</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                添加教师
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>添加教师</DialogTitle>
                <DialogDescription>创建新的教师账号并分配权限</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label>工号 *</Label>
                  <Input
                    placeholder="请输入工号"
                    value={newTeacher.teacher_id}
                    onChange={(e) => setNewTeacher({ ...newTeacher, teacher_id: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>姓名 *</Label>
                  <Input
                    placeholder="请输入姓名"
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>部门</Label>
                  <Input
                    placeholder="请输入部门"
                    value={newTeacher.department}
                    onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>初始密码 *</Label>
                  <Input
                    type="password"
                    placeholder="请输入初始密码"
                    value={newTeacher.password}
                    onChange={(e) => setNewTeacher({ ...newTeacher, password: e.target.value })}
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-3">
                  <Label>权限分配</Label>
                  <div className="space-y-2">
                    {['user_management', 'question_management', 'practice_management', 'system_management'].map((perm) => (
                      <div key={perm} className="flex items-center space-x-2">
                        <Checkbox
                          id={perm}
                          checked={newTeacher.permissions.includes(perm)}
                          onCheckedChange={() => togglePermission(perm)}
                        />
                        <label htmlFor={perm} className="text-sm text-foreground cursor-pointer">
                          {permissionLabels[perm]}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>取消</Button>
                <Button onClick={handleAddTeacher} disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  确定添加
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索工号或姓名..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-input border-border"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <UserCog className="w-5 h-5 text-primary" />
            教师列表
          </CardTitle>
          <CardDescription>共 {filteredTeachers.length} 名教师</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTeachers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              暂无教师数据
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>工号</TableHead>
                    <TableHead>姓名</TableHead>
                    <TableHead>部门</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>权限</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>最后登录</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id} className="border-border">
                      <TableCell className="font-mono">{teacher.teacher_id}</TableCell>
                      <TableCell className="font-medium">{teacher.name}</TableCell>
                      <TableCell className="text-muted-foreground">{teacher.department || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={teacher.role === 'admin' ? 'default' : 'secondary'}>
                          {teacher.role === 'admin' ? '管理员' : '教师'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(teacher.permissions || []).map((perm) => (
                            <Badge key={perm} variant="outline" className="text-xs">
                              {permissionLabels[perm] || perm}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                          {teacher.status === 'active' ? '活跃' : '不活跃'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {teacher.last_login ? new Date(teacher.last_login).toLocaleString('zh-CN') : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditingTeacher(teacher)}>
                              <Edit className="w-4 h-4 mr-2" />
                              编辑信息
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleResetPassword(teacher)}>
                              <Key className="w-4 h-4 mr-2" />
                              重置密码
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteTeacher(teacher.id, teacher.name)}
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
      </Card>

      {/* Edit Teacher Dialog */}
      <Dialog open={!!editingTeacher} onOpenChange={() => setEditingTeacher(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>编辑教师信息</DialogTitle>
          </DialogHeader>
          {editingTeacher && (
            <div className="space-y-4 py-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label>工号</Label>
                <Input value={editingTeacher.teacher_id} disabled className="bg-input border-border" />
              </div>
              <div className="space-y-2">
                <Label>姓名</Label>
                <Input
                  value={editingTeacher.name}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>部门</Label>
                <Input
                  value={editingTeacher.department || ''}
                  onChange={(e) => setEditingTeacher({ ...editingTeacher, department: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-3">
                <Label>权限分配</Label>
                <div className="space-y-2">
                  {['user_management', 'question_management', 'practice_management', 'system_management'].map((perm) => (
                    <div key={perm} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-${perm}`}
                        checked={editingTeacher.permissions.includes(perm)}
                        onCheckedChange={() => {
                          setEditingTeacher({
                            ...editingTeacher,
                            permissions: editingTeacher.permissions.includes(perm)
                              ? editingTeacher.permissions.filter(p => p !== perm)
                              : [...editingTeacher.permissions, perm]
                          })
                        }}
                      />
                      <label htmlFor={`edit-${perm}`} className="text-sm text-foreground cursor-pointer">
                        {permissionLabels[perm]}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTeacher(null)}>取消</Button>
            <Button onClick={handleUpdateTeacher} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              保存修改
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
