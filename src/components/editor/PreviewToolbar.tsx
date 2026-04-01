'use client'

import { useState, useRef } from 'react'
import { useEditorStore } from '@/store/editorStore'

// 重複注入を検知するためのマーカー
const MARKER_START = '<!-- GovGuide Tutorial Start -->'
const MARKER_END = '<!-- GovGuide Tutorial End -->'

async function fetchEmbedJs(): Promise<string> {
  const res = await fetch('/embed.js')
  return res.text()
}

function buildEmbedBlock(embedJs: string, scenarioJson: string): string {
  return [
    MARKER_START,
    '<script>',
    embedJs,
    '<\/script>',
    '<script>',
    `TetsuzukiQuest.startWithScenario(${scenarioJson});`,
    '<\/script>',
    MARKER_END,
  ].join('\n')
}

interface Props {
  onExportCallback?: () => void
}

export default function PreviewToolbar({ onExportCallback }: Props) {
  const { scenario } = useEditorStore()

  const [embedModalOpen, setEmbedModalOpen] = useState(false)
  const [embedCode, setEmbedCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)
  const fallbackFileRef = useRef<HTMLInputElement>(null)

  // ---- JSON ダウンロード ----
  const handleJsonExport = () => {
    if (!scenario) return
    const blob = new Blob([JSON.stringify(scenario, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    Object.assign(document.createElement('a'), { href: url, download: `${scenario.id}.json` }).click()
    URL.revokeObjectURL(url)
    onExportCallback?.()
  }

  // ---- 埋め込みコード モーダルを開く ----
  const handleOpenEmbedModal = async () => {
    if (!scenario) return
    const embedJs = await fetchEmbedJs()
    const json = JSON.stringify(scenario, null, 2)
    setEmbedCode(buildEmbedBlock(embedJs, json))
    setEmbedModalOpen(true)
    onExportCallback?.()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // ---- HTMLファイルへの書き出し ----
  const handleExportHtml = async () => {
    if (!scenario) return
    setExporting(true)
    try {
      const embedJs = await fetchEmbedJs()
      const json = JSON.stringify(scenario, null, 2)
      const block = buildEmbedBlock(embedJs, json)

      if (typeof window !== 'undefined' && 'showOpenFilePicker' in window) {
        // File System Access API（Chrome / Edge）
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [fileHandle] = await (window as any).showOpenFilePicker({
          types: [{ description: 'HTMLファイル', accept: { 'text/html': ['.html', '.htm'] } }],
        })
        const file = await fileHandle.getFile()
        let content: string = await file.text()

        // 既存の注入を置き換えるか、</body> 直前に追記
        const markerStartEsc = MARKER_START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const markerEndEsc = MARKER_END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const existingRegex = new RegExp(`${markerStartEsc}[\\s\\S]*?${markerEndEsc}`)
        content = existingRegex.test(content)
          ? content.replace(existingRegex, block)
          : content.replace(/<\/body>/i, `${block}\n</body>`)

        const writable = await fileHandle.createWritable()
        await writable.write(content)
        await writable.close()
        onExportCallback?.()
        alert('✅ HTMLファイルへの書き出しが完了しました。')
      } else {
        // フォールバック：ファイルを読み込んで修正版をダウンロード
        fallbackFileRef.current?.click()
      }
    } catch (e) {
      if ((e as DOMException)?.name !== 'AbortError') {
        console.error('[ExportHTML]', e)
        alert('書き出しに失敗しました。')
      }
    } finally {
      setExporting(false)
    }
  }

  // フォールバック用：ファイルを選択 → 修正版をダウンロード
  const handleFallbackFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !scenario) return
    e.target.value = ''

    const embedJs = await fetchEmbedJs()
    const json = JSON.stringify(scenario, null, 2)
    const block = buildEmbedBlock(embedJs, json)

    let content = await file.text()
    const markerStartEsc = MARKER_START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const markerEndEsc = MARKER_END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const existingRegex = new RegExp(`${markerStartEsc}[\\s\\S]*?${markerEndEsc}`)
    content = existingRegex.test(content)
      ? content.replace(existingRegex, block)
      : content.replace(/<\/body>/i, `${block}\n</body>`)

    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    Object.assign(document.createElement('a'), { href: url, download: file.name }).click()
    URL.revokeObjectURL(url)
    onExportCallback?.()
  }

  return (
    <>
      <div id="preview-toolbar" className="bg-white border-b border-gray-200 flex-shrink-0 px-3 py-1.5">
        {/* 隠しフォールバック用ファイル入力 */}
        <input
          ref={fallbackFileRef}
          type="file"
          accept=".html,.htm"
          className="hidden"
          onChange={handleFallbackFile}
        />

        {/* 1段：エクスポート操作 */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleOpenEmbedModal}
            className="text-xs px-2.5 py-1.5 rounded border border-blue-300 text-blue-600
              hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            📋 埋め込みコード
          </button>
          <button
            onClick={handleExportHtml}
            disabled={exporting}
            className="text-xs px-2.5 py-1.5 rounded border border-emerald-400 text-emerald-700
              hover:bg-emerald-50 transition-colors whitespace-nowrap disabled:opacity-50"
          >
            {exporting ? '書き出し中…' : '💾 HTMLに書き出し'}
          </button>
          <button
            onClick={handleJsonExport}
            className="text-xs px-2.5 py-1.5 rounded border border-gray-300 text-gray-600
              hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            ↓ JSON
          </button>
        </div>
      </div>

      {/* 埋め込みコード モーダル */}
      {embedModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => { if (e.target === e.currentTarget) setEmbedModalOpen(false) }}
        >
          <div className="bg-white rounded-xl shadow-2xl flex flex-col"
            style={{ width: 'min(680px, 95vw)', maxHeight: '85vh' }}
          >
            {/* ヘッダー */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 flex-shrink-0">
              <div>
                <h3 className="font-semibold text-gray-800">埋め込みコード</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  以下のコードを対象HTMLの <code className="bg-gray-100 px-1 rounded">&lt;/body&gt;</code> 直前に貼り付けてください
                </p>
              </div>
              <button
                onClick={() => setEmbedModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors text-xl leading-none ml-4"
              >
                ×
              </button>
            </div>

            {/* コード表示 */}
            <div className="flex-1 overflow-hidden p-5">
              <textarea
                readOnly
                value={embedCode}
                className="w-full h-full font-mono text-[11px] bg-gray-50 border border-gray-200
                  rounded-lg p-3 resize-none focus:outline-none text-gray-700"
                style={{ minHeight: '240px' }}
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
            </div>

            {/* フッター */}
            <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-between flex-shrink-0">
              <span className="text-xs text-gray-400">
                クリックで全選択 / コピーボタンでクリップボードにコピー
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className={`text-xs px-4 py-1.5 rounded font-semibold transition-colors ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copied ? '✓ コピー済み' : '📋 コピー'}
                </button>
                <button
                  onClick={() => setEmbedModalOpen(false)}
                  className="text-xs px-4 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
