'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Block } from '@/types/scenario'
import { useEditorStore } from '@/store/editorStore'

const TYPE_META: Record<Block['type'], { label: string; color: string; emoji: string }> = {
  speech: { label: '吹き出し', color: 'border-l-blue-400 bg-blue-50', emoji: '💬' },
  spotlight: { label: 'スポットライト', color: 'border-l-amber-400 bg-amber-50', emoji: '🔦' },
  'input-spotlight': { label: '入力スポットライト', color: 'border-l-indigo-400 bg-indigo-50', emoji: '✏️' },
  'document-preview': { label: '書類プレビュー', color: 'border-l-teal-400 bg-teal-50', emoji: '📄' },
  validation: { label: 'バリデーション', color: 'border-l-rose-400 bg-rose-50', emoji: '✅' },
  branch: { label: '条件分岐', color: 'border-l-red-400 bg-red-50', emoji: '🔀' },
}

function getBlockSummary(block: Block): string {
  switch (block.type) {
    case 'speech': return block.message.slice(0, 40) + (block.message.length > 40 ? '…' : '')
    case 'spotlight': return `${block.targetLabel} → ${block.message.slice(0, 30)}`
    case 'input-spotlight': return `${block.targetLabel} → ${block.message.slice(0, 30)}`
    case 'document-preview': return `${block.targetLabel} → ${block.message.slice(0, 30)}`
    case 'validation': return `${block.targetLabel} (${block.validationPattern})`
    case 'branch': return block.question.slice(0, 40)
  }
}

interface Props {
  block: Block
  index: number
}

export default function BlockItem({ block, index }: Props) {
  const meta = TYPE_META[block.type]
  const { selectedBlockId, setSelectedBlockId, removeBlock } = useEditorStore()
  const isSelected = selectedBlockId === block.id

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => setSelectedBlockId(block.id)}
      className={`
        flex items-start gap-2 p-3 rounded-lg border-l-4 cursor-pointer
        ${meta.color}
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : 'hover:brightness-95'}
        transition-all
      `}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="mt-0.5 text-gray-400 cursor-grab active:cursor-grabbing select-none"
        onClick={(e) => e.stopPropagation()}
      >
        ⠿
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-xs">{meta.emoji}</span>
          <span className="text-xs font-semibold text-gray-600">{meta.label}</span>
          <span className="text-xs text-gray-400 ml-auto">#{index + 1}</span>
        </div>
        <p className="text-xs text-gray-700 truncate">{getBlockSummary(block)}</p>
        <p className="text-xs text-gray-400 font-mono mt-0.5">{block.id}</p>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); removeBlock(block.id) }}
        className="text-gray-300 hover:text-red-500 transition-colors text-lg leading-none flex-shrink-0"
        title="削除"
      >
        ×
      </button>
    </div>
  )
}
