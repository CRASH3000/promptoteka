import { describe, expect, it } from 'vitest'
import {
  createPromptHighlightedLines,
  getPromptLineType,
} from '../promptSyntaxHighlighter'

describe('promptSyntaxHighlighter', () => {
  it('определяет заголовок промпта', () => {
    expect(getPromptLineType('## Роль')).toBe('heading')
  })

  it('определяет разделитель', () => {
    expect(getPromptLineType('---')).toBe('separator')
  })

  it('определяет переменную', () => {
    expect(getPromptLineType('Тема: {{topic}}')).toBe('variable')
  })

  it('определяет JSON-строку', () => {
    expect(getPromptLineType('"style": "student"')).toBe('json')
  })

  it('создаёт список строк для подсветки', () => {
    const lines = createPromptHighlightedLines('## Роль\n---\nТема: {{topic}}')

    expect(lines).toHaveLength(3)
    expect(lines[0].type).toBe('heading')
    expect(lines[1].type).toBe('separator')
    expect(lines[2].type).toBe('variable')
  })
})