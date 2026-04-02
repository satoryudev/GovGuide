import { Scenario } from './types'
import { ScenarioEngine } from './engine'

let engine: ScenarioEngine | null = null

// ── Element Picker ──────────────────────────────────────────────
const PICK_HIGHLIGHT_ID = 'tq-pick-highlight'

function getCssSelector(el: Element): string {
  if (el.id) return `#${el.id}`
  const tag = el.tagName.toLowerCase()
  const parent = el.parentElement
  if (!parent) return tag
  const siblings = Array.from(parent.children).filter((c) => c.tagName === el.tagName)
  if (siblings.length === 1) return `${getCssSelector(parent)} > ${tag}`
  const idx = siblings.indexOf(el) + 1
  return `${getCssSelector(parent)} > ${tag}:nth-of-type(${idx})`
}

let pickCleanup: (() => void) | null = null

function startPickMode(): void {
  if (pickCleanup) pickCleanup()

  // highlight div
  const highlight = document.createElement('div')
  highlight.id = PICK_HIGHLIGHT_ID
  highlight.style.cssText = `
    position:fixed;pointer-events:none;z-index:999999;
    border:2px solid #f59e0b;border-radius:4px;
    background:rgba(245,158,11,0.15);transition:all 0.05s;
    display:none;
  `
  document.body.appendChild(highlight)

  // tooltip
  const tip = document.createElement('div')
  tip.style.cssText = `
    position:fixed;z-index:1000000;pointer-events:none;
    background:#1f2937;color:white;font-size:11px;font-family:monospace;
    padding:3px 8px;border-radius:4px;white-space:nowrap;display:none;
  `
  document.body.appendChild(tip)

  const onMove = (e: MouseEvent) => {
    const el = document.elementFromPoint(e.clientX, e.clientY)
    if (!el || el === highlight || el === tip) return
    const rect = el.getBoundingClientRect()
    highlight.style.display = 'block'
    highlight.style.left = `${rect.left - 2}px`
    highlight.style.top = `${rect.top - 2}px`
    highlight.style.width = `${rect.width + 4}px`
    highlight.style.height = `${rect.height + 4}px`
    const selector = getCssSelector(el)
    const idVal = el.id ?? ''
    tip.textContent = idVal ? `#${idVal}  (${el.tagName.toLowerCase()})` : selector
    tip.style.display = 'block'
    tip.style.left = `${Math.min(e.clientX + 12, window.innerWidth - 200)}px`
    tip.style.top = `${e.clientY + 16}px`
  }

  const onClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const el = document.elementFromPoint(e.clientX, e.clientY)
    if (!el || el === highlight || el === tip) return
    const selector = getCssSelector(el)
    const id = el.id ?? ''
    window.parent.postMessage({ type: 'TETSUZUKI_QUEST_ELEMENT_PICKED', selector, id }, '*')
    stopPickMode()
  }

  document.addEventListener('mousemove', onMove, true)
  document.addEventListener('click', onClick, true)
  document.body.style.cursor = 'crosshair'

  pickCleanup = () => {
    document.removeEventListener('mousemove', onMove, true)
    document.removeEventListener('click', onClick, true)
    document.body.style.cursor = ''
    highlight.remove()
    tip.remove()
    pickCleanup = null
  }
}

function stopPickMode(): void {
  if (pickCleanup) pickCleanup()
}

function showStartDialog(scenario: Scenario, onStart: () => void): void {
  const overlay = document.createElement('div')
  overlay.id = 'tq-start-dialog'
  overlay.style.cssText = `
    position:fixed;inset:0;
    background:rgba(0,0,0,0.45);
    z-index:100002;
    display:flex;align-items:center;justify-content:center;
  `
  const card = document.createElement('div')
  card.style.cssText = `
    background:white;border-radius:20px;
    padding:32px 28px;max-width:360px;width:90%;
    box-shadow:0 16px 48px rgba(0,0,0,0.22);
    text-align:center;
  `
  card.innerHTML = `
    <div style="font-size:48px;margin-bottom:12px;">🧭</div>
    <div style="font-size:17px;font-weight:700;color:#1f2937;margin-bottom:6px;">
      ${scenario.title.replace(/</g, '&lt;')}
    </div>
    <p style="font-size:13px;color:#6b7280;margin-bottom:24px;line-height:1.6;">
      このページの操作手順をガイドします。<br>チュートリアルを開始しますか？
    </p>
    <div style="display:flex;flex-direction:column;gap:10px;">
      <button id="tq-start-btn" style="
        background:#3b82f6;color:white;border:none;
        border-radius:10px;padding:12px;font-size:15px;
        font-weight:700;cursor:pointer;
      ">▶ 開始する</button>
      <button id="tq-skip-btn" style="
        background:transparent;color:#9ca3af;
        border:1.5px solid #e5e7eb;border-radius:10px;
        padding:10px;font-size:14px;cursor:pointer;
      ">スキップ</button>
    </div>
  `
  overlay.appendChild(card)
  document.body.appendChild(overlay)

  const close = () => overlay.remove()
  document.getElementById('tq-start-btn')!.onclick = () => { close(); onStart() }
  document.getElementById('tq-skip-btn')!.onclick = close
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close() })
}

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
  if (event.data?.type === 'TETSUZUKI_QUEST_PICK_START') {
    startPickMode()
  }
  if (event.data?.type === 'TETSUZUKI_QUEST_PICK_CANCEL') {
    stopPickMode()
  }
})

function startWithPrompt(scenario: Scenario): void {
  const launch = () => {
    if (engine) engine.destroy()
    engine = new ScenarioEngine(scenario)
    engine.start()
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => showStartDialog(scenario, launch), { once: true })
  } else {
    showStartDialog(scenario, launch)
  }
}

export const { start, startWithScenario, stop } = TetsuzukiQuest
export { startWithPrompt }
