import { useState } from 'react'
import { PromptEditor } from '../editor/PromptEditor'
import {
  templateConversionTypeOptions,
  templateSphereOptions,
  templateToolOptions,
} from '../../data/demoTemplates'
import {
  hasTemplateFormErrors,
  validateTemplateForm,
} from '../../utils/templateFormValidation'

const initialTemplateFormValues = {
  title: '',
  prompt: '',
  result: '',
  sphere: '',
  tool: '',
  conversionType: '',
}

export function TemplateCreationForm() {
  const [formValues, setFormValues] = useState(initialTemplateFormValues)
  const [formErrors, setFormErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  function handleInputChange(event) {
    const { name, value } = event.target

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  function handlePromptChange(nextPromptValue) {
    setFormValues({
      ...formValues,
      prompt: nextPromptValue,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const errors = validateTemplateForm(formValues)
    setFormErrors(errors)
    setSuccessMessage('')

    if (hasTemplateFormErrors(errors)) {
      return
    }

    setSuccessMessage(
      'Шаблон сохранён локально. Редактор промптов подключён вместо обычного textarea.',
    )
  }

  function handleClearForm() {
    setFormValues(initialTemplateFormValues)
    setFormErrors({})
    setSuccessMessage('')
  }

  return (
    <section className="page-card">
      <div className="page-card__top">
        <span className="page-card__label">Новая карточка</span>
        <span className="page-card__paper-mark">TEMPLATE</span>
      </div>

      <div className="page-card__content">
        <h1>Создать шаблон</h1>
        <p>
          Соберите собственную карточку промпта: добавьте название, сферу, инструмент, текст промпта и пример результата. 
          Редактор помогает быстрее оформить структуру и сразу показывает подсветку.
        </p>
      </div>

      <form className="form-card form-card--wide" onSubmit={handleSubmit} noValidate>
        <TextField
          id="template-title"
          name="title"
          label="Название шаблона"
          value={formValues.title}
          error={formErrors.title}
          placeholder="Например: Конспект учебного материала"
          onChange={handleInputChange}
        />

        <div className="template-form-grid">
          <SelectField
            id="template-sphere"
            name="sphere"
            label="Сфера применения"
            value={formValues.sphere}
            error={formErrors.sphere}
            options={templateSphereOptions}
            emptyOptionLabel="Выберите сферу"
            onChange={handleInputChange}
          />

          <SelectField
            id="template-tool"
            name="tool"
            label="ИИ-инструмент"
            value={formValues.tool}
            error={formErrors.tool}
            options={templateToolOptions}
            emptyOptionLabel="Выберите инструмент"
            onChange={handleInputChange}
          />

          <SelectField
            id="template-conversion-type"
            name="conversionType"
            label="Тип конвертации"
            value={formValues.conversionType}
            error={formErrors.conversionType}
            options={templateConversionTypeOptions}
            emptyOptionLabel="Выберите тип"
            onChange={handleInputChange}
          />
        </div>

        <PromptEditor
          id="template-prompt"
          name="prompt"
          label="Текст промпта"
          value={formValues.prompt}
          error={formErrors.prompt}
          placeholder={`## Роль
Ты полезный ассистент.

---

## Задача
Помоги пользователю с темой: {{topic}}

+++Format
Верни структурированный ответ.`}
          onChange={handlePromptChange}
        />

        <TextareaField
          id="template-result"
          name="result"
          label="Пример результата"
          value={formValues.result}
          error={formErrors.result}
          placeholder="Кратко опишите, какой результат должен получить пользователь."
          onChange={handleInputChange}
        />

        <div className="form-card__buttons">
          <button className="button button--primary" type="submit">
            Сохранить шаблон
          </button>

          <button className="button" type="button" onClick={handleClearForm}>
            Очистить форму
          </button>
        </div>

        <FormSuccessMessage message={successMessage} />
      </form>
    </section>
  )
}

function TextField({ id, name, label, value, error, placeholder, onChange }) {
  const errorId = `${id}-error`

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
      />

      {error && (
        <p className="form-field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

function SelectField({
  id,
  name,
  label,
  value,
  error,
  options,
  emptyOptionLabel,
  onChange,
}) {
  const errorId = `${id}-error`

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      <select
        id={id}
        name={name}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
      >
        <option value="">{emptyOptionLabel}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && (
        <p className="form-field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

function TextareaField({ id, name, label, value, error, placeholder, onChange }) {
  const errorId = `${id}-error`

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      <textarea
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={8}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
      />

      {error && (
        <p className="form-field__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

function FormSuccessMessage({ message }) {
  if (!message) {
    return null
  }

  return <p className="form-card__success">{message}</p>
}