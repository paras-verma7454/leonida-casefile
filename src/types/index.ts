export type CaseStatus = 'ACTIVE' | 'UNDER REVIEW' | 'CLOSED'

export type EvidenceAction = 'mark' | 'crop' | 'enhance' | 'annotate' | 'redact'

export interface EvidenceItem {
  id: string
  action: EvidenceAction
  label: string
  description: string
  annotatedImage: string
  originalImage: string
  timestamp: string
}

export interface CaseData {
  caseNumber: string
  location: string
  time: string
  status: CaseStatus
  notes: string
  sceneImage: string | null
  evidence: EvidenceItem[]
}

export type Screen = 'terminal' | 'create' | 'investigate' | 'casefile'
