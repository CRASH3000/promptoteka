import { describe, expect, it } from 'vitest'
import {
  hasValidationErrors,
  validateForgotPasswordForm,
  validateLoginForm,
  validateRegisterForm,
} from '../authFormValidation'

describe('authFormValidation', () => {
  it('возвращает ошибки для пустой формы входа', () => {
    const errors = validateLoginForm({
      email: '',
      password: '',
    })

    expect(errors.email).toBe('Введите email')
    expect(errors.password).toBe('Введите пароль')
    expect(hasValidationErrors(errors)).toBe(true)
  })

  it('возвращает ошибки для некорректного email и короткого пароля при входе', () => {
    const errors = validateLoginForm({
      email: 'student-email',
      password: '123',
    })

    expect(errors.email).toBe('Введите корректный email')
    expect(errors.password).toBe('Пароль должен быть не короче 6 символов')
    expect(hasValidationErrors(errors)).toBe(true)
  })

  it('не возвращает ошибки для корректной формы входа', () => {
    const errors = validateLoginForm({
      email: 'student@example.com',
      password: '123456',
    })

    expect(errors).toEqual({})
    expect(hasValidationErrors(errors)).toBe(false)
  })

  it('возвращает ошибки для пустой формы регистрации', () => {
    const errors = validateRegisterForm({
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      personalDataAccepted: false,
    })

    expect(errors.name).toBe('Введите имя')
    expect(errors.email).toBe('Введите email')
    expect(errors.password).toBe('Введите пароль')
    expect(errors.repeatPassword).toBe('Повторите пароль')
    expect(errors.personalDataAccepted).toBe(
      'Нужно согласие на обработку персональных данных',
    )
    expect(hasValidationErrors(errors)).toBe(true)
  })

  it('проверяет короткое имя, некорректный email и короткий пароль при регистрации', () => {
    const errors = validateRegisterForm({
      name: 'В',
      email: 'wrong-email',
      password: '123',
      repeatPassword: '123',
      personalDataAccepted: true,
    })

    expect(errors.name).toBe('Имя должно быть не короче 2 символов')
    expect(errors.email).toBe('Введите корректный email')
    expect(errors.password).toBe('Пароль должен быть не короче 6 символов')
    expect(errors.repeatPassword).toBeUndefined()
    expect(errors.personalDataAccepted).toBeUndefined()
  })

  it('проверяет совпадение паролей при регистрации', () => {
    const errors = validateRegisterForm({
      name: 'Влад',
      email: 'student@example.com',
      password: '123456',
      repeatPassword: '654321',
      personalDataAccepted: true,
    })

    expect(errors.repeatPassword).toBe('Пароли должны совпадать')
  })

  it('требует согласие на обработку персональных данных при регистрации', () => {
    const errors = validateRegisterForm({
      name: 'Влад',
      email: 'student@example.com',
      password: '123456',
      repeatPassword: '123456',
      personalDataAccepted: false,
    })

    expect(errors.personalDataAccepted).toBe(
      'Нужно согласие на обработку персональных данных',
    )
  })

  it('не возвращает ошибки для корректной формы регистрации', () => {
    const errors = validateRegisterForm({
      name: 'Влад',
      email: 'student@example.com',
      password: '123456',
      repeatPassword: '123456',
      personalDataAccepted: true,
    })

    expect(errors).toEqual({})
    expect(hasValidationErrors(errors)).toBe(false)
  })

  it('возвращает ошибку для пустой формы восстановления пароля', () => {
    const errors = validateForgotPasswordForm({
      email: '',
    })

    expect(errors.email).toBe('Введите email')
    expect(hasValidationErrors(errors)).toBe(true)
  })

  it('возвращает ошибку для некорректного email при восстановлении пароля', () => {
    const errors = validateForgotPasswordForm({
      email: 'student-email',
    })

    expect(errors.email).toBe('Введите корректный email')
    expect(hasValidationErrors(errors)).toBe(true)
  })

  it('не возвращает ошибки для корректной формы восстановления пароля', () => {
    const errors = validateForgotPasswordForm({
      email: 'student@example.com',
    })

    expect(errors).toEqual({})
    expect(hasValidationErrors(errors)).toBe(false)
  })
})