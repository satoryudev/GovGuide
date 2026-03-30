import { create } from 'zustand'
import { Block, Scenario } from '@/types/scenario'
import { saveScenario } from '@/lib/scenarioStorage'

interface EditorState {
  scenario: Scenario | null
  selectedBlockId: string | null
  setScenario: (scenario: Scenario) => void
  setSelectedBlockId: (id: string | null) => void
  updateBlock: (block: Block) => void
  addBlock: (block: Block) => void
  removeBlock: (id: string) => void
  reorderBlocks: (blocks: Block[]) => void
  updateScenarioMeta: (meta: Partial<Pick<Scenario, 'title' | 'category' | 'totalSteps' | 'startBlockId'>>) => void
  persist: () => void
}

export const useEditorStore = create<EditorState>((set, get) => ({
  scenario: null,
  selectedBlockId: null,

  setScenario: (scenario) => set({ scenario, selectedBlockId: null }),

  setSelectedBlockId: (id) => set({ selectedBlockId: id }),

  updateBlock: (block) => {
    const { scenario } = get()
    if (!scenario) return
    const blocks = scenario.blocks.map((b) => (b.id === block.id ? block : b))
    const updated = { ...scenario, blocks, updatedAt: new Date().toISOString() }
    set({ scenario: updated })
    saveScenario(updated)
  },

  addBlock: (block) => {
    const { scenario } = get()
    if (!scenario) return
    const blocks = [...scenario.blocks, block]
    const updated = { ...scenario, blocks, updatedAt: new Date().toISOString() }
    set({ scenario: updated })
    saveScenario(updated)
  },

  removeBlock: (id) => {
    const { scenario, selectedBlockId } = get()
    if (!scenario) return
    const blocks = scenario.blocks.filter((b) => b.id !== id)
    const updated = { ...scenario, blocks, updatedAt: new Date().toISOString() }
    set({
      scenario: updated,
      selectedBlockId: selectedBlockId === id ? null : selectedBlockId,
    })
    saveScenario(updated)
  },

  reorderBlocks: (blocks) => {
    const { scenario } = get()
    if (!scenario) return
    const updated = { ...scenario, blocks, updatedAt: new Date().toISOString() }
    set({ scenario: updated })
    saveScenario(updated)
  },

  updateScenarioMeta: (meta) => {
    const { scenario } = get()
    if (!scenario) return
    const updated = { ...scenario, ...meta, updatedAt: new Date().toISOString() }
    set({ scenario: updated })
    saveScenario(updated)
  },

  persist: () => {
    const { scenario } = get()
    if (scenario) saveScenario(scenario)
  },
}))
