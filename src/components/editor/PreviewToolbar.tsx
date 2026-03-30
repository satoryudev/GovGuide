'use client'

import { useEditorStore } from '@/store/editorStore'
import { Block, Scenario } from '@/types/scenario'

const TYPE_EMOJI: Record<Block['type'], string> = {
  speech: '💬', spotlight: '🔦', 'input-spotlight': '✏️',
  'document-preview': '📄', validation: '✅', branch: '🔀',
}
function blockLabel(b: Block): string {
  const e = TYPE_EMOJI[b.type]
  switch (b.type) {
    case 'speech': return `${e} ${b.message.slice(0, 20)}`
    case 'branch': return `${e} ${b.question.slice(0, 20)}`
    default: return `${e} ${(b as { targetLabel: string }).targetLabel}`
  }
}

interface Props {
  isPlaying: boolean
  onPlay: () => void
  onStop: () => void
}

export default function PreviewToolbar({ isPlaying, onPlay, onStop }: Props) {
  const { scenario, updateScenarioMeta } = useEditorStore()

  const handleExport = () => {
    if (!scenario) return
    const json = JSON.stringify(scenario, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${scenario.id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-gray-200 flex-shrink-0">
      {/* Left: meta controls */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {/* Start block selector */}
        <div className="flex items-center gap-1">
          <label className="text-xs text-gray-500 whitespace-nowrap">開始ブロック:</label>
          <select
            className="text-xs border border-gray-200 rounded px-1.5 py-1 bg-white max-w-[140px]"
            value={scenario?.startBlockId ?? ''}
            onChange={(e) => updateScenarioMeta({ startBlockId: e.target.value || null })}
          >
            <option value="">（未設定）</option>
            {scenario?.blocks.map((b) => (
              <option key={b.id} value={b.id}>
                {blockLabel(b)}
              </option>
            ))}
          </select>
        </div>

        {/* Total steps */}
        <div className="flex items-center gap-1">
          <label className="text-xs text-gray-500 whitespace-nowrap">総ステップ:</label>
          <input
            type="number"
            min={1}
            className="text-xs border border-gray-200 rounded px-1.5 py-1 w-16 bg-white"
            placeholder={String(scenario?.blocks.length ?? 0)}
            value={scenario?.totalSteps ?? ''}
            onChange={(e) =>
              updateScenarioMeta({
                totalSteps: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
          />
        </div>

        {/* Export */}
        <button
          onClick={handleExport}
          className="text-xs px-3 py-1.5 rounded border border-gray-300 text-gray-600
            hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          JSON 書き出し
        </button>
      </div>

      {/* Right: play/stop */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onPlay}
          disabled={isPlaying}
          className="text-sm px-4 py-1.5 rounded-lg font-semibold
            bg-green-500 text-white hover:bg-green-600 transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ▶ 実行
        </button>
        <button
          onClick={onStop}
          disabled={!isPlaying}
          className="text-sm px-4 py-1.5 rounded-lg font-semibold
            bg-gray-500 text-white hover:bg-gray-600 transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ■ 停止
        </button>
      </div>
    </div>
  )
}
