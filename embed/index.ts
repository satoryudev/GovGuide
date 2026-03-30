import { Scenario } from './types'
import { ScenarioEngine } from './engine'

let engine: ScenarioEngine | null = null

const TetsuzukiQuest = {
  async start(jsonPath: string): Promise<void> {
    try {
      const res = await fetch(jsonPath)
      if (!res.ok) throw new Error(`Failed to fetch scenario: ${res.status}`)
      const scenario: Scenario = await res.json()
      TetsuzukiQuest.startWithScenario(scenario)
    } catch (err) {
      console.error('[TetsuzukiQuest] Failed to load scenario:', err)
    }
  },

  startWithScenario(scenario: Scenario): void {
    if (engine) {
      engine.destroy()
    }
    engine = new ScenarioEngine(scenario)
    engine.start()
  },

  stop(): void {
    if (engine) {
      engine.destroy()
      engine = null
    }
  },
}

// Listen for postMessage from editor PreviewPane
window.addEventListener('message', (event) => {
  if (event.data?.type === 'TETSUZUKI_QUEST_START') {
    TetsuzukiQuest.startWithScenario(event.data.scenario as Scenario)
  }
  if (event.data?.type === 'TETSUZUKI_QUEST_STOP') {
    TetsuzukiQuest.stop()
  }
})

export default TetsuzukiQuest
