'use client'

import { forwardRef } from 'react'

interface Props {
  isPlaying: boolean
}

const PreviewPane = forwardRef<HTMLIFrameElement, Props>(({ isPlaying }, ref) => {
  return (
    <div className="flex flex-col h-full border-l border-gray-200 bg-white min-w-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50 flex-shrink-0">
        <span className="text-sm font-semibold text-gray-600">プレビュー</span>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            isPlaying
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {isPlaying ? '▶ 実行中' : '⏸ 待機中'}
        </span>
      </div>

      {/* iframe */}
      <iframe
        ref={ref}
        src="/demo.html?preview=1"
        className="flex-1 w-full border-none"
        title="プレビュー"
      />
    </div>
  )
})

PreviewPane.displayName = 'PreviewPane'
export default PreviewPane
