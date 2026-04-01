// プログレス状態を共有するモジュール。
// 上部固定バーは廃止し、吹き出し内で描画するため DOM 操作は行わない。

let _current = 0
let _total = 0

export function initProgressBar(total: number): void {
  _current = 0
  _total = total
}

export function updateProgressBar(current: number, total: number): void {
  _current = current
  _total = total
}

export function completeProgressBar(_total: number): void {
  _current = _total
}

export function removeProgressBar(): void {
  _current = 0
  _total = 0
}

export function getProgressState(): { current: number; total: number } {
  return { current: _current, total: _total }
}
