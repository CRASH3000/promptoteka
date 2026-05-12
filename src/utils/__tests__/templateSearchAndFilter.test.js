import { describe, expect, it } from 'vitest'
import { demoTemplates } from '../../data/demoTemplates'
import {
  filterTemplatesByFields,
  findTemplateById,
  searchAndFilterTemplates,
  searchTemplatesByQuery,
} from '../templateSearchAndFilter'

describe('templateSearchAndFilter', () => {
  it('ищет шаблон по названию', () => {
    const result = searchTemplatesByQuery(demoTemplates, 'конспект')

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('study-summary-card')
  })

  it('возвращает все шаблоны, если поисковая строка пустая', () => {
    const result = searchTemplatesByQuery(demoTemplates, '')

    expect(result).toHaveLength(demoTemplates.length)
  })

  it('фильтрует шаблоны по сфере и инструменту', () => {
    const result = filterTemplatesByFields(demoTemplates, {
      sphere: 'Учёба',
      tool: 'ChatGPT',
      conversionType: '',
    })

    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Конспект учебного материала')
  })

  it('объединяет поиск и фильтрацию', () => {
    const result = searchAndFilterTemplates(demoTemplates, 'код', {
      sphere: 'Разработка',
      tool: 'ChatGPT',
      conversionType: 'txt2txt',
    })

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('code-review-card')
  })

  it('находит шаблон по id', () => {
    const template = findTemplateById(demoTemplates, 'work-email-card')

    expect(template.title).toBe('Деловое письмо без воды')
  })
})