import { useState, useRef } from 'react'
import { locations } from '../data/locations'
import { compressImage } from '../utils/compressImage'
import type { CaseStatus } from '../types'

interface CaseCreationProps {
  caseNumber: string
  onSubmit: (data: { location: string; time: string; status: CaseStatus; notes: string; sceneImage: string | null }) => void
  onNavigate: (screen: 'terminal') => void
}

export default function CaseCreation({ caseNumber, onSubmit, onNavigate }: CaseCreationProps) {
  const [location, setLocation] = useState('')
  const [time, setTime] = useState('')
  const [status, setStatus] = useState<CaseStatus>('ACTIVE')
  const [notes, setNotes] = useState('')
  const [sceneImage, setSceneImage] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isCompressing, setIsCompressing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return
    setIsCompressing(true)
    const reader = new FileReader()
    reader.onload = async () => {
      const compressed = await compressImage(reader.result as string)
      setSceneImage(compressed)
      setIsCompressing(false)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const canSubmit = !!sceneImage || !!location

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    onSubmit({ location, time, status, notes, sceneImage })
  }

  return (
    <div
      className="crt noise min-h-screen flex items-stretch relative overflow-hidden"
      style={{
        backgroundImage: 'url(/jason-lucia.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-vice-bg/50" />

      {/* Left: Form */}
      <div className="w-full max-w-lg relative z-10 flex flex-col items-center justify-center p-6">
        <div className="w-full">
          <div className="mb-3 text-center relative">
            <button
              type="button"
              onClick={() => onNavigate('terminal')}
              className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-xs text-text-muted hover:text-vice-cyan transition-colors"
            >
              ← BACK
            </button>
            <h1 className="font-display text-2xl text-vice-pink mb-1">NEW CASE FILE</h1>
            <div className="text-text-muted font-mono text-xs">
              CASE <span className="text-vice-cyan tabular-nums">{caseNumber}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-vice-surface border border-vice-border rounded-sm p-4 space-y-3">
          {/* Scene Image Upload */}
          <div>
            <label className="block text-text-muted font-mono text-[10px] mb-1 uppercase tracking-wider">
              Crime Scene Photograph
            </label>
            {sceneImage ? (
              <div className="relative">
                <img src={sceneImage} alt="Scene preview" className="w-full h-40 object-cover rounded-sm border border-vice-border" />
                <button
                  type="button"
                  onClick={() => setSceneImage(null)}
                  className="absolute top-2 right-2 px-2 py-1 bg-vice-bg/80 text-police-red font-mono text-xs rounded-sm hover:bg-vice-bg transition-colors"
                >
                  REMOVE
                </button>
              </div>
            ) : isCompressing ? (
              <div className="border-2 border-vice-cyan rounded-sm p-6 text-center">
                <div className="text-vice-cyan font-mono text-xs animate-pulse">COMPRESSING IMAGE...</div>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-colors ${
                  isDragOver ? 'border-vice-cyan bg-vice-cyan/5' : 'border-vice-border hover:border-vice-cyan/50'
                }`}
              >
                <div className="text-2xl mb-2">📷</div>
                <div className="text-text-muted font-mono text-[10px]">
                  Drag & drop or click to upload
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFile(file)
              }}
              className="hidden"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-text-muted font-mono text-[10px] mb-1 uppercase tracking-wider">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-vice-card border border-vice-border text-text-primary font-mono text-xs px-3 py-2 rounded-sm focus:border-vice-cyan focus:outline-none transition-colors"
            >
              <option value="">Select location...</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Time */}
          <div>
            <label className="block text-text-muted font-mono text-[10px] mb-1 uppercase tracking-wider">
              Time of Incident
            </label>
            <input
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-vice-card border border-vice-border text-text-primary font-mono text-xs px-3 py-2 rounded-sm focus:border-vice-cyan focus:outline-none transition-colors"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-text-muted font-mono text-[10px] mb-1 uppercase tracking-wider">
              Case Status
            </label>
            <div className="flex gap-2">
              {(['ACTIVE', 'UNDER REVIEW', 'CLOSED'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`flex-1 font-mono text-[10px] py-1.5 rounded-sm border transition-all ${
                    status === s
                      ? s === 'ACTIVE'
                        ? 'bg-active-green/20 border-active-green text-active-green'
                        : s === 'UNDER REVIEW'
                          ? 'bg-sunset-orange/20 border-sunset-orange text-sunset-orange'
                          : 'bg-text-muted/20 border-text-muted text-text-muted'
                      : 'bg-vice-card border-vice-border text-text-muted hover:border-vice-border'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-text-muted font-mono text-[10px] mb-1 uppercase tracking-wider">
              Case Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Describe the incident..."
              className="w-full bg-vice-card border border-vice-border text-text-primary font-mono text-xs px-3 py-2 rounded-sm resize-none focus:border-vice-cyan focus:outline-none transition-colors placeholder:text-text-muted/50"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-vice-pink text-white font-mono text-xs py-2 rounded-sm hover:bg-vice-magenta transition-colors uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-vice-pink"
          >
            OPEN CASE →
          </button>
          {!canSubmit && (
            <div className="text-sunset-orange font-mono text-[10px] text-center">
              Upload a photo or select a location to proceed
            </div>
          )}
          </form>
        </div>
      </div>
    </div>
  )
}
