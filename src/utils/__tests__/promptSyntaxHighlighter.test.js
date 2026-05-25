import { describe, expect, it } from 'vitest'
import {
  createPromptHighlightedLines,
  createPromptHighlightedTokens,
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
    expect(lines[2].tokens).toEqual([
      { id: 'token-0', text: 'Тема: ', type: 'plain' },
      { id: 'token-1', text: '{{topic}}', type: 'variable' },
    ])
  })

  it('подсвечивает inline-токены внутри обычной строки', () => {
    const tokens = createPromptHighlightedTokens('Формат: <json> и `code` → {{result}}')

    expect(tokens.map((token) => token.type)).toEqual([
      'plain',
      'xml-tag',
      'plain',
      'code',
      'plain',
      'metaglyph',
      'plain',
      'variable',
    ])
  })

  it('разделяет JSON-ключи, значения и пунктуацию', () => {
    const tokens = createPromptHighlightedTokens('"style": "student"', 'json')

    expect(tokens).toEqual([
      { id: 'token-0', text: '"style"', type: 'json-key' },
      { id: 'token-1', text: ':', type: 'json-punctuation' },
      { id: 'token-2', text: ' ', type: 'plain' },
      { id: 'token-3', text: '"student"', type: 'json-string' },
    ])
  })
})
