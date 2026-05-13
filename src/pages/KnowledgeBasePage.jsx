import { useMemo, useState } from 'react'
import {
  getKnowledgeArticlesByFilters,
  knowledgeCategoryOptions,
} from '../data/knowledgeArticles'

export function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredArticles = useMemo(
    () => getKnowledgeArticlesByFilters(searchQuery, selectedCategory),
    [searchQuery, selectedCategory],
  )

  function handleResetFilters() {
    setSearchQuery('')
    setSelectedCategory('')
  }

  return (
    <section className="page-card knowledge-base">
      <div className="page-card__top">
        <span className="page-card__label">Учебный ящик</span>
        <span className="page-card__paper-mark">KNOWLEDGE</span>
      </div>

      <div className="page-card__content knowledge-base__header">
        <h1>База знаний</h1>

        <p>
          Короткие практические заметки о том, как оформлять промпты: 
          структура, разделители, переменные, JSON, XML, примеры и проверка результата.
        </p>
      </div>

      <div className="knowledge-base__filters" aria-label="Фильтры базы знаний">
        <div className="form-field">
          <label htmlFor="knowledge-search">Поиск по статьям</label>

          <input
            id="knowledge-search"
            type="search"
            value={searchQuery}
            placeholder="Например: JSON, XML, структура"
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="knowledge-category">Категория</label>

          <select
            id="knowledge-category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">Все категории</option>

            {knowledgeCategoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button
          className="button"
          type="button"
          onClick={handleResetFilters}
          disabled={!searchQuery && !selectedCategory}
        >
          Сбросить фильтры
        </button>
      </div>

      <div className="knowledge-base__summary">
        Найдено статей: {filteredArticles.length}
      </div>

      {filteredArticles.length > 0 ? (
        <div className="knowledge-base__grid">
          {filteredArticles.map((article) => (
            <article key={article.id} className="knowledge-card">
              <div className="knowledge-card__top">
                <span>{article.category}</span>
                <small>{article.id}</small>
              </div>

              <h2>{article.title}</h2>

              <p>{article.shortDescription}</p>

              <ul>
                {article.content.map((paragraph) => (
                  <li key={paragraph}>{paragraph}</li>
                ))}
              </ul>

              <pre className="knowledge-card__example">
                <code>{article.promptExample}</code>
              </pre>
            </article>
          ))}
        </div>
      ) : (
        <div className="knowledge-base__empty">
          <h2>Статьи не найдены</h2>

          <p>
            Попробуйте изменить поисковый запрос или выбрать другую категорию.
          </p>
        </div>
      )}
    </section>
  )
}