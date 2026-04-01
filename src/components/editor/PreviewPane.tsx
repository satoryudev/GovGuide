'use client'

import { forwardRef, useRef } from 'react'

interface Props {
  isPlaying: boolean
  previewUrl?: string
  localBlobUrl?: string | null
  localFileName?: string | null
  onFileSelect: (file: File) => void
  onCollapse: () => void
  onPlay: () => void
  onStop: () => void
}

const DEFAULT_PREVIEW = '/demo.html'

const PreviewPane = forwardRef<HTMLIFrameElement, Props>(
  ({ isPlaying, previewUrl, localBlobUrl, localFileName, onFileSelect, onCollapse, onPlay, onStop }, ref) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const base = previewUrl?.trim() || DEFAULT_PREVIEW
    const src = localBlobUrl ?? (base.includes('?') ? `${base}&preview=1` : `${base}?preview=1`)
    const displayName = localFileName ?? (base === DEFAULT_PREVIEW ? '/demo.html' : base)

    return (
      <div id="preview-pane" className="flex flex-col h-full w-full bg-white">
        {/* 隠しファイル入力 */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".html,.htm"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onFileSelect(file)
            e.target.value = ''
          }}
        />

        {/* 1段ヘッダー */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-slate-200/70 flex-shrink-0">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex-shrink-0">
            プレビュー
          </span>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs px-2 py-0.5 rounded border border-gray-300 text-gray-600
              hover:bg-gray-100 transition-colors flex-shrink-0"
            title="ローカルHTMLファイルをプレビューで開く"
          >
            📁 開く
          </button>

          <span
            className={`text-xs truncate flex-1 min-w-0 ${localFileName ? 'text-blue-600 font-medium' : 'text-gray-400'}`}
            title={displayName}
          >
            {displayName}
          </span>

          <button
            onClick={onPlay}
            disabled={isPlaying}
            className="text-xs px-2.5 py-0.5 rounded font-semibold bg-green-500 text-white
              hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            ▶ 実行
          </button>
          <button
            onClick={onStop}
            disabled={!isPlaying}
            className="text-xs px-2.5 py-0.5 rounded font-semibold bg-gray-400 text-white
              hover:bg-gray-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            ■ 停止
          </button>

          <button
            onClick={onCollapse}
            className="ml-1 text-slate-400 hover:text-slate-700 transition-colors w-5 h-5
              flex items-center justify-center rounded hover:bg-slate-200 text-xs font-bold flex-shrink-0"
            title="最小化"
          >
            ×
          </button>
        </div>

        <iframe ref={ref} src={src} className="flex-1 w-full border-none" title="プレビュー" />
      </div>
    )
  }
)

PreviewPane.displayName = 'PreviewPane'
export default PreviewPane
