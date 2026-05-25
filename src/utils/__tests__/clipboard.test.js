import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { copyTextToClipboard } from '../clipboard'

let originalClipboard

describe('clipboard', () => {
  beforeEach(() => {
    originalClipboard = navigator.clipboard
  })

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: originalClipboard,
    })
  })

  it('копирует непустую строку в буфер обмена', async () => {
    const writeText = vi.fn().mockResolvedValue()

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })

    await expect(copyTextToClipboard('## Роль')).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledWith('## Роль')
  })

  it('не копирует пустую строку', async () => {
    const writeText = vi.fn().mockResolvedValue()

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })

    await expect(copyTextToClipboard('   ')).resolves.toBe(false)
    expect(writeText).not.toHaveBeenCalled()
  })

  it('возвращает false, если Clipboard API недоступен', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    })

    await expect(copyTextToClipboard('## Роль')).resolves.toBe(false)
  })

  it('не падает на нестроковом значении', async () => {
    const writeText = vi.fn().mockResolvedValue()

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })

    await expect(copyTextToClipboard(null)).resolves.toBe(false)
    expect(writeText).not.toHaveBeenCalled()
  })
})
