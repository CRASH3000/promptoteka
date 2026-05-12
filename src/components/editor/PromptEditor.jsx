import { useRef } from 'react'
import { PromptSyntaxPreview } from './PromptSyntaxPreview'

const promptEditorActions = [
  {
    label: '## Заголовок',
    text: '## Новый раздел\n',
  },
  {
    label: '---',
    text: '\n---\n',
  },
  {
    label: '{{var}}',
    text: '{{variable}}',
  },
  {
    label: '<xml>',
    text: '<format>\nОпишите формат ответа.\n</format>\n',
  },
  {
    label: 'JSON',
    text: '"key": "value"',
  },
  {
    label: '+++Format',
    text: '\n+++Format\nВерни структурированный ответ.\n',
  },
  {
    label: '→',
    text: ' → ',
  },
]

export function PromptEditor({
  id,
  name,
  label,
  value,
  error,
  placeholder,
  onChange,
}) {
  const textareaRef = useRef(null)
  const errorId = `${id}-error`

  function handleTextareaChange(event) {
    onChange(event.target.value)
  }

  function insertTextIntoPrompt(textToInsert) {
    const textarea = textareaRef.current

    if (!textarea) {
      onChange(value + textToInsert)
      return
    }

    const selectionStart = textarea.selectionStart
    const selectionEnd = textarea.selectionEnd

    const textBeforeSelection = value.slice(0, selectionStart)
    const textAfterSelection = value.slice(selectionEnd)

    const nextValue = `${textBeforeSelection}${textToInsert}${textAfterSelection}`

    onChange(nextValue)

    window.setTimeout(() => {
      textarea.focus()

      const cursorPosition = selectionStart + textToInsert.length
      textarea.setSelectionRange(cursorPosition, cursorPosition)
    }, 0)
  }

  return (
    <div className="prompt-editor">
      <div className="prompt-editor__top">
        <div>
          <label className="prompt-editor__label" htmlFor={id}>
            {label}
          </label>

          <p className="prompt-editor__hint">
            Используйте быстрые кнопки, чтобы собрать структуру промпта.
          </p>
        </div>

        <span className="prompt-editor__mark">PROMPT EDITOR</span>
      </div>

      <div
        className="prompt-editor__toolbar"
        aria-label="Быстрые действия редактора промптов"
      >
        {promptEditorActions.map((action) => (
          <button
            key={action.label}
            className="prompt-editor__toolbar-button"
            type="button"
            onClick={() => insertTextIntoPrompt(action.text)}
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="prompt-editor__workspace">
        <div className="prompt-editor__field">
          <textarea
            ref={textareaRef}
            id={id}
            name={name}
            value={value}
            placeholder={placeholder}
            rows={12}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            onChange={handleTextareaChange}
          />

          {error && (
            <p className="form-field__error" id={errorId}>
              {error}
            </p>
          )}
        </div>

        <PromptSyntaxPreview promptText={value} />
      </div>
    </div>
  )
}