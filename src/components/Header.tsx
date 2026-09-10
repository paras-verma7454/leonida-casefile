import { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import type { CaseData, Screen } from '../types'

interface HeaderProps {
  caseData: CaseData
  onNavigate: (screen: Screen) => void
}

export default function Header({ caseData, onNavigate }: HeaderProps) {
  const [confirmDialog, setConfirmDialog] = useState<{ message: string; onConfirm: () => void } | null>(null)

  const statusColor: Record<string, string> = {
    ACTIVE: 'text-active-green',
    'UNDER REVIEW': 'text-sunset-orange',
    CLOSED: 'text-text-muted',
  }
  const statusClass = statusColor[caseData.status] ?? 'text-text-muted'

  return (
    <header className="bg-vice-surface border-b border-vice-border shrink-0">
      <div className="sunset-bar" />
      <div className="px-5 py-3 flex items-center justify-between">
      {/* Left: Logo + Case Details */}
      <div className="flex items-center gap-6">
        <span className="font-display text-lg text-vice-pink tracking-wide">LEONIDA CASEFILE</span>

        <div className="h-4 w-px bg-vice-border" />

        <div className="flex items-center gap-4 font-mono text-[11px] header-metadata">
          <div>
            <span className="text-text-muted mr-1.5">CASE</span>
            <span className="text-vice-cyan tabular-nums">{caseData.caseNumber}</span>
          </div>
          <div>
            <span className="text-text-muted mr-1.5">STATUS</span>
            <span className={statusClass}>{caseData.status}</span>
          </div>
          {caseData.location && (
            <div>
              <span className="text-text-muted mr-1.5">LOC</span>
              <span className="text-sunset-orange">{caseData.location}</span>
            </div>
          )}
          {caseData.time && (
            <div>
              <span className="text-text-muted mr-1.5">TIME</span>
              <span className="text-text-primary">
                {new Date(caseData.time).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          )}
          {caseData.evidence.length > 0 && (
            <div>
              <span className="text-text-muted mr-1.5">EVIDENCE</span>
              <span className="text-vice-cyan tabular-nums">{caseData.evidence.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setConfirmDialog({
            message: 'This will erase all current evidence. Continue?',
            onConfirm: () => onNavigate('terminal'),
          })}
          className="px-3 py-1.5 font-mono text-[11px] text-text-muted border border-vice-border rounded-sm hover:text-text-primary hover:border-vice-cyan/50 transition-colors"
        >
          NEW CASE
        </button>
        <button
          onClick={() => onNavigate('casefile')}
          className="px-4 py-1.5 font-mono text-[11px] text-white bg-vice-pink rounded-sm hover:bg-vice-magenta transition-colors glow-pink-hover"
        >
          GENERATE DOSSIER
        </button>
      </div>

      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog(null)}
        />
      )}
      </div>
    </header>
  )
}
