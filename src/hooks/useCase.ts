import { useState, useCallback, useEffect } from 'react'
import type { CaseData, EvidenceItem } from '../types'

const STORAGE_KEY = 'leonida-casefile'

const generateCaseNumber = () =>
  `LC-${String(Math.floor(1000 + Math.random() * 9000))}`

const initialCase = (): CaseData => ({
  caseNumber: generateCaseNumber(),
  location: '',
  time: '',
  status: 'ACTIVE',
  notes: '',
  sceneImage: null,
  evidence: [],
})

function loadCase(): CaseData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as CaseData
      if (parsed.caseNumber) return parsed
    }
  } catch {}
  return initialCase()
}

function saveCase(data: CaseData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

export function useCase() {
  const [caseData, setCaseData] = useState<CaseData>(loadCase)

  useEffect(() => {
    saveCase(caseData)
  }, [caseData])

  const updateCase = useCallback((updates: Partial<CaseData>) => {
    setCaseData((c) => ({ ...c, ...updates }))
  }, [])

  const addEvidence = useCallback((item: Omit<EvidenceItem, 'id' | 'timestamp'>) => {
    const newItem: EvidenceItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    }
    setCaseData((c) => ({ ...c, evidence: [...c.evidence, newItem] }))
  }, [])

  const updateEvidence = useCallback((id: string, updates: Partial<EvidenceItem>) => {
    setCaseData((c) => ({
      ...c,
      evidence: c.evidence.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }))
  }, [])

  const removeEvidence = useCallback((id: string) => {
    setCaseData((c) => ({
      ...c,
      evidence: c.evidence.filter((e) => e.id !== id),
    }))
  }, [])

  const resetCase = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('leonida-screen')
    const fresh = initialCase()
    setCaseData(fresh)
  }, [])

  return {
    caseData,
    updateCase,
    addEvidence,
    updateEvidence,
    removeEvidence,
    resetCase,
  }
}
