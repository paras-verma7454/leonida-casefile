import { useState, useCallback } from 'react'
import Terminal from './components/Terminal'
import CaseCreation from './components/CaseCreation'
import InvestigationView from './components/InvestigationView'
import CasefileView from './components/CasefileView'
import { useCase } from './hooks/useCase'
import type { Screen, CaseStatus } from './types'

const SCREEN_KEY = 'leonida-screen'

function loadScreen(hasCase: boolean): Screen {
  try {
    const saved = localStorage.getItem(SCREEN_KEY) as Screen | null
    if (saved && ['create', 'investigate', 'casefile'].includes(saved) && hasCase) {
      return saved
    }
  } catch {}
  return 'terminal'
}

export default function App() {
  const { caseData, updateCase, addEvidence, updateEvidence, removeEvidence, resetCase } = useCase()
  const hasCase = !!caseData.sceneImage || caseData.evidence.length > 0
  const [screen, setScreen] = useState<Screen>(() => loadScreen(hasCase))

  const navigate = useCallback(
    (to: Screen) => {
      if (to === 'terminal') resetCase()
      setScreen(to)
      try { localStorage.setItem(SCREEN_KEY, to) } catch {}
    },
    [resetCase]
  )

  const handleCaseSubmit = useCallback(
    (data: { location: string; time: string; status: CaseStatus; notes: string; sceneImage: string | null }) => {
      updateCase({
        location: data.location,
        time: data.time,
        status: data.status,
        notes: data.notes,
        sceneImage: data.sceneImage,
      })
      setScreen('investigate')
      try { localStorage.setItem(SCREEN_KEY, 'investigate') } catch {}
    },
    [updateCase]
  )

  if (screen === 'terminal') {
    return <Terminal onEnter={() => setScreen('create')} />
  }

  if (screen === 'create') {
    return (
      <CaseCreation
        caseNumber={caseData.caseNumber}
        onSubmit={handleCaseSubmit}
      />
    )
  }

  if (screen === 'investigate') {
    return (
      <InvestigationView
        caseData={caseData}
        onNavigate={navigate}
        onAddEvidence={addEvidence}
        onUpdateEvidence={updateEvidence}
        onRemoveEvidence={removeEvidence}
      />
    )
  }

  if (screen === 'casefile') {
    return (
      <CasefileView caseData={caseData} onNavigate={navigate} />
    )
  }

  return null
}
