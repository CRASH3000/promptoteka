export function validateTemplateForm(formValues) {
  const errors = {}

  if (!formValues.title.trim()) {
    errors.title = 'Введите название шаблона'
  } else if (formValues.title.trim().length < 3) {
    errors.title = 'Название должно быть не короче 3 символов'
  }

  if (!formValues.prompt.trim()) {
    errors.prompt = 'Введите текст промпта'
  } else if (formValues.prompt.trim().length < 20) {
    errors.prompt = 'Промпт должен быть подробнее, минимум 20 символов'
  }

  if (!formValues.result.trim()) {
    errors.result = 'Введите пример результата'
  } else if (formValues.result.trim().length < 5) {
    errors.result = 'Результат должен быть понятнее'
  }

  if (!formValues.sphere) {
    errors.sphere = 'Выберите сферу применения'
  }

  if (!formValues.tool) {
    errors.tool = 'Выберите ИИ-инструмент'
  }

  if (!formValues.conversionType) {
    errors.conversionType = 'Выберите тип конвертации'
  }

  return errors
}

export function hasTemplateFormErrors(errors) {
  return Object.keys(errors).length > 0
}