import { useEffect } from 'react'

interface ConfirmDialogProps {
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
}

export default function ConfirmDialog({ message, onConfirm, onCancel, confirmText = 'CONFIRM' }: ConfirmDialogProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onCancel])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="alertdialog" aria-modal="true" aria-label="Confirm action">
      <div className="absolute inset-0 bg-vice-bg/90 backdrop-blur-sm" onClick={onCancel} aria-hidden="true" />
      <div className="relative w-full max-w-sm mx-4 bg-vice-surface border border-vice-border rounded-sm p-6">
        <div className="font-mono text-sm text-text-primary mb-6">{message}</div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 px-3 py-2.5 font-mono text-xs text-text-muted border border-vice-border rounded-sm hover:text-text-primary hover:border-vice-cyan/50 transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-3 py-2.5 font-mono text-xs text-white bg-vice-pink rounded-sm hover:bg-vice-magenta transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
