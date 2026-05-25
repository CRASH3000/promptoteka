import { demoTemplates } from '../data/demoTemplates'
import { searchAndFilterTemplates } from './templateSearchAndFilter'

function waitWithAbort(delayInMs, signal) {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(resolve, delayInMs)

    signal.addEventListener('abort', () => {
      window.clearTimeout(timeoutId)
      reject(new DOMException('Запрос отменён', 'AbortError'))
    })
  })
}

export async function getTemplatesBySearchParams(searchParams, signal) {
  await waitWithAbort(450, signal)

  const query = searchParams.get('q') || ''
  const sphere = searchParams.get('sphere') || ''
  const tool = searchParams.get('tool') || ''
  const conversionType = searchParams.get('conversionType') || ''

  const filters = {
    sphere,
    tool,
    conversionType,
  }

  const queryIsReady = query.trim().length >= 3

  return searchAndFilterTemplates(demoTemplates, queryIsReady ? query : '', filters)
}

export async function getTemplateSuggestionsByQuery(query, signal) {
  await waitWithAbort(300, signal)

  const preparedQuery = query.toLowerCase().trim()

  if (preparedQuery.length < 3) {
    return []
  }

  return demoTemplates
    .filter((template) => template.title.toLowerCase().includes(preparedQuery))
    .map((template) => template.title)
}
