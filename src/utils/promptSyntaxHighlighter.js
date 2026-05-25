const metaGlyphRegex = /[∈∩∪¬→⊕]/
const jsonLineRegex = /^"[^"]+"\s*:\s*"[^"]*"/
const xmlTagRegex = /<\/?[a-zA-Z][^>]*>/
const variableRegex = /{{[^}]+}}/
const inlineCodeRegex = /`[^`]+`/
const tokenRegex = /{{[^}\n]+}}|`[^`\n]+`|<\/?[a-zA-Z][^>\n]*>|[∈∩∪¬→⊕]|"[^"\n]+"/g
const jsonTokenRegex = /{{[^}\n]+}}|`[^`\n]+`|<\/?[a-zA-Z][^>\n]*>|[∈∩∪¬→⊕]|"[^"\n]+"|[{}:,]|\[|\]/g

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

function getPromptTokenType(token, lineType, sourceLine, tokenStartIndex) {
  if (variableRegex.test(token)) {
    return 'variable'
  }

  if (inlineCodeRegex.test(token)) {
    return 'code'
  }

  if (xmlTagRegex.test(token)) {
    return 'xml-tag'
  }

  if (metaGlyphRegex.test(token)) {
    return 'metaglyph'
  }

  if (lineType === 'json') {
    if (/^"[^"]+"$/.test(token)) {
      const textAfterToken = sourceLine.slice(tokenStartIndex + token.length)

      return textAfterToken.trimStart().startsWith(':') ? 'json-key' : 'json-string'
    }

    if (/^(?:[{}:,]|\[|\])$/.test(token)) {
      return 'json-punctuation'
    }
  }

  return 'plain'
}

export function createPromptHighlightedTokens(line, lineType = getPromptLineType(line)) {
  if (!line) {
    return [{ id: 'token-0', text: ' ', type: 'plain' }]
  }

  const tokens = []
  let lastIndex = 0
  const syntaxRegex = lineType === 'json' ? jsonTokenRegex : tokenRegex

  for (const match of line.matchAll(syntaxRegex)) {
    const tokenText = match[0]
    const tokenStartIndex = match.index

    if (tokenStartIndex > lastIndex) {
      tokens.push({
        id: `token-${tokens.length}`,
        text: line.slice(lastIndex, tokenStartIndex),
        type: 'plain',
      })
    }

    tokens.push({
      id: `token-${tokens.length}`,
      text: tokenText,
      type: getPromptTokenType(tokenText, lineType, line, tokenStartIndex),
    })

    lastIndex = tokenStartIndex + tokenText.length
  }

  if (lastIndex < line.length) {
    tokens.push({
      id: `token-${tokens.length}`,
      text: line.slice(lastIndex),
      type: 'plain',
    })
  }

  return tokens
}

export function createPromptHighlightedLines(promptText) {
  return promptText.split('\n').map((line, index) => {
    const type = getPromptLineType(line)

    return {
      id: `prompt-line-${index}`,
      text: line || ' ',
      type,
      tokens: createPromptHighlightedTokens(line, type),
    }
  })
}
