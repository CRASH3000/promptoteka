export async function copyTextToClipboard(text) {
  const textToCopy = typeof text === 'string' ? text : ''

  if (!textToCopy.trim()) {
    return false
  }

  if (!navigator.clipboard?.writeText) {
    return false
  }

  await navigator.clipboard.writeText(textToCopy)

  return true
}
