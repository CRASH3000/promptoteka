import { useMemo, useState } from 'react'
import {
  getResearchArticlesByFilters,
  researchCategoryOptions,
} from '../data/researchArticles'

export function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredResearchArticles = useMemo(
    () => getResearchArticlesByFilters(searchQuery, selectedCategory),
    [searchQuery, selectedCategory],
  )

  function handleResetFilters() {
    setSearchQuery('')
    setSelectedCategory('')
  }

  return (
    <section className="page-card research-page">
      <div className="page-card__top">
        <span className="page-card__label">Справочный ящик</span>
        <span className="page-card__paper-mark">RESEARCH</span>
      </div>

      <div className="page-card__content research-page__header">
        <h1>Исследования</h1>

        <p>
          Короткие выжимки из исследований о промптах: какая техника изучалась, 
          какой вывод можно сделать и как применить это при создании своих шаблонов.
        </p>
      </div>

      <div className="research-page__filters" aria-label="Фильтры исследований">
        <div className="form-field">
          <label htmlFor="research-search">Поиск по исследованиям</label>

          <input
            id="research-search"
            type="search"
            value={searchQuery}
            placeholder="Например: XML, JSON, CoT, безопасность"
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="research-category">Категория</label>

          <select
            id="research-category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">Все категории</option>

            {researchCategoryOptions.map((category) => (
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

      <div className="research-page__summary">
        Найдено карточек: {filteredResearchArticles.length}
      </div>

      {filteredResearchArticles.length > 0 ? (
        <div className="research-page__grid">
          {filteredResearchArticles.map((article) => (
            <article className="research-card" key={article.id}>
              <div className="research-card__top">
                <span>{article.category}</span>
                <small>{article.slug}</small>
              </div>

              <h2>{article.title}</h2>

              <p>{article.shortDescription}</p>

              <div className="research-card__section">
                <h3>Ключевые выводы</h3>

                <ul>
                  {article.keyFindings.map((finding) => (
                    <li key={finding}>{finding}</li>
                  ))}
                </ul>
              </div>

              <div className="research-card__section">
                <h3>Как применяем в проекте</h3>

                <p>{article.practicalUse}</p>
              </div>

              <div className="research-card__sources">
                <span>arXiv:</span>

                {article.arxivNumbers.map((number) => (
                  <a
                    key={number}
                    href={`https://arxiv.org/pdf/${number}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {number}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="research-page__empty">
          <h2>Исследования не найдены</h2>

          <p>
            Попробуйте изменить поисковый запрос или выбрать другую категорию.
          </p>
        </div>
      )}
    </section>
  )
}