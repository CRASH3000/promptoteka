import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  demoTemplates,
  templateConversionTypeOptions,
  templateSphereOptions,
  templateToolOptions,
} from '../../data/demoTemplates'
import { findTemplateById } from '../../utils/templateSearchAndFilter'
import {
  getTemplateSuggestionsByQuery,
  getTemplatesBySearchParams,
} from '../../utils/mockTemplateGetApi'
import {
  checkTemplateIsLiked,
  getLikedTemplateIdsFromStorage,
  getTemplateLikesCount,
  saveLikedTemplateIdsToStorage,
  toggleTemplateLike,
} from '../../utils/templateLikesStorage'
import {
  checkTemplateIsFavorite,
  getFavoriteTemplateIdsFromStorage,
  saveFavoriteTemplateIdsToStorage,
  toggleTemplateFavorite,
} from '../../utils/templateFavoritesStorage'
import { copyTextToClipboard } from '../../utils/clipboard'
import { PromptSyntaxPreview } from '../editor/PromptSyntaxPreview'

const emptyTemplateFilters = {
  sphere: '',
  tool: '',
  conversionType: '',
}

function createFiltersFromSearchParams(searchParams) {
  return {
    sphere: searchParams.get('sphere') || '',
    tool: searchParams.get('tool') || '',
    conversionType: searchParams.get('conversionType') || '',
  }
}

function createSearchParamsFromForm(query, filters) {
  const params = new URLSearchParams()

  if (query.trim()) {
    params.set('q', query.trim())
  }

  if (filters.sphere) {
    params.set('sphere', filters.sphere)
  }

  if (filters.tool) {
    params.set('tool', filters.tool)
  }

  if (filters.conversionType) {
    params.set('conversionType', filters.conversionType)
  }

  return params
}

export function TemplateCatalogPage({
  title = 'Шаблоны',
  label = 'Ящик шаблонов',
  paperMark = 'GET SEARCH',
  description = 'Готовые шаблоны промптов можно искать по названию, сфере применения, инструменту и типу задачи. Поиск сохраняется в адресной строке, поэтому к результатам легко вернуться позже.',
}) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const queryFromUrl = searchParams.get('q') || ''
  const filtersFromUrl = useMemo(
    () => createFiltersFromSearchParams(searchParams),
    [searchParams],
  )

  const [searchQuery, setSearchQuery] = useState(queryFromUrl)
  const [templateFilters, setTemplateFilters] = useState(filtersFromUrl)
  const [templateSuggestions, setTemplateSuggestions] = useState([])
  const [foundTemplates, setFoundTemplates] = useState([])
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false)
  const [isResultsLoading, setIsResultsLoading] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [copyMessageByTemplateId, setCopyMessageByTemplateId] = useState({})
  const [likedTemplateIds, setLikedTemplateIds] = useState(() =>
    getLikedTemplateIdsFromStorage(),
  )
  const [favoriteTemplateIds, setFavoriteTemplateIds] = useState(() =>
    getFavoriteTemplateIdsFromStorage(),
  )

  const queryIsLongEnough = searchQuery.trim().length >= 3
  const queryIsNotEmptyButTooShort = searchQuery.trim().length > 0 && !queryIsLongEnough
  const hasAnyFilter = Boolean(
    templateFilters.sphere || templateFilters.tool || templateFilters.conversionType,
  )

  useEffect(() => {
    saveLikedTemplateIdsToStorage(likedTemplateIds)
  }, [likedTemplateIds])

  useEffect(() => {
    saveFavoriteTemplateIdsToStorage(favoriteTemplateIds)
  }, [favoriteTemplateIds])

  useEffect(() => {
    const abortController = new AbortController()

    async function loadSuggestionsWithDebounce() {
      setIsSuggestionsLoading(false)
      setTemplateSuggestions([])

      if (searchQuery.trim().length < 3) {
        return
      }

      try {
        setIsSuggestionsLoading(true)

        const debounceTimeoutId = window.setTimeout(async () => {
          try {
            const suggestions = await getTemplateSuggestionsByQuery(
              searchQuery,
              abortController.signal,
            )

            setTemplateSuggestions(suggestions)
          } catch (error) {
            if (error.name !== 'AbortError') {
              setTemplateSuggestions([])
            }
          } finally {
            setIsSuggestionsLoading(false)
          }
        }, 450)

        abortController.signal.addEventListener('abort', () => {
          window.clearTimeout(debounceTimeoutId)
        })
      } catch {
        setIsSuggestionsLoading(false)
      }
    }

    loadSuggestionsWithDebounce()

    return () => {
      abortController.abort()
    }
  }, [searchQuery])

  useEffect(() => {
    const abortController = new AbortController()

    async function loadResults() {
      setSearchError('')

      try {
        setIsResultsLoading(true)

        const templates = await getTemplatesBySearchParams(
          searchParams,
          abortController.signal,
        )

        setFoundTemplates(templates)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setSearchError('Не удалось загрузить результаты поиска. Попробуйте ещё раз.')
          setFoundTemplates([])
        }
      } finally {
        setIsResultsLoading(false)
      }
    }

    loadResults()

    return () => {
      abortController.abort()
    }
  }, [searchParams])

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value)
  }

  function handleFilterChange(event) {
    const { name, value } = event.target

    setTemplateFilters({
      ...templateFilters,
      [name]: value,
    })
  }

  function handleSearchSubmit(event) {
    event.preventDefault()

    const params = createSearchParamsFromForm(searchQuery, templateFilters)
    const nextSearch = params.toString()
    const currentPath = window.location.pathname

    setSearchParams(params)
    navigate(nextSearch ? `${currentPath}?${nextSearch}` : currentPath)
  }

  function handleResetFilters() {
    setSearchQuery('')
    setTemplateFilters(emptyTemplateFilters)
    setTemplateSuggestions([])
    setFoundTemplates([])
    setSearchError('')
    setSearchParams({})
    navigate(window.location.pathname)
  }

  function handleToggleTemplateLike(templateId) {
    setLikedTemplateIds((currentLikedTemplateIds) =>
      toggleTemplateLike(templateId, currentLikedTemplateIds),
    )
  }

  function handleToggleTemplateFavorite(templateId) {
    setFavoriteTemplateIds((currentFavoriteTemplateIds) =>
      toggleTemplateFavorite(templateId, currentFavoriteTemplateIds),
    )
  }

  async function handleCopyTemplatePrompt(template) {
    try {
      await copyTextToClipboard(template.prompt)
      setCopyMessageByTemplateId({
        [template.id]: 'Скопировано',
      })
    } catch {
      setCopyMessageByTemplateId({
        [template.id]: 'Не удалось скопировать',
      })
    }
  }

  return (
    <section className="page-card">
      <div className="page-card__top">
        <span className="page-card__label">{label}</span>
        <span className="page-card__paper-mark">{paperMark}</span>
      </div>

      <div className="page-card__content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <form
        className="template-catalog__filters"
        method="get"
        action="/templates"
        onSubmit={handleSearchSubmit}
      >
        <div className="form-field">
          <label htmlFor="template-search">Поиск</label>

          <input
            id="template-search"
            name="q"
            type="search"
            value={searchQuery}
            list="template-search-suggestions"
            placeholder="Введите минимум 3 символа"
            onChange={handleSearchInputChange}
          />

          <datalist id="template-search-suggestions">
            {templateSuggestions.map((suggestion) => (
              <option key={suggestion} value={suggestion} />
            ))}
          </datalist>

          {queryIsNotEmptyButTooShort && (
            <p className="form-field__hint">
              Для поиска по тексту нужно ввести минимум 3 символа.
            </p>
          )}

          {isSuggestionsLoading && (
            <p className="form-field__hint">Загружаем подсказки...</p>
          )}
        </div>

        <div className="template-catalog__filter-grid">
          <CatalogSelect
            id="filter-sphere"
            name="sphere"
            label="Сфера"
            value={templateFilters.sphere}
            options={templateSphereOptions}
            emptyOptionLabel="Все сферы"
            onChange={handleFilterChange}
          />

          <CatalogSelect
            id="filter-tool"
            name="tool"
            label="Инструмент"
            value={templateFilters.tool}
            options={templateToolOptions}
            emptyOptionLabel="Все инструменты"
            onChange={handleFilterChange}
          />

          <CatalogSelect
            id="filter-conversion-type"
            name="conversionType"
            label="Тип"
            value={templateFilters.conversionType}
            options={templateConversionTypeOptions}
            emptyOptionLabel="Все типы"
            onChange={handleFilterChange}
          />
        </div>

        <div className="form-card__buttons">
          <button
            className="button button--primary"
            type="submit"
            disabled={queryIsNotEmptyButTooShort && !hasAnyFilter}
          >
            Найти шаблоны
          </button>

          <button className="button" type="button" onClick={handleResetFilters}>
            Сбросить поиск
          </button>
        </div>
      </form>

      <div className="template-catalog">
        <SearchStateMessage
          queryIsLongEnough={queryIsLongEnough}
          queryIsNotEmptyButTooShort={queryIsNotEmptyButTooShort}
          hasAnyFilter={hasAnyFilter}
          isResultsLoading={isResultsLoading}
          searchError={searchError}
          foundTemplatesLength={foundTemplates.length}
        />

        {!isResultsLoading && !searchError && foundTemplates.length > 0 && (
          <div className="template-card-list">
            {foundTemplates.map((template) => {
              const templateIsLiked = checkTemplateIsLiked(
                template.id,
                likedTemplateIds,
              )
              const visibleLikesCount = getTemplateLikesCount(
                template,
                likedTemplateIds,
              )
              const templateIsFavorite = checkTemplateIsFavorite(
                template.id,
                favoriteTemplateIds,
              )

              return (
                <article className="template-list-card" key={template.id}>
                  <div className="template-list-card__top">
                    <span>{template.sphere}</span>
                    <span>{template.tool}</span>
                    <span>{template.conversionType}</span>
                  </div>

                  <h2>{template.title}</h2>
                  <p>{template.description}</p>

                  <div className="template-list-card__footer">
                    <button
                      className={`template-like-button ${
                        templateIsLiked ? 'template-like-button--active' : ''
                      }`}
                      type="button"
                      aria-pressed={templateIsLiked}
                      onClick={() => handleToggleTemplateLike(template.id)}
                    >
                      ♥ {visibleLikesCount}
                    </button>

                    <div className="template-list-card__actions">
                      <button
                        className={`template-favorite-button ${
                          templateIsFavorite ? 'template-favorite-button--active' : ''
                        }`}
                        type="button"
                        aria-pressed={templateIsFavorite}
                        onClick={() => handleToggleTemplateFavorite(template.id)}
                      >
                        {templateIsFavorite ? '★ В избранном' : '☆ В избранное'}
                      </button>

                      <button
                        className="button button--small"
                        type="button"
                        onClick={() => handleCopyTemplatePrompt(template)}
                      >
                        Скопировать
                      </button>

                      <Link className="button button--small" to={`/templates/${template.id}`}>
                        Открыть карточку
                      </Link>
                    </div>
                  </div>

                  {copyMessageByTemplateId[template.id] && (
                    <p className="template-list-card__message">
                      {copyMessageByTemplateId[template.id]}
                    </p>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

function SearchStateMessage({
  queryIsLongEnough,
  queryIsNotEmptyButTooShort,
  hasAnyFilter,
  isResultsLoading,
  searchError,
  foundTemplatesLength,
}) {
  if (isResultsLoading) {
    return <div className="template-catalog__summary">Загружаем результаты поиска...</div>
  }

  if (searchError) {
    return <div className="template-catalog__empty">{searchError}</div>
  }

  if (queryIsNotEmptyButTooShort && !hasAnyFilter) {
    return (
      <div className="template-catalog__empty">
        Введите минимум 3 символа, чтобы отправить GET-запрос поиска.
      </div>
    )
  }

  if (!queryIsLongEnough && !hasAnyFilter) {
    return (
      <div className="template-catalog__summary">
        Показаны все публичные шаблоны. Используйте поиск или фильтры, чтобы сузить выдачу.
      </div>
    )
  }

  if (foundTemplatesLength === 0) {
    return (
      <div className="template-catalog__empty">
        Ничего не найдено. Попробуйте изменить запрос или фильтры.
      </div>
    )
  }

  return (
    <div className="template-catalog__summary">
      Найдено шаблонов: <strong>{foundTemplatesLength}</strong>
    </div>
  )
}

export function TemplateDetailPage() {
  const { templateId } = useParams()
  const template = findTemplateById(demoTemplates, templateId)
  const [copyMessage, setCopyMessage] = useState('')
  const [likedTemplateIds, setLikedTemplateIds] = useState(() =>
    getLikedTemplateIdsFromStorage(),
  )
  const [favoriteTemplateIds, setFavoriteTemplateIds] = useState(() =>
    getFavoriteTemplateIdsFromStorage(),
  )

  const templateIsLiked = template
    ? checkTemplateIsLiked(template.id, likedTemplateIds)
    : false

  const visibleLikesCount = template
    ? getTemplateLikesCount(template, likedTemplateIds)
    : 0
  const templateIsFavorite = template
    ? checkTemplateIsFavorite(template.id, favoriteTemplateIds)
    : false

  useEffect(() => {
    saveLikedTemplateIdsToStorage(likedTemplateIds)
  }, [likedTemplateIds])

  useEffect(() => {
    saveFavoriteTemplateIdsToStorage(favoriteTemplateIds)
  }, [favoriteTemplateIds])

  async function handleCopyPrompt() {
    if (!template) {
      return
    }

    try {
      await copyTextToClipboard(template.prompt)
      setCopyMessage('Промпт скопирован в буфер обмена.')
    } catch {
      setCopyMessage('Не удалось скопировать автоматически. Можно выделить текст вручную.')
    }
  }

  function handleToggleTemplateLike() {
    if (!template) {
      return
    }

    setLikedTemplateIds((currentLikedTemplateIds) =>
      toggleTemplateLike(template.id, currentLikedTemplateIds),
    )
  }

  function handleToggleTemplateFavorite() {
    if (!template) {
      return
    }

    setFavoriteTemplateIds((currentFavoriteTemplateIds) =>
      toggleTemplateFavorite(template.id, currentFavoriteTemplateIds),
    )
  }

  if (!template) {
    return (
      <section className="page-card">
        <div className="page-card__top">
          <span className="page-card__label">Потерянная карточка</span>
          <span className="page-card__paper-mark">404</span>
        </div>

        <div className="page-card__content">
          <h1>Шаблон не найден</h1>
          <p>Такой карточки шаблона нет в локальных mock-данных.</p>
        </div>

        <div className="page-card__actions">
          <Link className="button button--primary" to="/templates">
            Вернуться к шаблонам
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-card">
      <div className="page-card__top">
        <span className="page-card__label">Карточка шаблона</span>
        <span className="page-card__paper-mark">TEMPLATE</span>
      </div>

      <div className="template-detail">
        <div className="template-detail__content">
          <div className="page-card__content">
            <h1>{template.title}</h1>
            <p>{template.description}</p>
          </div>

          <div className="template-detail__meta">
            <span>Сфера: {template.sphere}</span>
            <span>Инструмент: {template.tool}</span>
            <span>Тип: {template.conversionType}</span>
            <span>Лайки: {visibleLikesCount}</span>
          </div>

          <div className="template-detail__rating">
            <button
              className={`template-like-button template-like-button--large ${
                templateIsLiked ? 'template-like-button--active' : ''
              }`}
              type="button"
              aria-pressed={templateIsLiked}
              onClick={handleToggleTemplateLike}
            >
              {templateIsLiked
                ? `♥ Уже оценено: ${visibleLikesCount}`
                : `♡ Нравится: ${visibleLikesCount}`}
            </button>

            <button
              className={`template-favorite-button template-favorite-button--large ${
                templateIsFavorite ? 'template-favorite-button--active' : ''
              }`}
              type="button"
              aria-pressed={templateIsFavorite}
              onClick={handleToggleTemplateFavorite}
            >
              {templateIsFavorite ? '★ В избранном' : '☆ Добавить в избранное'}
            </button>

            <p>
              Оценка и избранное хранятся локально в браузере.
            </p>
          </div>

          <div className="template-detail__prompt-block">
            <div className="template-detail__block-header">
              <h2>Текст промпта</h2>

              <button className="button button--small" type="button" onClick={handleCopyPrompt}>
                Скопировать промпт
              </button>
            </div>

            <pre className="template-detail__prompt-text">{template.prompt}</pre>

            {copyMessage && <p className="form-card__success">{copyMessage}</p>}
          </div>

          <div className="template-detail__result">
            <h2>Пример результата</h2>
            <p>{template.result}</p>
          </div>

          <div className="page-card__actions">
            <Link className="button" to="/templates">
              Назад к шаблонам
            </Link>

            <Link className="button button--primary" to="/editor">
              Открыть в редакторе
            </Link>
          </div>
        </div>

        <PromptSyntaxPreview promptText={template.prompt} />
      </div>
    </section>
  )
}

export function FavoriteTemplatesPage() {
  const [favoriteTemplateIds, setFavoriteTemplateIds] = useState(() =>
    getFavoriteTemplateIdsFromStorage(),
  )
  const [copyMessageByTemplateId, setCopyMessageByTemplateId] = useState({})

  const favoriteTemplates = demoTemplates.filter((template) =>
    checkTemplateIsFavorite(template.id, favoriteTemplateIds),
  )

  useEffect(() => {
    saveFavoriteTemplateIdsToStorage(favoriteTemplateIds)
  }, [favoriteTemplateIds])

  function handleToggleTemplateFavorite(templateId) {
    setFavoriteTemplateIds((currentFavoriteTemplateIds) =>
      toggleTemplateFavorite(templateId, currentFavoriteTemplateIds),
    )
  }

  async function handleCopyTemplatePrompt(template) {
    try {
      await copyTextToClipboard(template.prompt)
      setCopyMessageByTemplateId({
        [template.id]: 'Скопировано',
      })
    } catch {
      setCopyMessageByTemplateId({
        [template.id]: 'Не удалось скопировать',
      })
    }
  }

  return (
    <section className="page-card">
      <div className="page-card__top">
        <span className="page-card__label">Избранный ящик</span>
        <span className="page-card__paper-mark">FAVORITES</span>
      </div>

      <div className="page-card__content">
        <h1>Избранное</h1>
        <p>
          Здесь собраны чужие промпты, которые вы отметили в публичном каталоге.
        </p>
      </div>

      <div className="template-catalog">
        {favoriteTemplates.length === 0 ? (
          <div className="template-catalog__empty">
            В избранном пока пусто. Откройте каталог и сохраните полезную карточку.
          </div>
        ) : (
          <div className="template-card-list">
            {favoriteTemplates.map((template) => (
              <article className="template-list-card" key={template.id}>
                <div className="template-list-card__top">
                  <span>{template.sphere}</span>
                  <span>{template.tool}</span>
                  <span>{template.conversionType}</span>
                </div>

                <h2>{template.title}</h2>
                <p>{template.description}</p>

                <div className="template-list-card__footer">
                  <button
                    className="template-favorite-button template-favorite-button--active"
                    type="button"
                    aria-pressed="true"
                    onClick={() => handleToggleTemplateFavorite(template.id)}
                  >
                    ★ Убрать
                  </button>

                  <div className="template-list-card__actions">
                    <button
                      className="button button--small"
                      type="button"
                      onClick={() => handleCopyTemplatePrompt(template)}
                    >
                      Скопировать
                    </button>

                    <Link className="button button--small" to={`/templates/${template.id}`}>
                      Открыть карточку
                    </Link>
                  </div>
                </div>

                {copyMessageByTemplateId[template.id] && (
                  <p className="template-list-card__message">
                    {copyMessageByTemplateId[template.id]}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="page-card__actions">
        <Link className="button button--primary" to="/hub">
          Открыть публичный каталог
        </Link>
      </div>
    </section>
  )
}

function CatalogSelect({ id, name, label, value, options, emptyOptionLabel, onChange }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      <select id={id} name={name} value={value} onChange={onChange}>
        <option value="">{emptyOptionLabel}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
