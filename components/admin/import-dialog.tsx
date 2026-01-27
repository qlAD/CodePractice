'use client'

import React from "react"

import { useState, useCallback, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImportDialogProps<T> {
  title: string
  description: string
  trigger: ReactNode
  onParse: (file: File) => Promise<{
    success: boolean
    data: T[]
    errors: Array<{ row: number; message: string }>
    totalRows: number
  }>
  onImport: (data: T[]) => Promise<void>
  onDownloadTemplate: () => void
  previewColumns: Array<{ key: keyof T; label: string }>
  templateName: string
}

export function ImportDialog<T extends Record<string, any>>({
  title,
  description,
  trigger,
  onParse,
  onImport,
  onDownloadTemplate,
  previewColumns,
  templateName,
}: ImportDialogProps<T>) {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [parseResult, setParseResult] = useState<{
    success: boolean
    data: T[]
    errors: Array<{ row: number; message: string }>
    totalRows: number
  } | null>(null)
  const [isParsing, setIsParsing] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [importComplete, setImportComplete] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFileChange = useCallback(async (selectedFile: File | null) => {
    if (!selectedFile) return
    
    // Validate file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ]
    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.xlsx?$/)) {
      alert('请上传 Excel 文件 (.xlsx 或 .xls)')
      return
    }

    setFile(selectedFile)
    setIsParsing(true)
    setParseResult(null)
    setImportComplete(false)

    try {
      const result = await onParse(selectedFile)
      setParseResult(result)
    } catch (error) {
      setParseResult({
        success: false,
        data: [],
        errors: [{ row: 0, message: '文件解析失败，请检查文件格式' }],
        totalRows: 0,
      })
    } finally {
      setIsParsing(false)
    }
  }, [onParse])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileChange(droppedFile)
    }
  }, [handleFileChange])

  const handleImport = async () => {
    if (!parseResult?.data.length) return

    setIsImporting(true)
    try {
      await onImport(parseResult.data)
      setImportComplete(true)
      setTimeout(() => {
        setOpen(false)
        resetState()
      }, 1500)
    } catch (error) {
      alert('导入失败，请重试')
    } finally {
      setIsImporting(false)
    }
  }

  const resetState = () => {
    setFile(null)
    setParseResult(null)
    setImportComplete(false)
  }

  return (
    <Dialog open={open} onOpenChange={(v) => {
      setOpen(v)
      if (!v) resetState()
    }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-card border-border max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden space-y-4 py-4">
          {/* Template download */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground">下载模板文件填写后上传</span>
            </div>
            <Button variant="outline" size="sm" onClick={onDownloadTemplate}>
              <Download className="w-4 h-4 mr-2" />
              {templateName}
            </Button>
          </div>

          {/* File upload area */}
          <div
            className={cn(
              'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
              dragOver ? 'border-primary bg-primary/5' : 'border-border',
              file ? 'bg-secondary/30' : ''
            )}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {isParsing ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-muted-foreground">正在解析文件...</p>
              </div>
            ) : file ? (
              <div className="flex flex-col items-center gap-2">
                <FileSpreadsheet className="w-8 h-8 text-primary" />
                <p className="text-foreground font-medium">{file.name}</p>
                <Button variant="ghost" size="sm" onClick={resetState}>
                  重新选择
                </Button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground mb-2">拖拽文件到此处，或点击选择文件</p>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                />
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    选择 Excel 文件
                  </label>
                </Button>
              </>
            )}
          </div>

          {/* Parse result */}
          {parseResult && (
            <div className="space-y-4">
              {/* Summary */}
              <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 border border-border">
                {parseResult.errors.length === 0 ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-warning" />
                )}
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    解析完成：共 {parseResult.totalRows} 行，有效 {parseResult.data.length} 条
                    {parseResult.errors.length > 0 && (
                      <span className="text-warning ml-2">
                        ({parseResult.errors.length} 条错误)
                      </span>
                    )}
                  </p>
                </div>
                {parseResult.data.length > 0 && (
                  <Badge variant="outline" className="text-success border-success">
                    可导入
                  </Badge>
                )}
              </div>

              {/* Errors */}
              {parseResult.errors.length > 0 && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                  <p className="text-sm font-medium text-destructive mb-2">解析错误：</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {parseResult.errors.slice(0, 5).map((err, i) => (
                      <li key={i}>第 {err.row} 行: {err.message}</li>
                    ))}
                    {parseResult.errors.length > 5 && (
                      <li>...还有 {parseResult.errors.length - 5} 条错误</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Preview table */}
              {parseResult.data.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">数据预览 (前10条)</p>
                  <ScrollArea className="h-48 rounded-lg border border-border">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border">
                          {previewColumns.map((col) => (
                            <TableHead key={String(col.key)}>{col.label}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parseResult.data.slice(0, 10).map((item, index) => (
                          <TableRow key={index} className="border-border">
                            {previewColumns.map((col) => (
                              <TableCell key={String(col.key)}>
                                {String(item[col.key] || '-')}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button
            onClick={handleImport}
            disabled={!parseResult?.data.length || isImporting || importComplete}
            className="bg-primary hover:bg-primary/90"
          >
            {isImporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                导入中...
              </>
            ) : importComplete ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                导入成功
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                确认导入 ({parseResult?.data.length || 0} 条)
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
