const FAVORITE_TEMPLATES_STORAGE_KEY = 'promptoteka-favorite-template-ids'

export function getFavoriteTemplateIdsFromStorage() {
  try {
    const savedValue = localStorage.getItem(FAVORITE_TEMPLATES_STORAGE_KEY)

    if (!savedValue) {
      return []
    }

    const parsedValue = JSON.parse(savedValue)

    if (!Array.isArray(parsedValue)) {
      return []
    }

    return parsedValue
  } catch {
    return []
  }
}

export function saveFavoriteTemplateIdsToStorage(templateIds) {
  localStorage.setItem(
    FAVORITE_TEMPLATES_STORAGE_KEY,
    JSON.stringify(templateIds),
  )
}

export function checkTemplateIsFavorite(templateId, favoriteTemplateIds) {
  return favoriteTemplateIds.includes(templateId)
}

export function toggleTemplateFavorite(templateId, favoriteTemplateIds) {
  const isFavorite = checkTemplateIsFavorite(templateId, favoriteTemplateIds)

  if (isFavorite) {
    return favoriteTemplateIds.filter(
      (savedTemplateId) => savedTemplateId !== templateId,
    )
  }

  return [...favoriteTemplateIds, templateId]
}
