import { beforeEach, describe, expect, it } from 'vitest'
import {
  checkTemplateIsFavorite,
  getFavoriteTemplateIdsFromStorage,
  saveFavoriteTemplateIdsToStorage,
  toggleTemplateFavorite,
} from '../templateFavoritesStorage'

describe('templateFavoritesStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('сохраняет и читает избранные шаблоны из localStorage', () => {
    saveFavoriteTemplateIdsToStorage(['study-summary-card'])

    expect(getFavoriteTemplateIdsFromStorage()).toEqual(['study-summary-card'])
  })

  it('добавляет и убирает шаблон из избранного', () => {
    const addedFavorites = toggleTemplateFavorite('work-email-card', [])
    const removedFavorites = toggleTemplateFavorite('work-email-card', addedFavorites)

    expect(addedFavorites).toEqual(['work-email-card'])
    expect(removedFavorites).toEqual([])
  })

  it('проверяет, находится ли шаблон в избранном', () => {
    expect(checkTemplateIsFavorite('image-prompt-card', ['image-prompt-card'])).toBe(true)
    expect(checkTemplateIsFavorite('code-review-card', ['image-prompt-card'])).toBe(false)
  })
})
