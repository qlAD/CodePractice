'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Plus,
  Settings,
  Bell,
  FileText,
  Loader2,
  Cog,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useTeacherAuth } from '@/lib/teacher-auth-context'

interface SystemLog {
  id: number
  user_type: string
  user_id: number
  user_name: string
  module: string
  action: string
  detail: string
  status: string
  created_at: string
}

export default function SettingsPage() {
  const { hasPermission } = useTeacherAuth()
  const [logs, setLogs] = useState<SystemLog[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // System settings
  const [systemSettings, setSystemSettings] = useState({
    platformName: 'CodePractice',
    sessionTimeout: 30,
    backupCycle: 'daily',
  })

  const isAdmin = hasPermission('system_management') || hasPermission('all')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [settingsRes, logsRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/logs?limit=50'),
      ])
      
      const settingsData = await settingsRes.json()
      const logsData = await logsRes.json()
      
      if (settingsData.success && settingsData.data) {
        const data = settingsData.data
        setSystemSettings({
          platformName: data.platformName || 'CodePractice',
          sessionTimeout: Number(data.sessionTimeout) || 30,
          backupCycle: data.backupCycle || 'daily',
        })
      }
      
      if (logsData.success) {
        setLogs(logsData.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSystemSettings = async () => {
    setSaving(true)
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platformName: systemSettings.platformName,
          sessionTimeout: String(systemSettings.sessionTimeout),
          backupCycle: systemSettings.backupCycle,
        }),
      })
      alert('保存成功')
    } catch (error) {
      console.error('Failed to save:', error)
      alert('保存失败')
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('zh-CN')
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
          <h1 className="text-2xl font-bold text-foreground">系统设置</h1>
          <p className="text-muted-foreground mt-1">管理配置和查看系统日志</p>
        </div>
      </div>

      <Tabs defaultValue="system" className="space-y-6">
        <TabsList className="bg-secondary">
          {isAdmin && <TabsTrigger value="system">系统配置</TabsTrigger>}
          {isAdmin && <TabsTrigger value="logs">系统日志</TabsTrigger>}
        </TabsList>

        {/* System Config Tab */}
        {isAdmin && (
          <TabsContent value="system" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  基础配置
                </CardTitle>
                <CardDescription>平台基础信息设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>平台名称</Label>
                  <Input
                    value={systemSettings.platformName}
                    onChange={(e) => setSystemSettings({ ...systemSettings, platformName: e.target.value })}
                    className="bg-input border-border max-w-md"
                  />
                </div>

                <div className="space-y-2">
                  <Label>会话超时时间 (分钟)</Label>
                  <Input
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => setSystemSettings({ ...systemSettings, sessionTimeout: Number(e.target.value) })}
                    className="bg-input border-border w-32"
                  />
                  <p className="text-sm text-muted-foreground">用户无操作后自动登出的时间</p>
                </div>

                <div className="space-y-2">
                  <Label>数据备份周期</Label>
                  <Select value={systemSettings.backupCycle} onValueChange={(v) => setSystemSettings({ ...systemSettings, backupCycle: v })}>
                    <SelectTrigger className="bg-input border-border w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">每天</SelectItem>
                      <SelectItem value="weekly">每周</SelectItem>
                      <SelectItem value="monthly">每月</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSaveSystemSettings} disabled={saving}>
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  保存配置
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Logs Tab */}
        {isAdmin && (
          <TabsContent value="logs" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  系统日志
                </CardTitle>
                <CardDescription>最近 {logs.length} 条操作记录</CardDescription>
              </CardHeader>
              <CardContent>
                {logs.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>暂无系统日志</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border">
                          <TableHead>时间</TableHead>
                          <TableHead>用户</TableHead>
                          <TableHead>类型</TableHead>
                          <TableHead>模块</TableHead>
                          <TableHead>操作</TableHead>
                          <TableHead>详情</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {logs.map((log) => (
                          <TableRow key={log.id} className="border-border">
                            <TableCell className="text-muted-foreground font-mono text-sm">
                              {formatDate(log.created_at)}
                            </TableCell>
                            <TableCell className="font-medium">{log.user_name}</TableCell>
                            <TableCell>
                              <Badge variant={log.user_type === 'teacher' ? 'default' : 'secondary'}>
                                {log.user_type === 'teacher' ? '教师' : '学生'}
                              </Badge>
                            </TableCell>
                            <TableCell>{log.module}</TableCell>
                            <TableCell>{log.action}</TableCell>
                            <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
                              {log.detail}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
