'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { diffChars } from 'diff'

export default function Component() {
  const [originalText, setOriginalText] = useState('')
  const [correctedText, setCorrectedText] = useState('')
  const [diff, setDiff] = useState<any[]>([])

  useEffect(() => {
    const differences = diffChars(originalText, correctedText)
    setDiff(differences)
  }, [originalText, correctedText])

  const renderDiff = (text: string, type: 'original' | 'corrected') => {
    return diff.map((part, index) => {
      const color = part.added ? 'bg-green-200 dark:bg-green-900' :
                    part.removed ? 'bg-red-200 dark:bg-red-900' : ''
      const display = (type === 'original' && !part.added) || (type === 'corrected' && !part.removed)
      return display ? (
        <span key={index} className={color}>
          {part.value}
        </span>
      ) : null
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-semibold mb-4 text-center">Article Editor</h1>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-medium mb-2">Original</h2>
            <Textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="ここにオリジナルテキストを入力してください"
              className="min-h-[300px] mb-2"
              resize="none"
            />
            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded min-h-[100px] overflow-auto whitespace-pre-wrap break-words">
              {renderDiff(originalText, 'original')}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-medium mb-2">Proofread</h2>
            <Textarea
              value={correctedText}
              onChange={(e) => setCorrectedText(e.target.value)}
              placeholder="ここに校正済みテキストを入力してください"
              className="min-h-[300px] mb-2"
              resize="none"
            />
            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded min-h-[100px] overflow-auto whitespace-pre-wrap break-words">
              {renderDiff(correctedText, 'corrected')}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}