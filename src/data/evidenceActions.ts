import type { EvidenceAction } from '../types'

interface EvidenceActionConfig {
  id: EvidenceAction
  label: string
  icon: string
  description: string
  tools: string[]
}

export const evidenceActions: EvidenceActionConfig[] = [
  {
    id: 'mark',
    label: 'MARK EVIDENCE',
    icon: '⊕',
    description: 'Circle or highlight evidence in the scene',
    tools: ['draw', 'shape', 'text'],
  },
  {
    id: 'crop',
    label: 'CROP DETAIL',
    icon: '⌘',
    description: 'Isolate a specific area for analysis',
    tools: ['crop', 'resize'],
  },
  {
    id: 'enhance',
    label: 'ENHANCE IMAGE',
    icon: '◎',
    description: 'Apply filters to improve visibility',
    tools: ['filter'],
  },
  {
    id: 'annotate',
    label: 'ADD ANNOTATION',
    icon: '✎',
    description: 'Add text or arrows to the scene',
    tools: ['draw', 'text', 'shape'],
  },
  {
    id: 'redact',
    label: 'REDACT',
    icon: '■',
    description: 'Obscure sensitive information',
    tools: ['shape'],
  },
]
