import { useCallback, useRef, useState } from 'react'
import ImageEditor, { type ImageEditorInstance } from '@unlayer/react-image-editor'
import { evidenceActions } from '../data/evidenceActions'
import { compressImage } from '../utils/compressImage'
import type { EvidenceAction } from '../types'

interface EditorModalProps {
  action: EvidenceAction
  image: string
  existingEvidence?: {
    id: string
    label: string
    description: string
    annotatedImage: string
  }
  onSave: (annotatedImage: string, label: string, description: string) => void
  onCancel: () => void
}

export default function EditorModal({
  action,
  image,
  existingEvidence,
  onSave,
  onCancel,
}: EditorModalProps) {
  const editorRef = useRef<ImageEditorInstance | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [step, setStep] = useState<'edit' | 'name'>('edit')
  const [label, setLabel] = useState(existingEvidence?.label || '')
  const [description, setDescription] = useState(existingEvidence?.description || '')
  const [savedImage, setSavedImage] = useState<string | null>(null)

  const actionConfig = evidenceActions.find((a) => a.id === action)

  const handleLoad = useCallback((editor: ImageEditorInstance) => {
    editorRef.current = editor
    setIsReady(true)
  }, [])

  // This is called when user clicks Unlayer's built-in Save button
  const handleEditorSave = useCallback(
    async (result: { dataUrl: string; blob: Blob }) => {
      const compressed = await compressImage(result.dataUrl)
      setSavedImage(compressed)
      setStep('name')
    },
    []
  )

  const handleConfirmSave = useCallback(() => {
    if (!savedImage) return
    onSave(savedImage, label || `${actionConfig?.label || 'Evidence'}`, description)
  }, [savedImage, label, description, onSave, actionConfig])

  const handleBackToEdit = useCallback(() => {
    setStep('edit')
  }, [])

  // Build Unlayer tools config from action
  const allTools = ['draw', 'text', 'shapes', 'crop', 'resize', 'filter', 'stickers', 'frame']
  const enabledTools = actionConfig?.tools || []

  const toolsConfig: Record<string, boolean> = {}
  allTools.forEach((tool) => {
    toolsConfig[tool] = enabledTools.includes(tool)
  })

  // Use existing annotated image if editing, otherwise use original
  const editorImage = existingEvidence?.annotatedImage || image

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-vice-bg/90 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal */}
      <div className="relative w-full max-w-5xl h-[85vh] mx-4 bg-vice-surface border border-vice-border rounded-sm overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-vice-border shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-vice-cyan text-sm">{actionConfig?.icon}</span>
            <span className="font-mono text-xs text-text-primary uppercase tracking-wider">
              {existingEvidence ? 'EDIT EVIDENCE' : actionConfig?.label}
            </span>
            <span className="text-text-muted/50 font-mono text-[10px]">
              — {actionConfig?.description}
            </span>
          </div>
          <button
            onClick={onCancel}
            className="px-3 py-1.5 font-mono text-xs text-text-muted hover:text-text-primary border border-vice-border rounded-sm transition-colors"
          >
            CLOSE
          </button>
        </div>

        {/* Content */}
        {step === 'edit' ? (
          /* Editor */
          <div className="flex-1 min-h-0 overflow-hidden relative">
            <ImageEditor
              image={editorImage}
              options={{
                theme: 'dark',
                features: {
                  ai: false,
                  imageEditor: {
                    tools: toolsConfig,
                  },
                },
              }}
              editorId={`editor-${action}-${existingEvidence?.id || 'new'}`}
              minHeight="100%"
              onLoad={handleLoad}
              onSave={handleEditorSave}
            />
            {!isReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-vice-surface z-10">
                <div className="text-text-muted font-mono text-sm animate-pulse">
                  LOADING EDITOR...
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Name Evidence */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-md space-y-4">
              <div className="text-center mb-6">
                <div className="text-text-primary font-mono text-sm mb-1">
                  {existingEvidence ? 'Update evidence details' : 'Name this evidence'}
                </div>
                <div className="text-text-muted/50 font-mono text-[10px]">
                  Provide a label and optional description for your case file
                </div>
              </div>

              {/* Preview */}
              {savedImage && (
                <div className="border border-vice-border rounded-sm overflow-hidden">
                  <img src={savedImage} alt="Evidence preview" className="w-full h-40 object-cover" />
                </div>
              )}

              {/* Label input */}
              <div>
                <label className="block text-text-muted font-mono text-[10px] uppercase tracking-wider mb-1">
                  Label *
                </label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g., Getaway vehicle, Suspect face, License plate..."
                  className="w-full bg-vice-card border border-vice-border text-text-primary font-mono text-sm px-3 py-2.5 rounded-sm focus:border-vice-cyan focus:outline-none transition-colors placeholder:text-text-muted/40"
                  autoFocus
                />
              </div>

              {/* Description input */}
              <div>
                <label className="block text-text-muted font-mono text-[10px] uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Optional notes about this evidence..."
                  className="w-full bg-vice-card border border-vice-border text-text-primary font-mono text-sm px-3 py-2.5 rounded-sm resize-none focus:border-vice-cyan focus:outline-none transition-colors placeholder:text-text-muted/40"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleBackToEdit}
                  className="flex-1 px-3 py-2.5 font-mono text-xs text-text-muted border border-vice-border rounded-sm hover:text-text-primary hover:border-vice-cyan/50 transition-colors"
                >
                  ← BACK TO EDIT
                </button>
                <button
                  onClick={handleConfirmSave}
                  className="flex-1 px-3 py-2.5 font-mono text-xs text-white bg-vice-pink rounded-sm hover:bg-vice-magenta transition-colors"
                >
                  {existingEvidence ? 'UPDATE EVIDENCE' : 'ADD TO CASE'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
