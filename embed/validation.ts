import { ValidationBlock } from './types'
import { showBubble, removeBubble } from './bubble'

const ERROR_TOOLTIP_CLASS = 'tq-validation-tooltip'

export function handleValidation(
  block: ValidationBlock,
  onNext: () => void
): void {
  const target = document.querySelector(block.targetSelector) as HTMLInputElement | null
  if (!target) {
    showBubble(block.message, onNext)
    return
  }

  showBubble(block.message, () => {}, undefined, true)

  const regex = new RegExp(block.validationPattern)

  const origOutline = target.style.outline
  const origBoxShadow = target.style.boxShadow

  const removeTooltip = () => {
    document.querySelectorAll(`.${ERROR_TOOLTIP_CLASS}`).forEach((el) => el.remove())
  }

  const showErrorTooltip = () => {
    removeTooltip()
    const tooltip = document.createElement('div')
    tooltip.className = ERROR_TOOLTIP_CLASS
    tooltip.textContent = block.errorMessage
    tooltip.style.cssText = `
      position:absolute;
      background:white;color:#ef4444;
      border:1.5px solid #ef4444;border-radius:6px;
      padding:6px 10px;font-size:12px;font-weight:600;
      white-space:nowrap;
      box-shadow:0 2px 8px rgba(239,68,68,0.2);
      z-index:100001;
    `

    const rect = target.getBoundingClientRect()
    tooltip.style.left = `${rect.right + 8 + window.scrollX}px`
    tooltip.style.top = `${rect.top + window.scrollY - 2}px`
    tooltip.style.position = 'fixed'
    tooltip.style.left = `${rect.right + 8}px`
    tooltip.style.top = `${rect.top}px`

    document.body.appendChild(tooltip)
  }

  let validated = false

  const handleBlur = () => {
    const value = target.value
    removeTooltip()

    if (regex.test(value)) {
      // OK
      target.style.outline = '2px solid #22c55e'
      target.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.2)'
      removeBubble()
      validated = true
      target.removeEventListener('blur', handleBlur)
      onNext()
    } else {
      // NG
      target.style.outline = '2px solid #ef4444'
      target.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.4)'
      showErrorTooltip()

      // Re-add listener for next blur
      target.addEventListener('blur', handleBlur, { once: true })
    }
  }

  target.addEventListener('blur', handleBlur, { once: true })
}

export function removeValidation(): void {
  document.querySelectorAll(`.${ERROR_TOOLTIP_CLASS}`).forEach((el) => el.remove())
}
