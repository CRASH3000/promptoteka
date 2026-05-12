import { describe, expect, it } from 'vitest'
import {
  hasTemplateFormErrors,
  validateTemplateForm,
} from '../templateFormValidation'

describe('templateFormValidation', () => {
  it('возвращает ошибки для пустой формы создания шаблона', () => {
    const errors = validateTemplateForm({
      title: '',
      prompt: '',
      result: '',
      sphere: '',
      tool: '',
      conversionType: '',
    })

    expect(errors.title).toBe('Введите название шаблона')
    expect(errors.prompt).toBe('Введите текст промпта')
    expect(errors.result).toBe('Введите пример результата')
    expect(errors.sphere).toBe('Выберите сферу применения')
    expect(errors.tool).toBe('Выберите ИИ-инструмент')
    expect(errors.conversionType).toBe('Выберите тип конвертации')
    expect(hasTemplateFormErrors(errors)).toBe(true)
  })

  it('не возвращает ошибки для корректно заполненной формы шаблона', () => {
    const errors = validateTemplateForm({
      title: 'Конспект лекции',
      prompt: '## Роль\nТы преподаватель. Сделай понятный конспект по теме.',
      result: 'Понятный конспект с примерами.',
      sphere: 'Учёба',
      tool: 'ChatGPT',
      conversionType: 'txt2txt',
    })

    expect(errors).toEqual({})
    expect(hasTemplateFormErrors(errors)).toBe(false)
  })

  it('проверяет минимальную длину промпта', () => {
    const errors = validateTemplateForm({
      title: 'Шаблон',
      prompt: 'Коротко',
      result: 'Результат',
      sphere: 'Учёба',
      tool: 'ChatGPT',
      conversionType: 'txt2txt',
    })

    expect(errors.prompt).toBe('Промпт должен быть подробнее, минимум 20 символов')
  })
})