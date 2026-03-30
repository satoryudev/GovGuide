const OVERLAY_ID = 'tq-overlay'
const RING_ID = 'tq-ring'

export function showOverlay(): void {
  removeOverlay()
  const el = document.createElement('div')
  el.id = OVERLAY_ID
  el.style.cssText = `
    position:fixed;inset:0;
    background:rgba(0,0,0,0.75);
    z-index:99998;
    pointer-events:all;
  `
  document.body.appendChild(el)
}

export function showSpotlightOverlay(selector: string, onTargetClick: () => void): void {
  removeOverlay()

  const target = document.querySelector(selector) as HTMLElement | null
  if (!target) {
    showOverlay()
    return
  }

  const rect = target.getBoundingClientRect()
  const pad = 8
  const x1 = rect.left - pad
  const y1 = rect.top - pad
  const x2 = rect.right + pad
  const y2 = rect.bottom + pad

  const el = document.createElement('div')
  el.id = OVERLAY_ID
  el.style.cssText = `
    position:fixed;inset:0;
    background:rgba(0,0,0,0.75);
    z-index:99998;
    pointer-events:all;
    clip-path: polygon(
      evenodd,
      0% 0%, 100% 0%, 100% 100%, 0% 100%,
      ${x1}px ${y1}px, ${x1}px ${y2}px, ${x2}px ${y2}px, ${x2}px ${y1}px
    );
  `

  // fallback: use SVG mask approach
  el.style.clipPath = ''
  el.style.background = 'transparent'

  // Build SVG overlay
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('width', '100%')
  svg.setAttribute('height', '100%')
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;'

  const defs = document.createElementNS(svgNS, 'defs')
  const mask = document.createElementNS(svgNS, 'mask')
  mask.id = 'tq-spotlight-mask'

  const fullRect = document.createElementNS(svgNS, 'rect')
  fullRect.setAttribute('x', '0')
  fullRect.setAttribute('y', '0')
  fullRect.setAttribute('width', '100%')
  fullRect.setAttribute('height', '100%')
  fullRect.setAttribute('fill', 'white')

  const hole = document.createElementNS(svgNS, 'rect')
  hole.setAttribute('x', String(x1))
  hole.setAttribute('y', String(y1))
  hole.setAttribute('width', String(x2 - x1))
  hole.setAttribute('height', String(y2 - y1))
  hole.setAttribute('rx', '4')
  hole.setAttribute('fill', 'black')

  mask.appendChild(fullRect)
  mask.appendChild(hole)
  defs.appendChild(mask)
  svg.appendChild(defs)

  const darken = document.createElementNS(svgNS, 'rect')
  darken.setAttribute('x', '0')
  darken.setAttribute('y', '0')
  darken.setAttribute('width', '100%')
  darken.setAttribute('height', '100%')
  darken.setAttribute('fill', 'rgba(0,0,0,0.75)')
  darken.setAttribute('mask', 'url(#tq-spotlight-mask)')
  svg.appendChild(darken)

  el.appendChild(svg)
  document.body.appendChild(el)

  // Pulse ring around target
  const ring = document.createElement('div')
  ring.id = RING_ID
  ring.style.cssText = `
    position:fixed;
    left:${x1}px;top:${y1}px;
    width:${x2 - x1}px;height:${y2 - y1}px;
    border:3px solid #fbbf24;border-radius:6px;
    z-index:99999;pointer-events:none;
    animation:tq-pulse-ring 1.2s ease-out infinite;
  `
  document.body.appendChild(ring)

  // Allow clicks on target only
  const origPointerEvents = target.style.pointerEvents
  const origPosition = target.style.position
  const origZIndex = target.style.zIndex
  target.style.pointerEvents = 'auto'
  target.style.position = target.style.position || 'relative'
  target.style.zIndex = '99999'

  const handler = () => {
    target.style.pointerEvents = origPointerEvents
    target.style.position = origPosition
    target.style.zIndex = origZIndex
    removeOverlay()
    onTargetClick()
  }
  target.addEventListener('click', handler, { once: true })
}

export function removeOverlay(): void {
  document.getElementById(OVERLAY_ID)?.remove()
  document.getElementById(RING_ID)?.remove()
}
