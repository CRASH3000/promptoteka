import { createPromptHighlightedLines } from '../../utils/promptSyntaxHighlighter'

export function PromptSyntaxPreview({ promptText }) {
  const highlightedLines = createPromptHighlightedLines(promptText)

  const hasPromptText = promptText.trim().length > 0

  return (
    <div className="prompt-preview">
      <div className="prompt-preview__header">
        <span>Предпросмотр подсветки</span>
        <small>syntax preview</small>
      </div>

      {!hasPromptText ? (
        <div className="prompt-preview__empty">
          Начните писать промпт, и здесь появится подсветка синтаксиса.
        </div>
      ) : (
        <pre className="prompt-preview__body" aria-label="Предпросмотр подсветки промпта">
          {highlightedLines.map((line) => (
            <code
              key={line.id}
              className={`prompt-preview__line prompt-preview__line--${line.type}`}
            >
              {line.tokens.map((token) => (
                <span
                  key={token.id}
                  className={`prompt-preview__token prompt-preview__token--${token.type}`}
                >
                  {token.text}
                </span>
              ))}
            </code>
          ))}
        </pre>
      )}
    </div>
  )
}
