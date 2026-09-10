import type { CaseData } from '../types'

interface CaseDetailsProps {
  caseData: CaseData
}

export default function CaseDetails({ caseData }: CaseDetailsProps) {
  return (
    <div>
      <div className="text-text-muted font-mono text-[10px] uppercase tracking-widest mb-2">
        Case Details
      </div>
      <div className="space-y-2 font-mono text-[11px]">
        <div className="flex justify-between">
          <span className="text-text-muted">Case No.</span>
          <span className="text-vice-cyan tabular-nums">{caseData.caseNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Location</span>
          <span className="text-sunset-orange text-right max-w-[140px] truncate">
            {caseData.location || '—'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Time</span>
          <span className="text-text-primary">
            {caseData.time
              ? new Date(caseData.time).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '—'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Status</span>
          <span
            className={
              caseData.status === 'ACTIVE'
                ? 'text-active-green'
                : caseData.status === 'UNDER REVIEW'
                  ? 'text-sunset-orange'
                  : 'text-text-muted'
            }
          >
            {caseData.status}
          </span>
        </div>
      </div>

      {caseData.notes && (
        <>
          <div className="h-px bg-vice-border my-3" />
          <div className="text-text-muted font-mono text-[10px] uppercase tracking-widest mb-1.5">
            Notes
          </div>
          <div className="text-text-primary font-prose text-[11px] leading-relaxed bg-vice-card p-2.5 rounded-sm max-h-[80px] overflow-y-auto">
            {caseData.notes}
          </div>
        </>
      )}
    </div>
  )
}
