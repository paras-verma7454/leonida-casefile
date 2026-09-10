import { evidenceActions } from '../data/evidenceActions'
import type { EvidenceAction } from '../types'

interface EvidenceActionsProps {
  onAction: (action: EvidenceAction) => void
  disabled?: boolean
  activeAction?: EvidenceAction | null
}

export default function EvidenceActions({ onAction, disabled, activeAction }: EvidenceActionsProps) {
  return (
    <div>
      <div className="text-text-muted font-mono text-[10px] uppercase tracking-widest mb-2">
        Image Actions
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {evidenceActions.map((action) => {
          const isActive = activeAction === action.id
          return (
            <button
              key={action.id}
              onClick={() => onAction(action.id)}
              disabled={disabled}
              className={`flex flex-col items-center gap-1 px-2 py-2.5 border rounded-sm text-center transition-all group disabled:opacity-30 disabled:cursor-not-allowed ${
                isActive
                  ? 'bg-vice-cyan/10 border-vice-cyan text-vice-cyan'
                  : 'bg-vice-card border-vice-border hover:border-vice-cyan/50 hover:bg-vice-cyan/5'
              }`}
            >
              <span className="text-sm">{action.icon}</span>
              <span className={`font-mono text-[9px] leading-tight ${isActive ? 'text-vice-cyan' : 'text-text-primary group-hover:text-vice-cyan'}`}>
                {action.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
