import { expect, test } from '@playwright/test'

test('пользователь регистрируется, входит и создаёт шаблон промпта', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Войти' }).click()
  await expect(page.getByRole('heading', { name: 'Вход' })).toBeVisible()

  await page.getByRole('link', { name: 'Создать аккаунт' }).click()
  await expect(page.getByRole('heading', { name: 'Регистрация' })).toBeVisible()

  await page.getByLabel('Имя').fill('Влад')
  await page.getByLabel('Email').fill('student@example.com')
  await page.getByLabel('Пароль', { exact: true }).fill('123456')
  await page.getByLabel('Повторите пароль').fill('123456')
  await page.getByLabel('Я даю согласие на обработку персональных данных').check()

  await page.getByRole('button', { name: 'Зарегистрироваться' }).click()

  await expect(page.getByText('Регистрация прошла успешно')).toBeVisible()

  await page.getByRole('link', { name: 'Уже есть аккаунт?' }).click()
  await expect(page.getByRole('heading', { name: 'Вход' })).toBeVisible()

  await page.getByLabel('Email').fill('student@example.com')
  await page.getByLabel('Пароль').fill('123456')

  await page.getByRole('button', { name: 'Войти' }).click()

  await expect(page.getByText('Вход выполнен успешно')).toBeVisible()

  await page.goto('/profile/templates/new')

  await expect(page.getByRole('heading', { name: 'Создать шаблон' })).toBeVisible()

  await page.getByLabel('Название шаблона').fill('Учебный конспект через ИИ')
  await page.getByLabel('Сфера применения').selectOption('Учёба')
  await page.getByLabel('ИИ-инструмент').selectOption('ChatGPT')
  await page.getByLabel('Тип конвертации').selectOption('txt2txt')

  await page.getByLabel('Текст промпта').fill(`## Роль
Ты преподаватель.

---

## Задача
Сделай понятный конспект по теме: {{topic}}

+++Format
Верни список определений и короткий итог.`)

  await page
    .getByLabel('Пример результата')
    .fill('Пользователь получает структурированный конспект с определениями и выводом.')

  await page.getByRole('button', { name: 'Сохранить шаблон' }).click()

  await expect(
    page.getByText('Шаблон сохранён.'),
  ).toBeVisible()
})