import { getProgressState } from './progressBar'

const BUBBLE_ID = 'tq-bubble'

function getMoodEmoji(mood?: 'normal' | 'happy' | 'thinking'): string {
  if (mood === 'happy') return '😊'
  if (mood === 'thinking') return '🤔'
  return '😐'
}

function getCharacterSvg(mood?: 'normal' | 'happy' | 'thinking'): string {
  const emoji = getMoodEmoji(mood)
  return `
    <div style="
      width:56px;height:56px;border-radius:50%;
      background:linear-gradient(135deg,#3b82f6,#1d4ed8);
      display:flex;align-items:center;justify-content:center;
      font-size:28px;flex-shrink:0;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    ">${emoji}</div>
  `
}

/** 吹き出し内に埋め込む小型プログレスバー要素を生成する */
function createProgressBar(current: number, total: number): HTMLElement {
  const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0

  const wrapper = document.createElement('div')
  wrapper.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:10px;'

  const track = document.createElement('div')
  track.style.cssText = `
    flex:1;height:4px;background:#f3f4f6;border-radius:9999px;overflow:hidden;
  `

  const fill = document.createElement('div')
  fill.style.cssText = `
    height:100%;width:${pct}%;background:#f97316;border-radius:9999px;
    transition:width 0.4s ease;
  `

  const label = document.createElement('span')
  label.style.cssText = 'font-size:11px;color:#9ca3af;white-space:nowrap;flex-shrink:0;'
  label.textContent = `${current} / ${total}`

  track.appendChild(fill)
  wrapper.appendChild(track)
  wrapper.appendChild(label)
  return wrapper
}

export function showBubble(
  message: string,
  onNext: () => void,
  mood?: 'normal' | 'happy' | 'thinking',
  hideNext = false
): void {
  removeBubble()

  const { current, total } = getProgressState()

  const el = document.createElement('div')
  el.id = BUBBLE_ID
  el.style.cssText = `
    position:fixed;bottom:24px;left:24px;
    display:flex;align-items:flex-end;gap:12px;
    z-index:100000;max-width:420px;
    animation:tq-slide-in 0.3s ease;
  `

  const textEl = document.createElement('div')
  textEl.style.cssText = `
    background:white;border-radius:16px 16px 16px 4px;
    padding:14px 16px;
    box-shadow:0 4px 20px rgba(0,0,0,0.15);
    flex:1;position:relative;
  `

  // プログレスバー（totalSteps が設定されている場合のみ表示）
  if (total > 0) {
    textEl.appendChild(createProgressBar(current, total))
  }

  const msgEl = document.createElement('p')
  msgEl.style.cssText = `
    margin:0 0 10px;font-size:14px;line-height:1.6;
    color:#1f2937;min-height:20px;
  `

  // typewriter effect
  let i = 0
  const type = () => {
    if (i < message.length) {
      msgEl.textContent += message[i++]
      setTimeout(type, 16)
    }
  }
  type()

  if (!hideNext) {
    const btn = document.createElement('button')
    btn.textContent = '次へ →'
    btn.style.cssText = `
      background:#3b82f6;color:white;border:none;
      padding:6px 16px;border-radius:8px;font-size:13px;
      cursor:pointer;font-weight:600;
      transition:background 0.15s;
    `
    btn.onmouseover = () => { btn.style.background = '#2563eb' }
    btn.onmouseout = () => { btn.style.background = '#3b82f6' }
    btn.onclick = () => { removeBubble(); onNext() }
    textEl.appendChild(msgEl)
    textEl.appendChild(btn)
  } else {
    textEl.appendChild(msgEl)
  }

  el.innerHTML = getCharacterSvg(mood)
  el.appendChild(textEl)
  document.body.appendChild(el)

  // inject animation if not present
  if (!document.getElementById('tq-styles')) {
    const style = document.createElement('style')
    style.id = 'tq-styles'
    style.textContent = `
      @keyframes tq-slide-in {
        from { opacity:0; transform:translateY(20px); }
        to { opacity:1; transform:translateY(0); }
      }
      @keyframes tq-pulse-ring {
        0% { transform:scale(1); opacity:0.8; }
        100% { transform:scale(1.5); opacity:0; }
      }
    `
    document.head.appendChild(style)
  }
}

export function showBranchBubble(
  question: string,
  onYes: () => void,
  onNo: () => void
): void {
  removeBubble()

  const { current, total } = getProgressState()

  const el = document.createElement('div')
  el.id = BUBBLE_ID
  el.style.cssText = `
    position:fixed;bottom:24px;left:24px;
    display:flex;align-items:flex-end;gap:12px;
    z-index:100000;max-width:420px;
    animation:tq-slide-in 0.3s ease;
  `

  const textEl = document.createElement('div')
  textEl.style.cssText = `
    background:white;border-radius:16px 16px 16px 4px;
    padding:14px 16px;
    box-shadow:0 4px 20px rgba(0,0,0,0.15);
    flex:1;
  `

  // プログレスバー
  if (total > 0) {
    textEl.appendChild(createProgressBar(current, total))
  }

  const msgEl = document.createElement('p')
  msgEl.style.cssText = `
    margin:0 0 12px;font-size:14px;line-height:1.6;color:#1f2937;font-weight:600;
  `

  let i = 0
  const type = () => {
    if (i < question.length) {
      msgEl.textContent += question[i++]
      setTimeout(type, 16)
    }
  }
  type()

  const btnRow = document.createElement('div')
  btnRow.style.cssText = 'display:flex;gap:8px;'

  const yesBtn = document.createElement('button')
  yesBtn.textContent = 'はい ✓'
  yesBtn.style.cssText = `
    background:#22c55e;color:white;border:none;
    padding:6px 18px;border-radius:8px;font-size:13px;
    cursor:pointer;font-weight:600;flex:1;
    transition:background 0.15s;
  `
  yesBtn.onclick = () => { removeBubble(); onYes() }

  const noBtn = document.createElement('button')
  noBtn.textContent = 'いいえ ✗'
  noBtn.style.cssText = `
    background:#ef4444;color:white;border:none;
    padding:6px 18px;border-radius:8px;font-size:13px;
    cursor:pointer;font-weight:600;flex:1;
    transition:background 0.15s;
  `
  noBtn.onclick = () => { removeBubble(); onNo() }

  btnRow.appendChild(yesBtn)
  btnRow.appendChild(noBtn)
  textEl.appendChild(msgEl)
  textEl.appendChild(btnRow)

  el.innerHTML = getCharacterSvg('thinking')
  el.appendChild(textEl)
  document.body.appendChild(el)
}

export function removeBubble(): void {
  document.getElementById(BUBBLE_ID)?.remove()
}
