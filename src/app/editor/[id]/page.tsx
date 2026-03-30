'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useEditorStore } from '@/store/editorStore'
import { loadScenario } from '@/lib/scenarioStorage'
import BlockPalette from '@/components/editor/BlockPalette'
import Canvas from '@/components/editor/Canvas'
import BlockEditor from '@/components/editor/BlockEditor'
import PreviewPane from '@/components/editor/PreviewPane'
import PreviewToolbar from '@/components/editor/PreviewToolbar'

export default function EditorPage() {
  const params = useParams()
  const id = params.id as string
  const { scenario, setScenario, updateScenarioMeta } = useEditorStore()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [titleEditing, setTitleEditing] = useState(false)

  useEffect(() => {
    const s = loadScenario(id)
    if (s) setScenario(s)
  }, [id, setScenario])

  if (!scenario) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        シナリオが見つかりません。
      </div>
    )
  }

  const handlePlay = () => {
    const iframe = iframeRef.current
    if (!iframe) return
    // Reload iframe first to reset state
    iframe.src = '/demo.html?preview=1'
    iframe.onload = () => {
      iframe.onload = null
      iframe.contentWindow?.postMessage(
        { type: 'TETSUZUKI_QUEST_START', scenario },
        '*'
      )
      setIsPlaying(true)
    }
  }

  const handleStop = () => {
    const iframe = iframeRef.current
    if (!iframe) return
    iframe.src = '/demo.html?preview=1'
    setIsPlaying(false)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top header */}
      <header className="flex items-center gap-3 px-4 py-2 bg-white border-b border-gray-200 flex-shrink-0">
        <Link href="/" className="text-gray-400 hover:text-gray-700 transition-colors text-sm">
          ← 一覧
        </Link>
        <span className="text-gray-300">|</span>
        {titleEditing ? (
          <input
            autoFocus
            className="font-semibold text-sm border border-blue-400 rounded px-2 py-0.5"
            value={scenario.title}
            onChange={(e) => updateScenarioMeta({ title: e.target.value })}
            onBlur={() => setTitleEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setTitleEditing(false)}
          />
        ) : (
          <button
            onClick={() => setTitleEditing(true)}
            className="font-semibold text-sm text-gray-800 hover:text-blue-600 transition-colors"
          >
            {scenario.title}
          </button>
        )}
        <div className="ml-2">
          <select
            className="text-xs border border-gray-200 rounded px-2 py-1 bg-white text-gray-600"
            value={scenario.category}
            onChange={(e) =>
              updateScenarioMeta({ category: e.target.value as typeof scenario.category })
            }
          >
            <option value="moving">引越し・転居</option>
            <option value="mynumber">マイナンバー</option>
            <option value="tax">確定申告</option>
            <option value="childcare">育児・出産</option>
          </select>
        </div>
      </header>

      {/* 4-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Block Palette */}
        <BlockPalette />

        {/* Center-left: Canvas + Toolbar */}
        <div className="flex flex-col flex-1 min-w-[320px] overflow-hidden border-r border-gray-200">
          <PreviewToolbar isPlaying={isPlaying} onPlay={handlePlay} onStop={handleStop} />
          <Canvas />
        </div>

        {/* Center-right: Preview */}
        <PreviewPane ref={iframeRef} isPlaying={isPlaying} />

        {/* Right: Block Editor */}
        <BlockEditor />
      </div>
    </div>
  )
}
