import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  hasValidationErrors,
  validateForgotPasswordForm,
  validateLoginForm,
  validateRegisterForm,
} from '../../utils/authFormValidation'

const initialLoginValues = {
  email: '',
  password: '',
}

const initialRegisterValues = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
  personalDataAccepted: false,
}

const initialForgotPasswordValues = {
  email: '',
}

export function LoginForm() {
  const [formValues, setFormValues] = useState(initialLoginValues)
  const [formErrors, setFormErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  function handleInputChange(event) {
    const { name, value } = event.target

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const errors = validateLoginForm(formValues)
    setFormErrors(errors)
    setSuccessMessage('')

    if (hasValidationErrors(errors)) {
      return
    }

    setSuccessMessage('Вход выполнен успешно. В реальном проекте здесь будет запрос к серверу.')
  }

  return (
    <AuthFormLayout
      title="Вход"
      description="Войдите в аккаунт, чтобы сохранять шаблоны и добавлять материалы в избранное."
    >
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <TextField
          id="login-email"
          name="email"
          label="Email"
          type="email"
          value={formValues.email}
          error={formErrors.email}
          autoComplete="email"
          onChange={handleInputChange}
        />

        <TextField
          id="login-password"
          name="password"
          label="Пароль"
          type="password"
          value={formValues.password}
          error={formErrors.password}
          autoComplete="current-password"
          onChange={handleInputChange}
        />

        <div className="form-card__links">
          <Link to="/auth/register">Создать аккаунт</Link>
          <Link to="/auth/forgot-password">Забыли пароль?</Link>
        </div>

        <button className="button button--primary" type="submit">
          Войти
        </button>

        <FormSuccessMessage message={successMessage} />
      </form>
    </AuthFormLayout>
  )
}

export function RegisterForm() {
  const [formValues, setFormValues] = useState(initialRegisterValues)
  const [formErrors, setFormErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  function handleInputChange(event) {
    const { name, value, checked, type } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setFormValues({
      ...formValues,
      [name]: nextValue,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const errors = validateRegisterForm(formValues)
    setFormErrors(errors)
    setSuccessMessage('')

    if (hasValidationErrors(errors)) {
      return
    }

    setSuccessMessage('Регистрация прошла успешно. В реальном проекте данные ушли бы на сервер.')
  }

  return (
    <AuthFormLayout
      title="Регистрация"
      description="Создайте аккаунт, чтобы хранить свои шаблоны и пользоваться избранным."
    >
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <TextField
          id="register-name"
          name="name"
          label="Имя"
          type="text"
          value={formValues.name}
          error={formErrors.name}
          autoComplete="name"
          onChange={handleInputChange}
        />

        <TextField
          id="register-email"
          name="email"
          label="Email"
          type="email"
          value={formValues.email}
          error={formErrors.email}
          autoComplete="email"
          onChange={handleInputChange}
        />

        <TextField
          id="register-password"
          name="password"
          label="Пароль"
          type="password"
          value={formValues.password}
          error={formErrors.password}
          autoComplete="new-password"
          onChange={handleInputChange}
        />

        <TextField
          id="register-repeat-password"
          name="repeatPassword"
          label="Повторите пароль"
          type="password"
          value={formValues.repeatPassword}
          error={formErrors.repeatPassword}
          autoComplete="new-password"
          onChange={handleInputChange}
        />

        <CheckboxField
          id="register-personal-data"
          name="personalDataAccepted"
          checked={formValues.personalDataAccepted}
          error={formErrors.personalDataAccepted}
          onChange={handleInputChange}
        />

        <div className="form-card__links">
          <Link to="/auth/login">Уже есть аккаунт?</Link>
        </div>

        <button className="button button--primary" type="submit">
          Зарегистрироваться
        </button>

        <FormSuccessMessage message={successMessage} />
      </form>
    </AuthFormLayout>
  )
}

export function ForgotPasswordForm() {
  const [formValues, setFormValues] = useState(initialForgotPasswordValues)
  const [formErrors, setFormErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  function handleInputChange(event) {
    const { name, value } = event.target

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const errors = validateForgotPasswordForm(formValues)
    setFormErrors(errors)
    setSuccessMessage('')

    if (hasValidationErrors(errors)) {
      return
    }

    setSuccessMessage('Инструкция по восстановлению пароля отправлена на указанный email.')
  }

  return (
    <AuthFormLayout
      title="Восстановление пароля"
      description="Введите email, и мы покажем сообщение о восстановлении доступа."
    >
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <TextField
          id="forgot-email"
          name="email"
          label="Email"
          type="email"
          value={formValues.email}
          error={formErrors.email}
          autoComplete="email"
          onChange={handleInputChange}
        />

        <div className="form-card__links">
          <Link to="/auth/login">Вернуться ко входу</Link>
        </div>

        <button className="button button--primary" type="submit">
          Восстановить пароль
        </button>

        <FormSuccessMessage message={successMessage} />
      </form>
    </AuthFormLayout>
  )
}

function AuthFormLayout({ title, description, children }) {
  return (
    <section className="page-card">
      <div className="page-card__top">
        <span className="page-card__label">Сервисная карточка</span>
        <span className="page-card__paper-mark">AUTH</span>
      </div>

      <div className="page-card__content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      {children}
    </section>
  )
}

function TextField({
  id,
  name,
  label,
  type,
  value,
  error,
  autoComplete,
  onChange,
}) {
  const errorId = `${id}-error`

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
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

function CheckboxField({ id, name, checked, error, onChange }) {
  const errorId = `${id}-error`

  return (
    <div className="form-field">
      <label className="checkbox-field" htmlFor={id}>
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={onChange}
        />

        <span>Я даю согласие на обработку персональных данных</span>
      </label>

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