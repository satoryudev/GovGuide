'use client'

import { Fragment, useContext } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { BranchBlock } from '@/types/scenario'
import { useEditorStore } from '@/store/editorStore'
import { getBranchChain } from '@/lib/branchChain'
import { useBranchView } from './BranchViewContext'
import BlockItem, { TYPE_META } from './BlockItem'
import { DragOverContext } from './EditorDndProvider'

function BlockConnector() {
  return (
    <div className="flex flex-col items-center select-none pointer-events-none">
      <div className="w-px h-3 bg-gray-300" />
      <svg width="10" height="6" viewBox="0 0 10 6" className="fill-gray-300">
        <path d="M5 6L0 0h10z" />
      </svg>
      <div className="w-px h-3 bg-gray-300" />
    </div>
  )
}

function DropLine() {
  return <div className="h-0.5 mx-1 my-0.5 rounded bg-blue-400 shadow-sm" />
}

function BranchAppendDropZone() {
  const { setNodeRef } = useDroppable({ id: 'branch-canvas-end' })
  const overBlockId = useContext(DragOverContext)
  return (
    <div ref={setNodeRef} className="h-8 mt-1">
      {overBlockId === 'branch-canvas-end' && <DropLine />}
    </div>
  )
}

export default function BranchCanvas() {
  const { branchView, setBranchView } = useBranchView()
  const { scenario } = useEditorStore()
  const { setNodeRef } = useDroppable({ id: 'branch-canvas-container' })
  const overBlockId = useContext(DragOverContext)

  if (!branchView || !scenario) return null

  const branch = scenario.blocks.find((b) => b.id === branchView.branchId) as BranchBlock | undefined
  if (!branch) return null

  const startId = branchView.side === 'yes' ? branch.yesNextId : branch.noNextId
  const chainBlocks = getBranchChain(scenario.blocks, startId)
  const label = branchView.side === 'yes' ? 'はい' : 'いいえ'

  // 合流先ブロック（branch.nextId）の情報を取得
  const mergeTargetBlock = branch.nextId
    ? scenario.blocks.find((b) => b.id === branch.nextId) ?? null
    : null
  const mergeTargetMeta = mergeTargetBlock ? TYPE_META[mergeTargetBlock.type] : null

  const isEmpty = chainBlocks.length === 0
    && overBlockId !== 'branch-canvas-end'
    && overBlockId !== 'branch-canvas-container'

  return (
    <div className="flex flex-col flex-1 min-w-[320px] overflow-hidden">
      {/* Branch canvas header */}
      <div className="flex items-center gap-3 px-4 py-2 bg-white border-b border-gray-200 flex-shrink-0">
        <button
          onClick={() => setBranchView(null)}
          className="text-gray-500 hover:text-gray-800 transition-colors text-base font-medium leading-none"
          title="メインキャンバスに戻る"
        >
          ←
        </button>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
          branchView.side === 'yes'
            ? 'bg-green-50 border-green-200 text-green-600'
            : 'bg-red-50 border-red-200 text-red-500'
        }`}>
          {branchView.side === 'yes' ? '✓' : '✗'} {label}
        </span>
        <span className="text-[10px] text-gray-400 ml-1">この分岐のみの処理</span>
      </div>

      {/* Branch blocks */}
      <div
        id="branch-editor-canvas"
        ref={setNodeRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col"
      >
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-24 text-gray-400 text-xs select-none border-2 border-dashed border-gray-200 rounded-lg">
            <p>この分岐でのみ実行するブロックを</p>
            <p>ここにドラッグして追加</p>
          </div>
        ) : (
          <SortableContext items={chainBlocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col">
              {chainBlocks.map((block, i) => (
                <Fragment key={block.id}>
                  {overBlockId === block.id && <DropLine />}
                  <BlockItem block={block} index={i} />
                  {i < chainBlocks.length - 1 && <BlockConnector />}
                </Fragment>
              ))}
              <BranchAppendDropZone />
            </div>
          </SortableContext>
        )}

        {/* ── 合流フッター ── */}
        <div className="mt-2 select-none pointer-events-none flex flex-col items-center">
          <div className="w-px h-4 bg-gray-300" />
          <svg width="10" height="6" viewBox="0 0 10 6" className="fill-gray-300">
            <path d="M5 6L0 0h10z" />
          </svg>
          <div className="mt-1 px-3 py-1.5 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-center">
            <p className="text-[10px] font-semibold text-gray-400">分岐ここまで・合流</p>
            {mergeTargetBlock && mergeTargetMeta ? (
              <p className="text-[10px] text-gray-400 mt-0.5">
                {mergeTargetMeta.emoji} 次: {mergeTargetMeta.label}
              </p>
            ) : (
              <p className="text-[10px] text-gray-400 mt-0.5">← 戻って共通処理を追加</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
