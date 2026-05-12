import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PromptEditor } from '../PromptEditor'

function PromptEditorTestWrapper() {
  const [promptValue, setPromptValue] = useState('')

  return (
    <PromptEditor
      id="test-prompt-editor"
      name="prompt"
      label="Текст промпта"
      value={promptValue}
      error=""
      placeholder="Введите промпт"
      onChange={setPromptValue}
    />
  )
}

describe('PromptEditor integration', () => {
  it('позволяет пользователю вводить текст в textarea', async () => {
    const user = userEvent.setup()

    render(<PromptEditorTestWrapper />)

    const textarea = screen.getByLabelText('Текст промпта')

    await user.type(textarea, '## Роль')

    expect(textarea).toHaveValue('## Роль')
  })

  it('добавляет заголовок через кнопку редактора', async () => {
    const user = userEvent.setup()

    render(<PromptEditorTestWrapper />)

    const textarea = screen.getByLabelText('Текст промпта')
    const headingButton = screen.getByRole('button', { name: '## Заголовок' })

    await user.click(headingButton)

    expect(textarea).toHaveValue('## Новый раздел\n')
  })

  it('добавляет переменную через кнопку редактора', async () => {
    const user = userEvent.setup()

    render(<PromptEditorTestWrapper />)

    const textarea = screen.getByLabelText('Текст промпта')
    const variableButton = screen.getByRole('button', { name: '{{var}}' })

    await user.click(variableButton)

    expect(textarea).toHaveValue('{{variable}}')
  })

  it('добавляет несколько элементов промпта через быстрые кнопки', async () => {
    const user = userEvent.setup()

    render(<PromptEditorTestWrapper />)

    const textarea = screen.getByLabelText('Текст промпта')

    await user.click(screen.getByRole('button', { name: '## Заголовок' }))
    await user.click(screen.getByRole('button', { name: '---' }))
    await user.click(screen.getByRole('button', { name: '+++Format' }))

    expect(textarea.value).toContain('## Новый раздел')
    expect(textarea.value).toContain('---')
    expect(textarea.value).toContain('+++Format')
  })

  it('показывает ошибку валидации, если она передана в редактор', () => {
    render(
      <PromptEditor
        id="test-prompt-editor"
        name="prompt"
        label="Текст промпта"
        value=""
        error="Введите текст промпта"
        placeholder="Введите промпт"
        onChange={() => {}}
      />,
    )

    expect(screen.getByText('Введите текст промпта')).toBeInTheDocument()
    expect(screen.getByLabelText('Текст промпта')).toHaveAttribute('aria-invalid', 'true')
  })
})