const metaGlyphRegex = /[∈∩∪¬→⊕]/
const jsonLineRegex = /^"[^"]+"\s*:\s*"[^"]*"/
const xmlTagRegex = /<\/?[a-zA-Z][^>]*>/
const variableRegex = /{{[^}]+}}/
const inlineCodeRegex = /`[^`]+`/

export function getPromptLineType(line) {
  const trimmedLine = line.trim()

  if (!trimmedLine) {
    return 'empty'
  }

  if (trimmedLine.startsWith('##')) {
    return 'heading'
  }

  if (trimmedLine === '---') {
    return 'separator'
  }

  if (trimmedLine.startsWith('+++')) {
    return 'decorator'
  }

  if (jsonLineRegex.test(trimmedLine)) {
    return 'json'
  }

  if (xmlTagRegex.test(trimmedLine)) {
    return 'xml'
  }

  if (variableRegex.test(trimmedLine)) {
    return 'variable'
  }

  if (inlineCodeRegex.test(trimmedLine)) {
    return 'code'
  }

  if (metaGlyphRegex.test(trimmedLine)) {
    return 'metaglyph'
  }

  if (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 3) {
    return 'accent'
  }

  return 'plain'
}

export function createPromptHighlightedLines(promptText) {
  return promptText.split('\n').map((line, index) => ({
    id: `prompt-line-${index}`,
    text: line || ' ',
    type: getPromptLineType(line),
  }))
}