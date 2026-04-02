import { InputSpotlightBlock } from './types'
import { showBubble, removeBubble } from './bubble'
import { appendSvgMaskOverlay, lockScroll, unlockScroll } from './overlay'
import { showModal } from './documentPreview'

const OVERLAY_ID = 'tq-input-overlay'
const ERROR_TOOLTIP_ID = 'tq-input-error-tooltip'

export function handleInputSpotlight(
  block: InputSpotlightBlock,
  onNext: () => void
): void {
  removeInputOverlay()

  const target = document.getElementById(block.targetId) as HTMLInputElement | null
  if (!target) {
    showBubble(block.message, onNext)
    return
  }

  target.scrollIntoView({ block: 'center', inline: 'nearest' })
  lockScroll()

  const drawInputOverlay = () => {
    document.getElementById(OVERLAY_ID)?.remove()
    const r = target.getBoundingClientRect()
    const pad = 12
    const x1 = r.left - pad
    const y1 = r.top - pad
    const x2 = r.right + pad
    const y2 = r.bottom + pad
    const el = document.createElement('div')
    el.id = OVERLAY_ID
    el.style.cssText = 'position:fixed;inset:0;background:transparent;z-index:99998;pointer-events:none;'
    appendSvgMaskOverlay(el, x1, y1, x2, y2, 'tq-input-mask', false)
    document.body.appendChild(el)
  }

  drawInputOverlay()
  window.addEventListener('resize', drawInputOverlay)

  // Allow input
  const origPointerEvents = target.style.pointerEvents
  const origZIndex = target.style.zIndex
  const origOutline = target.style.outline
  const origBoxShadow = target.style.boxShadow
  target.style.pointerEvents = 'auto'
  target.style.zIndex = '99999'
  target.style.position = target.style.position || 'relative'
  target.focus()

  const previewAction = block.documentType
    ? {
        label: `🔍 ${block.buttonLabel ?? '見本を確認'}`,
        onClick: () => showModal({
          id: block.id, type: 'document-preview' as const,
          message: '', targetId: block.targetId, targetLabel: block.targetLabel,
          documentType: block.documentType!, buttonLabel: block.buttonLabel,
          nextId: block.nextId,
        }),
      }
    : undefined

  showBubble(block.message, () => {}, undefined, true, previewAction)

  const regex = block.validationPattern ? new RegExp(block.validationPattern) : null

  let tooltipResizeHandler: (() => void) | null = null

  const removeErrorTooltip = () => {
    if (tooltipResizeHandler) {
      window.removeEventListener('resize', tooltipResizeHandler)
      tooltipResizeHandler = null
    }
    document.getElementById(ERROR_TOOLTIP_ID)?.remove()
  }

  const showErrorTooltip = (message: string) => {
    removeErrorTooltip()
    const tooltip = document.createElement('div')
    tooltip.id = ERROR_TOOLTIP_ID
    tooltip.textContent = message
    tooltip.style.cssText = `
      position:fixed;
      background:white;color:#ef4444;
      border:1.5px solid #ef4444;border-radius:6px;
      padding:6px 10px;font-size:12px;font-weight:600;
      white-space:nowrap;
      box-shadow:0 2px 8px rgba(239,68,68,0.2);
      z-index:100001;pointer-events:none;
    `
    const updatePos = () => {
      const r = target.getBoundingClientRect()
      tooltip.style.left = `${r.left}px`
      tooltip.style.top = `${r.bottom + 8}px`
    }
    updatePos()
    document.body.appendChild(tooltip)
    tooltipResizeHandler = updatePos
    window.addEventListener('resize', tooltipResizeHandler)
  }

  const cleanup = () => {
    window.removeEventListener('resize', drawInputOverlay)
    target.removeEventListener('keydown', handleKeydown)
    target.style.pointerEvents = origPointerEvents
    target.style.zIndex = origZIndex
    target.style.outline = origOutline
    target.style.boxShadow = origBoxShadow
    removeErrorTooltip()
    removeInputOverlay()
    removeBubble()
    unlockScroll()
  }

  let advancing = false

  const tryAdvance = () => {
    if (advancing) return
    const value = target.value.trim()

    if (regex) {
      if (!value) {
        target.style.outline = '2px solid #ef4444'
        target.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.2)'
        showErrorTooltip('入力してから次へ進んでください')
        removeBubble()
        showBubble('入力してから次へ進んでください。', () => {}, 'thinking', true, previewAction)
        target.focus()
        target.addEventListener('blur', handleBlur, { once: true })
        return
      }

      if (!regex.test(value)) {
        target.style.outline = '2px solid #ef4444'
        target.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.2)'
        showErrorTooltip(block.errorMessage || '入力内容が正しくありません')
        removeBubble()
        showBubble(block.errorMessage || '入力内容が正しくありません。もう一度確認してください。', () => {}, 'thinking', true, previewAction)
        target.focus()
        target.addEventListener('blur', handleBlur, { once: true })
        return
      }
    }

    advancing = true
    target.removeEventListener('keydown', handleKeydown)
    target.style.outline = '2px solid #22c55e'
    target.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.2)'
    removeErrorTooltip()
    setTimeout(() => {
      cleanup()
      onNext()
    }, 400)
  }

  const handleBlur = () => tryAdvance()

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      tryAdvance()
    }
  }

  target.addEventListener('blur', handleBlur, { once: true })
  target.addEventListener('keydown', handleKeydown)
}

export function removeInputOverlay(): void {
  document.getElementById(OVERLAY_ID)?.remove()
  document.getElementById(ERROR_TOOLTIP_ID)?.remove()
  unlockScroll()
}
