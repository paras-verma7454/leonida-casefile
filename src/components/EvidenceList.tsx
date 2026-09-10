import type { EvidenceItem } from '../types'
import { evidenceActions } from '../data/evidenceActions'

interface EvidenceListProps {
  evidence: EvidenceItem[]
  onRemove: (id: string) => void
  onEdit: (item: EvidenceItem) => void
}

export default function EvidenceList({ evidence, onRemove, onEdit }: EvidenceListProps) {
  const getActionLabel = (action: string) =>
    evidenceActions.find((a) => a.id === action)?.label || action

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-text-muted font-mono text-[10px] uppercase tracking-widest">
          Evidence
        </span>
        <span className="text-vice-cyan font-mono text-[10px] tabular-nums">
          {evidence.length} ITEMS
        </span>
      </div>

      {evidence.length === 0 ? (
        <div className="text-text-muted/50 font-mono text-[10px] text-center py-4 border border-dashed border-vice-border rounded-sm">
          No evidence collected yet.
          <br />
          Use image actions to investigate.
        </div>
      ) : (
        <div className="space-y-2">
          {evidence.map((item, i) => (
            <div
              key={item.id}
              className="bg-vice-card border border-vice-border rounded-sm overflow-hidden group cursor-pointer hover:border-vice-cyan/30 transition-colors"
              onClick={() => onEdit(item)}
            >
              {/* Thumbnail */}
              <div className="h-16 bg-vice-bg overflow-hidden">
                <img
                  src={item.annotatedImage}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Info */}
              <div className="p-2 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sunset-orange font-mono text-[10px] tabular-nums">
                      #{String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-text-primary font-mono text-[11px] truncate">
                      {item.label}
                    </span>
                  </div>
                  <div className="text-text-muted/50 font-mono text-[9px]">
                    {getActionLabel(item.action)}
                  </div>
                  {item.description && (
                    <div className="text-text-muted/40 font-mono text-[9px] truncate mt-0.5">
                      {item.description}
                    </div>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (window.confirm('Remove this evidence?')) {
                      onRemove(item.id)
                    }
                  }}
                  className="text-text-muted hover:text-police-red font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
