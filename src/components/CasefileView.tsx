import type { CaseData, Screen } from '../types'
import { evidenceActions } from '../data/evidenceActions'

interface CasefileViewProps {
  caseData: CaseData
  onNavigate: (screen: Screen) => void
}

export default function CasefileView({ caseData, onNavigate }: CasefileViewProps) {
  const getActionLabel = (action: string) =>
    evidenceActions.find((a) => a.id === action)?.label || action

  const handleDownload = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-vice-bg p-8" id="casefile-root">
      <div className="max-w-3xl mx-auto">
        {/* Top bar - hidden when printing */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <button
            onClick={() => onNavigate('investigate')}
            className="font-mono text-xs text-text-muted hover:text-vice-cyan transition-colors"
          >
            ← BACK TO INVESTIGATION
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-vice-pink text-white font-mono text-xs rounded-sm hover:bg-vice-magenta transition-colors"
          >
            DOWNLOAD PDF
          </button>
        </div>

        {/* Casefile Document */}
        <div className="casefile-document bg-vice-card border border-vice-border rounded-sm overflow-hidden">
          {/* Document header */}
          <div className="bg-vice-surface px-8 py-4 border-b border-vice-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-police-red" />
              <span className="font-display text-lg text-vice-pink">LEONIDA COUNTY</span>
            </div>
            <span className="font-mono text-xs text-text-muted">CONFIDENTIAL</span>
          </div>

          {/* Paper section */}
          <div className="paper-texture p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl text-evidence-ink mb-1">CASE DOSSIER</h1>
              <div className="font-mono text-sm text-evidence-ink/60">
                CASE #{caseData.caseNumber}
              </div>
            </div>

            {/* Stamp */}
            <div className="flex justify-center mb-8">
              <div className="stamp">
                {caseData.status === 'ACTIVE'
                  ? 'ACTIVE'
                  : caseData.status === 'UNDER REVIEW'
                    ? 'UNDER REVIEW'
                    : 'CLOSED'}
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 font-mono text-sm">
              <div>
                <div className="text-evidence-ink/50 text-xs uppercase tracking-wider mb-1">Location</div>
                <div className="text-evidence-ink font-semibold">{caseData.location || '—'}</div>
              </div>
              <div>
                <div className="text-evidence-ink/50 text-xs uppercase tracking-wider mb-1">Time</div>
                <div className="text-evidence-ink font-semibold">
                  {caseData.time
                    ? new Date(caseData.time).toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '—'}
                </div>
              </div>
              <div>
                <div className="text-evidence-ink/50 text-xs uppercase tracking-wider mb-1">Evidence Items</div>
                <div className="text-evidence-ink font-semibold">{caseData.evidence.length}</div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-evidence-ink/20 my-6" />

            {/* Original Crime Scene */}
            {caseData.sceneImage && (
              <div className="mb-6">
                <h2 className="font-display text-xl text-evidence-ink mb-3">CRIME SCENE</h2>
                <img
                  src={caseData.sceneImage}
                  alt="Original crime scene"
                  className="w-full border border-evidence-ink/20"
                />
              </div>
            )}

            {/* Evidence Items */}
            {caseData.evidence.length > 0 && (
              <div className="mb-6">
                <h2 className="font-display text-xl text-evidence-ink mb-3">EVIDENCE LOG</h2>
                <div className="space-y-4">
                  {caseData.evidence.map((item, i) => (
                    <div key={item.id} className="border border-evidence-ink/20 rounded-sm overflow-hidden">
                      {/* Evidence image */}
                      <div className="bg-vice-bg/10 p-2">
                        <img
                          src={item.annotatedImage}
                          alt={item.label}
                          className="w-full border border-evidence-ink/10"
                        />
                      </div>
                      {/* Evidence info */}
                      <div className="p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-evidence-ink/40 font-mono text-xs tabular-nums">
                            #{String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-evidence-ink font-mono text-xs font-semibold uppercase">
                            {item.label}
                          </span>
                        </div>
                        <div className="text-evidence-ink/50 font-mono text-[10px] uppercase mb-1">
                          {getActionLabel(item.action)}
                        </div>
                        {item.description && (
                          <div className="text-evidence-ink/70 font-prose text-xs">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {caseData.notes && (
              <div className="mb-6">
                <h2 className="font-display text-xl text-evidence-ink mb-3">INCIDENT NOTES</h2>
                <div className="font-prose text-sm text-evidence-ink leading-relaxed whitespace-pre-wrap">
                  {caseData.notes}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-evidence-ink/20 pt-4 mt-8">
              <div className="flex justify-between font-mono text-xs text-evidence-ink/40">
                <span>LEONIDA COUNTY POLICE DEPARTMENT</span>
                <span>DIGITAL EVIDENCE UNIT</span>
              </div>
              <div className="text-center mt-4 font-mono text-[10px] text-evidence-ink/30">
                A fan-made experience inspired by open-world crime games. Not affiliated with Rockstar Games.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
