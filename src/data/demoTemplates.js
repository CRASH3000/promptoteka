export const templateSphereOptions = [
  'Учёба',
  'Работа',
  'Досуг',
  'Здоровье',
  'Разработка',
]

export const templateToolOptions = [
  'ChatGPT',
  'GigaChat',
  'NanoBanana',
  'Midjourney',
  'Claude',
]

export const templateConversionTypeOptions = [
  'txt2txt',
  'txt2img',
  'img2vid',
]

export const demoTemplates = [
  {
    id: 'study-summary-card',
    title: 'Конспект учебного материала',
    description: 'Помогает быстро сделать понятный конспект по теме.',
    sphere: 'Учёба',
    tool: 'ChatGPT',
    conversionType: 'txt2txt',
    likes: 18,
    prompt: `## Роль
Ты преподаватель, который объясняет материал простыми словами.

---

## Задача
Сделай краткий конспект по теме: {{topic}}

+++Format
- основные определения
- короткие примеры
- итоговый вывод`,
    result: 'Структурированный конспект с определениями, примерами и выводом.',
  },
  {
    id: 'work-email-card',
    title: 'Деловое письмо без воды',
    description: 'Шаблон для аккуратного делового сообщения.',
    sphere: 'Работа',
    tool: 'GigaChat',
    conversionType: 'txt2txt',
    likes: 11,
    prompt: `## Контекст
Мне нужно написать деловое письмо.

## Тон
Спокойный, уважительный, без лишней формальности.

Текст письма → {{draft}}

+++Format
Верни улучшенную версию письма.`,
    result: 'Готовое деловое письмо в аккуратном стиле.',
  },
  {
    id: 'image-prompt-card',
    title: 'Промпт для генерации изображения',
    description: 'Помогает собрать описание изображения по структуре.',
    sphere: 'Досуг',
    tool: 'Midjourney',
    conversionType: 'txt2img',
    likes: 25,
    prompt: `## Image prompt
Object: {{object}}
Style: cinematic cold light
Details: paper card, archive drawer, soft shadows

JSON:
"quality": "high"
"mood": "calm"`,
    result: 'Подробный промпт для генерации изображения.',
  },
  {
    id: 'code-review-card',
    title: 'Проверка кода новичка',
    description: 'Помогает найти ошибки в коде и объяснить их простым языком.',
    sphere: 'Разработка',
    tool: 'ChatGPT',
    conversionType: 'txt2txt',
    likes: 31,
    prompt: `## Роль
Ты наставник по программированию.

## Проверь код
\`{{code}}\`

Найди ошибки ∈ логика ∩ читаемость ∩ поддерживаемость.
Не переписывай всё с нуля без необходимости.`,
    result: 'Список ошибок и понятные рекомендации по исправлению.',
  },
]