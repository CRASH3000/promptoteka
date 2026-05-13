export const researchCategoryOptions = [
  'Форматирование и структура',
  'XML и семантическая разметка',
  'Структурированные данные',
  'Few-shot и примеры',
  'Chain-of-Thought',
  'Безопасность и надёжность',
]

export const researchArticles = [
  {
    id: 'formatting-structure',
    slug: 'formatting-structure',
    title: 'Форматирование и структура промпта',
    category: 'Форматирование и структура',
    arxivNumbers: ['2504.02052', '2510.26238', '2505.13546'],
    shortDescription:
      'Исследования показывают, что заголовки, разделители и модульная структура делают промпт устойчивее и понятнее для модели.',
    keyFindings: [
      'Структурированные промпты помогают слабым моделям работать ближе к уровню сильных.',
      'Без визуальных разделителей модель может терять точность.',
      'Модульные секции вроде Role, Task и Context делают промпт устойчивее к изменениям.',
    ],
    practicalUse:
      'В редакторе Промптотеки это используется через заголовки ## Heading, разделители --- и отдельные смысловые блоки.',
  },
  {
    id: 'xml-semantic-markup',
    slug: 'xml-semantic-markup',
    title: 'XML-теги и семантическая разметка',
    category: 'XML и семантическая разметка',
    arxivNumbers: ['2509.08090', '2504.01216', '2504.20118'],
    shortDescription:
      'XML-теги помогают явно отделять роль, задачу, контекст и правила внутри большого промпта.',
    keyFindings: [
      'XML-структура снижает когнитивную нагрузку модели.',
      'Теги <role> и <task> в начале промпта создают сильный смысловой якорь.',
      'Секционная структура помогает быстрее получать стабильный результат.',
    ],
    practicalUse:
      'В подсветке синтаксиса поддерживаются XML-теги, чтобы пользователь мог явно размечать части сложной инструкции.',
  },
  {
    id: 'structured-data-json',
    slug: 'structured-data-json',
    title: 'JSON и структурированные данные',
    category: 'Структурированные данные',
    arxivNumbers: ['2504.07087', '2410.10813', '2506.02589'],
    shortDescription:
      'JSON, таблицы и структурированные данные помогают группировать факты и получать более пригодный для обработки ответ.',
    keyFindings: [
      'JSON группирует связанные факты рядом и повышает точность.',
      'Структура “извлеки → ответь” помогает работать с большим контекстом.',
      'JSON-формат повышает полноту при извлечении сущностей.',
    ],
    practicalUse:
      'В редакторе подсвечиваются JSON-пары вида "key": "value", чтобы пользователь сразу видел структуру будущего ответа.',
  },
  {
    id: 'few-shot-examples',
    slug: 'few-shot-examples',
    title: 'Few-shot и примеры в промпте',
    category: 'Few-shot и примеры',
    arxivNumbers: ['2310.07019', '2502.11681', '2504.05716'],
    shortDescription:
      'Примеры внутри промпта помогают модели точнее перенести нужный стиль, формат и логику ответа.',
    keyFindings: [
      'Конкретные примеры часто стабильнее абстрактных правил.',
      'Стиль и структура примеров переносятся на результат.',
      'Простой промпт с хорошими примерами может быть лучше сложного промпта без примеров.',
    ],
    practicalUse:
      'В шаблонах Промптотеки можно хранить не только промпт, но и пример результата, чтобы пользователю было проще понять ожидаемый формат.',
  },
  {
    id: 'chain-of-thought',
    slug: 'chain-of-thought',
    title: 'Chain-of-Thought и пошаговые рассуждения',
    category: 'Chain-of-Thought',
    arxivNumbers: ['2505.10981', '2505.22113', '2504.07128'],
    shortDescription:
      'Пошаговое рассуждение полезно для сложных задач, но на простых задачах может мешать и раздувать ответ.',
    keyFindings: [
      'Chain-of-Thought помогает в задачах со сложным рассуждением.',
      'На простых задачах избыточное рассуждение может ухудшать результат.',
      'Оптимальная короткая цепочка рассуждения часто лучше длинной.',
    ],
    practicalUse:
      'В базе знаний можно объяснять пользователю, когда просить модель рассуждать по шагам, а когда лучше сразу просить короткий ответ.',
  },
  {
    id: 'safety-reliability',
    slug: 'safety-reliability',
    title: 'Безопасность, надёжность и проверка ответа',
    category: 'Безопасность и надёжность',
    arxivNumbers: ['2503.10690', '2511.21734', '2504.21625'],
    shortDescription:
      'Даже хорошо оформленный промпт нужно проверять: модели могут принимать ложные посылки, галлюцинировать и ошибаться.',
    keyFindings: [
      'Уверенный тон пользователя может заставить модель принять ложную информацию.',
      'Verification-first помогает сначала проверить данные, а потом генерировать ответ.',
      'Итеративная самокоррекция помогает находить и исправлять ошибки.',
    ],
    practicalUse:
      'В Промптотеке это связано с блоками проверки результата и с подсказками о том, что ответ ИИ нельзя принимать без проверки.',
  },
]

export function getResearchArticlesByFilters(searchQuery, selectedCategory) {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return researchArticles.filter((article) => {
    const matchesCategory =
      !selectedCategory || article.category === selectedCategory

    const searchableText = [
      article.title,
      article.category,
      article.shortDescription,
      article.practicalUse,
      article.keyFindings.join(' '),
      article.arxivNumbers.join(' '),
    ]
      .join(' ')
      .toLowerCase()

    const matchesSearch =
      !normalizedQuery || searchableText.includes(normalizedQuery)

    return matchesCategory && matchesSearch
  })
}

export function findResearchArticleById(articleId) {
  return researchArticles.find((article) => article.id === articleId)
}