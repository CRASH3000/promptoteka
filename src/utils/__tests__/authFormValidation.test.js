import { describe, expect, it } from 'vitest'
import {
  hasValidationErrors,
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

  it('не возвращает ошибки для корректной формы входа', () => {
    const errors = validateLoginForm({
      email: 'student@example.com',
      password: '123456',
    })

    expect(errors).toEqual({})
    expect(hasValidationErrors(errors)).toBe(false)
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
})