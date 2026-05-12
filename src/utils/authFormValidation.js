const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLoginForm(formValues) {
  const errors = {}

  if (!formValues.email.trim()) {
    errors.email = 'Введите email'
  } else if (!emailRegex.test(formValues.email)) {
    errors.email = 'Введите корректный email'
  }

  if (!formValues.password.trim()) {
    errors.password = 'Введите пароль'
  } else if (formValues.password.length < 6) {
    errors.password = 'Пароль должен быть не короче 6 символов'
  }

  return errors
}

export function validateRegisterForm(formValues) {
  const errors = {}

  if (!formValues.name.trim()) {
    errors.name = 'Введите имя'
  } else if (formValues.name.trim().length < 2) {
    errors.name = 'Имя должно быть не короче 2 символов'
  }

  if (!formValues.email.trim()) {
    errors.email = 'Введите email'
  } else if (!emailRegex.test(formValues.email)) {
    errors.email = 'Введите корректный email'
  }

  if (!formValues.password.trim()) {
    errors.password = 'Введите пароль'
  } else if (formValues.password.length < 6) {
    errors.password = 'Пароль должен быть не короче 6 символов'
  }

  if (!formValues.repeatPassword.trim()) {
    errors.repeatPassword = 'Повторите пароль'
  } else if (formValues.password !== formValues.repeatPassword) {
    errors.repeatPassword = 'Пароли должны совпадать'
  }

  if (!formValues.personalDataAccepted) {
    errors.personalDataAccepted = 'Нужно согласие на обработку персональных данных'
  }

  return errors
}

export function validateForgotPasswordForm(formValues) {
  const errors = {}

  if (!formValues.email.trim()) {
    errors.email = 'Введите email'
  } else if (!emailRegex.test(formValues.email)) {
    errors.email = 'Введите корректный email'
  }

  return errors
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0
}