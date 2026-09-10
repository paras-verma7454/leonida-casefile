import { useState, useCallback } from 'react'
import Terminal from './components/Terminal'
import CaseCreation from './components/CaseCreation'
import InvestigationView from './components/InvestigationView'
import CasefileView from './components/CasefileView'
import { useCase, SCREEN_KEY } from './hooks/useCase'
import type { Screen, CaseStatus } from './types'

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
      updateCase(data)
      navigate('investigate')
    },
    [updateCase, navigate]
  )

  if (screen === 'terminal') {
    return <div className="screen-enter"><Terminal onEnter={() => navigate('create')} /></div>
  }

  if (screen === 'create') {
    return (
      <div className="screen-enter">
        <CaseCreation
          caseNumber={caseData.caseNumber}
          onSubmit={handleCaseSubmit}
          onNavigate={navigate}
        />
      </div>
    )
  }

  if (screen === 'investigate') {
    return (
      <div className="screen-enter">
        <InvestigationView
          caseData={caseData}
          onNavigate={navigate}
          onAddEvidence={addEvidence}
          onUpdateEvidence={updateEvidence}
          onRemoveEvidence={removeEvidence}
        />
      </div>
    )
  }

  if (screen === 'casefile') {
    return (
      <div className="screen-enter">
        <CasefileView caseData={caseData} onNavigate={navigate} />
      </div>
    )
  }

  return null
}
