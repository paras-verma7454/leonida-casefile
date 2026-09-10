import { useState, useEffect, useRef } from 'react'

interface TerminalProps {
  onEnter: () => void
}

const bootLines = [
  '> LEONIDA COUNTY POLICE DEPARTMENT',
  '> DIGITAL EVIDENCE SYSTEM v3.2.1',
  '> INITIALIZING SECURE CHANNEL...',
  '> CONNECTING TO EVIDENCE VAULT...',
  '> BIOMETRIC SCAN: VERIFIED',
  '> ACCESS GRANTED',
  '',
  '> WELCOME, DETECTIVE.',
]

export default function Terminal({ onEnter }: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [showPrompt, setShowPrompt] = useState(false)
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const delay = bootLines[visibleLines] === '' ? 300 : 600
      const timer = setTimeout(() => setVisibleLines((l) => l + 1), delay)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => setShowPrompt(true), 400)
    return () => clearTimeout(timer)
  }, [visibleLines])

  useEffect(() => {
    if (!showPrompt) return
    const chars = 'ENTER > '
    let i = 0
    const timer = setInterval(() => {
      if (i <= chars.length) {
        setInputText(chars.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [showPrompt])

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showPrompt) return
    const el = containerRef.current
    if (!el) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onEnter()
    }
    el.addEventListener('keydown', handler)
    return () => el.removeEventListener('keydown', handler)
  }, [showPrompt, onEnter])

  return (
    <div
      ref={containerRef}
      tabIndex={showPrompt ? 0 : -1}
      className="flicker vignette crt noise min-h-screen bg-vice-bg flex items-center justify-center p-8"
      onClick={showPrompt ? onEnter : undefined}
    >
      <div className="w-full max-w-2xl">
        {/* Terminal header bar */}
        <div className="bg-vice-surface border border-vice-border rounded-t-sm px-4 py-2 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-police-red" />
          <div className="w-2.5 h-2.5 rounded-full bg-sunset-orange" />
          <div className="w-2.5 h-2.5 rounded-full bg-active-green" />
          <span className="ml-3 text-text-muted text-xs font-mono tracking-wider">leonida-lcpd-secure://terminal</span>
        </div>

        {/* Terminal body */}
        <div className="bg-vice-bg/80 backdrop-blur-sm border border-t-0 border-vice-border rounded-b-sm p-6 min-h-[320px] font-mono text-sm">
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`mb-1 ${i === visibleLines - 1 ? 'fade-in-up' : ''} ${
                line.includes('GRANTED')
                  ? 'text-active-green font-semibold'
                  : line.includes('WELCOME')
                    ? 'text-vice-pink font-semibold text-base'
                    : line.startsWith('>')
                      ? 'text-vice-cyan'
                      : 'text-text-muted'
              }`}
            >
              {line || '\u00A0'}
            </div>
          ))}

          {showPrompt && (
            <div className="mt-4 flex items-center gap-0">
              <span className="text-sunset-coral font-mono text-sm">{inputText}</span>
              <span className="inline-block w-2 h-4 bg-vice-cyan ml-0.5 animate-pulse" />
            </div>
          )}

          {showPrompt && (
            <div className="mt-6 text-text-muted text-xs font-mono">
              PRESS ENTER OR CLICK TO PROCEED
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
