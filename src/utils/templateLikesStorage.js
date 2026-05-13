const LIKED_TEMPLATES_STORAGE_KEY = 'promptoteka-liked-template-ids'

export function getLikedTemplateIdsFromStorage() {
  try {
    const savedValue = localStorage.getItem(LIKED_TEMPLATES_STORAGE_KEY)

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

export function saveLikedTemplateIdsToStorage(templateIds) {
  localStorage.setItem(
    LIKED_TEMPLATES_STORAGE_KEY,
    JSON.stringify(templateIds),
  )
}

export function checkTemplateIsLiked(templateId, likedTemplateIds) {
  return likedTemplateIds.includes(templateId)
}

export function getTemplateLikesCount(template, likedTemplateIds) {
  const baseLikes = template.likes || 0
  const isLiked = checkTemplateIsLiked(template.id, likedTemplateIds)

  if (isLiked) {
    return baseLikes + 1
  }

  return baseLikes
}

export function toggleTemplateLike(templateId, likedTemplateIds) {
  const isLiked = checkTemplateIsLiked(templateId, likedTemplateIds)

  if (isLiked) {
    return likedTemplateIds.filter((savedTemplateId) => savedTemplateId !== templateId)
  }

  return [...likedTemplateIds, templateId]
}