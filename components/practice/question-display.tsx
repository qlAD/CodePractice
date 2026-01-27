'use client'

import { useState } from 'react'
import type { Question, Language } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CodeEditor } from './code-editor'
import { cn } from '@/lib/utils'
import { CodeRunner } from './code-runner'
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  Flag,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react'

interface QuestionDisplayProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  userAnswer: string
  onAnswerChange: (answer: string) => void
  showAnswer?: boolean
  isSubmitted?: boolean
  isMarked?: boolean
  onToggleMark?: () => void
  isCorrect?: boolean // 从服务器返回的正确性判断
  status?: string // partial, correct, wrong
  score?: number
  matchPercentage?: number // 匹配百分比（程序设计题）
  optionOrder?: number[]
}

const difficultyConfig = {
  easy: { label: '简单', color: 'bg-success/20 text-success' },
  medium: { label: '中等', color: 'bg-warning/20 text-warning' },
  hard: { label: '困难', color: 'bg-destructive/20 text-destructive' },
}

const typeLabels = {
  single_choice: '单选题',
  fill_blank: '程序填空',
  error_fix: '程序改错',
  programming: '程序设计',
}

export function QuestionDisplay({
  question,
  questionNumber,
  totalQuestions,
  userAnswer,
  onAnswerChange,
  showAnswer = false,
  isSubmitted = false,
  isMarked = false,
  onToggleMark,
  isCorrect: isCorrectProp,
  status,
  score,
  matchPercentage,
  optionOrder,
}: QuestionDisplayProps) {
  const [showExplanation, setShowExplanation] = useState(false)

  // 优先使用服务器返回的正确性判断
  const isCorrect = isCorrectProp !== undefined ? isCorrectProp : userAnswer === question.answer

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg text-foreground">
              第 {questionNumber}/{totalQuestions} 题
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {typeLabels[question.type]}
            </Badge>
            <Badge className={cn('text-xs', difficultyConfig[question.difficulty].color)}>
              {difficultyConfig[question.difficulty].label}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {question.score} 分
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {onToggleMark && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleMark}
                className={cn(
                  'gap-1',
                  isMarked ? 'text-warning' : 'text-muted-foreground'
                )}
              >
                <Flag className={cn('w-4 h-4', isMarked && 'fill-warning')} />
                {isMarked ? '已标记' : '标记'}
              </Button>
            )}
            {isSubmitted && (
              <div className="flex items-center gap-1">
                {status === 'partial' ? (
                  <>
                    <AlertCircle className="w-5 h-5 text-warning" />
                    <span className="text-sm text-warning">部分正确 ({score !== undefined ? score.toFixed(1) : '0.0'}分)</span>
                  </>
                ) : isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-sm text-success">正确 ({score !== undefined ? score.toFixed(1) : '0.0'}分)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-destructive" />
                    <span className="text-sm text-destructive">错误 ({score !== undefined ? score.toFixed(1) : '0.0'}分)</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question content */}
        <div className="text-foreground whitespace-pre-wrap">{question.content}</div>

        {/* Answer area based on question type */}
        {question.type === 'single_choice' && question.options && (
          <SingleChoiceAnswer
            options={question.options}
            answer={userAnswer}
            correctAnswer={question.answer}
            onChange={onAnswerChange}
            showAnswer={showAnswer}
            isSubmitted={isSubmitted}
            optionOrder={optionOrder}
          />
        )}

        {question.type === 'fill_blank' && (
          <FillBlankAnswer
            codeTemplate={question.code_template || ''}
            answer={userAnswer}
            correctAnswer={question.answer}
            onChange={onAnswerChange}
            showAnswer={showAnswer}
            isSubmitted={isSubmitted}
            language={question.language}
          />
        )}

        {question.type === 'error_fix' && (
          <FixErrorAnswer
            codeTemplate={question.code_template || ''}
            answer={userAnswer}
            correctAnswer={question.answer}
            onChange={onAnswerChange}
            showAnswer={showAnswer}
            isSubmitted={isSubmitted}
            language={question.language}
          />
        )}

        {question.type === 'programming' && (
          <ProgrammingAnswer
            codeTemplate={question.code_template || ''}
            answer={userAnswer}
            correctAnswer={question.answer}
            onChange={onAnswerChange}
            showAnswer={showAnswer}
            isSubmitted={isSubmitted}
            language={question.language}
            matchPercentage={matchPercentage}
          />
        )}
      </CardContent>
    </Card>
  )
}

// Single choice answer component
function SingleChoiceAnswer({
  options,
  answer,
  correctAnswer,
  onChange,
  showAnswer,
  isSubmitted,
  optionOrder,
}: {
  options: string[]
  answer: string
  correctAnswer: string
  onChange: (answer: string) => void
  showAnswer: boolean
  isSubmitted: boolean
  optionOrder?: number[]
}) {
  const optionLabels = ['A', 'B', 'C', 'D']
  const order =
    optionOrder && optionOrder.length
      ? optionOrder
      : options.map((_, index) => index)

  return (
    <RadioGroup value={answer} onValueChange={onChange} disabled={isSubmitted}>
      <div className="space-y-3">
        {order.map((originalIndex, displayIndex) => {
          const displayLabel = optionLabels[displayIndex]
          const valueLabel = optionLabels[originalIndex]
          const option = options[originalIndex]
          const isSelected = answer === valueLabel
          const isCorrectOption = correctAnswer === valueLabel
          const showResult = showAnswer || isSubmitted

          return (
            <div
              key={displayLabel}
              className={cn(
                'flex items-center space-x-3 p-3 rounded-lg border transition-colors',
                showResult && isCorrectOption
                  ? 'border-success bg-success/10'
                  : showResult && isSelected && !isCorrectOption
                    ? 'border-destructive bg-destructive/10'
                    : isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-secondary/30 hover:border-primary/50'
              )}
            >
              <RadioGroupItem value={valueLabel} id={`option-${displayLabel}`} />
              <Label
                htmlFor={`option-${displayLabel}`}
                className="flex-1 cursor-pointer text-foreground"
              >
                <span className="font-medium mr-2">{displayLabel}.</span>
                {option}
              </Label>
              {showResult && isCorrectOption && (
                <CheckCircle2 className="w-5 h-5 text-success" />
              )}
              {showResult && isSelected && !isCorrectOption && (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
            </div>
          )
        })}
      </div>
    </RadioGroup>
  )
}

// Fill blank answer component
function FillBlankAnswer({
  codeTemplate,
  answer,
  correctAnswer,
  onChange,
  showAnswer,
  isSubmitted,
  language,
}: {
  codeTemplate: string
  answer: string
  correctAnswer: string
  onChange: (answer: string) => void
  showAnswer: boolean
  isSubmitted: boolean
  language: Language
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-foreground">请填写空白处的代码：</Label>
        <CodeEditor
          value={answer || codeTemplate}
          onChange={onChange}
          language={language}
          readOnly={isSubmitted}
          height="350px"
        />
      </div>

      {!isSubmitted && (
        <CodeRunner
          code={answer || codeTemplate}
          language={language}
        />
      )}

      {(showAnswer || isSubmitted) && (
        <div className="space-y-2">
          <Label className="text-success">参考答案：</Label>
          <div className="rounded-lg overflow-hidden border border-success/30 p-4 bg-secondary/30 font-mono text-sm whitespace-pre-wrap text-foreground">
            {correctAnswer}
          </div>
        </div>
      )}
    </div>
  )
}

// Fix error answer component
function FixErrorAnswer({
  codeTemplate,
  answer,
  correctAnswer,
  onChange,
  showAnswer,
  isSubmitted,
  language,
}: {
  codeTemplate: string
  answer: string
  correctAnswer: string
  onChange: (answer: string) => void
  showAnswer: boolean
  isSubmitted: boolean
  language: Language
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-foreground">请修改以下代码中的错误：</Label>
        <CodeEditor
          value={answer || codeTemplate}
          onChange={onChange}
          language={language}
          readOnly={isSubmitted}
          height="350px"
        />
      </div>

      {!isSubmitted && (
        <CodeRunner
          code={answer || codeTemplate}
          language={language}
        />
      )}

      {(showAnswer || isSubmitted) && (
        <div className="space-y-2">
          <Label className="text-success">参考答案：</Label>
          <div className="rounded-lg overflow-hidden border border-success/30 p-4 bg-secondary/30 font-mono text-sm whitespace-pre-wrap text-foreground">
            {correctAnswer}
          </div>
        </div>
      )}
    </div>
  )
}

// Programming answer component
function ProgrammingAnswer({
  codeTemplate,
  answer,
  correctAnswer,
  onChange,
  showAnswer,
  isSubmitted,
  language,
  testCases,
  matchPercentage,
}: {
  codeTemplate: string
  answer: string
  correctAnswer: string
  onChange: (answer: string) => void
  showAnswer: boolean
  isSubmitted: boolean
  language: Language
  testCases?: Array<{ input: string; expectedOutput: string }>
  matchPercentage?: number
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-foreground">编写你的代码：</Label>
        <CodeEditor
          value={answer || codeTemplate}
          onChange={onChange}
          language={language}
          readOnly={isSubmitted}
          height="350px"
        />
      </div>

      {!isSubmitted && (
        <CodeRunner
          code={answer || codeTemplate}
          language={language}
          testCases={testCases}
        />
      )}

      {(showAnswer || isSubmitted) && (
        <div className="space-y-2">
          {matchPercentage !== undefined && (
            <div className="flex items-center gap-2 text-sm">
              <Label className="text-foreground">匹配度：</Label>
              <span className={cn(
                'font-semibold',
                matchPercentage >= 90 ? 'text-success' : matchPercentage >= 50 ? 'text-warning' : 'text-destructive'
              )}>
                {matchPercentage}%
              </span>
            </div>
          )}
          <Label className="text-success">参考答案：</Label>
          <div className="rounded-lg overflow-hidden border border-success/30">
            <CodeEditor
              value={correctAnswer}
              onChange={() => {}}
              language={language}
              readOnly
              height="250px"
            />
          </div>
        </div>
      )}
    </div>
  )
}
