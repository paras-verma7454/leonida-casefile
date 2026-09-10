import { useState, useCallback } from 'react'
import Header from './Header'
import EvidenceActions from './EvidenceActions'
import EvidenceList from './EvidenceList'
import EditorModal from './EditorModal'
import type { CaseData, EvidenceAction, EvidenceItem, Screen } from '../types'

interface InvestigationViewProps {
  caseData: CaseData
  onNavigate: (screen: Screen) => void
  onAddEvidence: (item: { action: EvidenceAction; label: string; description: string; annotatedImage: string }) => void
  onUpdateEvidence: (id: string, updates: Partial<EvidenceItem>) => void
  onRemoveEvidence: (id: string) => void
}

export default function InvestigationView({
  caseData,
  onNavigate,
  onAddEvidence,
  onUpdateEvidence,
  onRemoveEvidence,
}: InvestigationViewProps) {
  const [activeAction, setActiveAction] = useState<EvidenceAction | null>(null)
  const [editingEvidence, setEditingEvidence] = useState<EvidenceItem | null>(null)

  const handleAction = useCallback((action: EvidenceAction) => {
    if (!caseData.sceneImage) return
    setActiveAction(action)
    setEditingEvidence(null)
  }, [caseData.sceneImage])

  const handleEditEvidence = useCallback((item: EvidenceItem) => {
    if (!caseData.sceneImage) return
    setEditingEvidence(item)
    setActiveAction(item.action)
  }, [caseData.sceneImage])

  const handleSaveEvidence = useCallback(
    (annotatedImage: string, label: string, description: string) => {
      if (!activeAction || !caseData.sceneImage) return

      if (editingEvidence) {
        onUpdateEvidence(editingEvidence.id, {
          label,
          description,
          annotatedImage,
        })
      } else {
        onAddEvidence({
          action: activeAction,
          label,
          description,
          annotatedImage,
        })
      }

      setActiveAction(null)
      setEditingEvidence(null)
    },
    [activeAction, editingEvidence, caseData.sceneImage, onAddEvidence, onUpdateEvidence]
  )

  const handleCancel = useCallback(() => {
    setActiveAction(null)
    setEditingEvidence(null)
  }, [])

  return (
    <div className="h-screen bg-vice-bg flex flex-col overflow-hidden">
      <Header caseData={caseData} onNavigate={onNavigate} />

      <div className="flex-1 flex min-h-0 overflow-hidden investigation-layout">
        {/* Left: Scene Image */}
        <div className="flex-1 min-w-0 flex items-center justify-center bg-vice-bg p-6">
          {caseData.sceneImage ? (
            <img
              src={caseData.sceneImage}
              alt="Crime scene"
              className="max-w-full max-h-full object-contain rounded-sm border border-vice-border"
            />
          ) : (
            <div className="text-center">
              <div className="text-4xl mb-3">📷</div>
              <div className="text-text-muted/50 font-mono text-sm">
                No crime scene photograph
              </div>
              <div className="text-text-muted/30 font-mono text-[10px] mt-1">
                Upload one when creating a new case
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="w-[280px] min-w-[280px] shrink-0 border-l border-vice-border glass-panel overflow-y-auto flex flex-col investigation-sidebar">
          <div className="p-4 border-b border-vice-border">
            <EvidenceActions onAction={handleAction} disabled={!caseData.sceneImage} activeAction={activeAction} />
          </div>
          <div className="p-4 flex-1 min-h-0 overflow-y-auto">
            <EvidenceList
              evidence={caseData.evidence}
              onRemove={onRemoveEvidence}
              onEdit={handleEditEvidence}
            />
          </div>
        </div>
      </div>

      {/* Editor Modal — all actions including filter */}
      {activeAction && caseData.sceneImage && (
        <EditorModal
          action={activeAction}
          image={caseData.sceneImage}
          existingEvidence={editingEvidence || undefined}
          onSave={handleSaveEvidence}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}
