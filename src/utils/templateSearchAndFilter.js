function normalizeText(value) {
  return value.toLowerCase().trim()
}

export function searchTemplatesByQuery(templates, query) {
  const preparedQuery = normalizeText(query)

  if (!preparedQuery) {
    return templates
  }

  return templates.filter((template) => {
    const title = normalizeText(template.title)
    const description = normalizeText(template.description)
    const prompt = normalizeText(template.prompt)

    return (
      title.includes(preparedQuery) ||
      description.includes(preparedQuery) ||
      prompt.includes(preparedQuery)
    )
  })
}

export function filterTemplatesByFields(templates, filters) {
  return templates.filter((template) => {
    const sphereIsValid = !filters.sphere || template.sphere === filters.sphere
    const toolIsValid = !filters.tool || template.tool === filters.tool
    const conversionTypeIsValid =
      !filters.conversionType || template.conversionType === filters.conversionType

    return sphereIsValid && toolIsValid && conversionTypeIsValid
  })
}

export function searchAndFilterTemplates(templates, query, filters) {
  const searchedTemplates = searchTemplatesByQuery(templates, query)

  return filterTemplatesByFields(searchedTemplates, filters)
}

export function findTemplateById(templates, templateId) {
  return templates.find((template) => template.id === templateId)
}