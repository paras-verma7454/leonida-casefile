import { evidenceActions } from '../data/evidenceActions'
import type { EvidenceAction } from '../types'

interface EvidenceActionsProps {
  onAction: (action: EvidenceAction) => void
}

export default function EvidenceActions({ onAction }: EvidenceActionsProps) {
  return (
    <div>
      <div className="text-text-muted font-mono text-[10px] uppercase tracking-widest mb-2">
        Image Actions
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {evidenceActions.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction(action.id)}
            className="flex flex-col items-center gap-1 px-2 py-2.5 bg-vice-card border border-vice-border rounded-sm text-center hover:border-vice-cyan/50 hover:bg-vice-cyan/5 transition-all group"
          >
            <span className="text-vice-cyan text-sm">{action.icon}</span>
            <span className="text-text-primary font-mono text-[9px] group-hover:text-vice-cyan transition-colors leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
