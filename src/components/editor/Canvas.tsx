'use client'

import { Fragment } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { Block } from '@/types/scenario'
import { useEditorStore } from '@/store/editorStore'
import BlockItem from './BlockItem'
import EmptyStatePrompt from '@/components/onboarding/EmptyStatePrompt'

function BlockConnector({ fromBlock }: { fromBlock: Block }) {
  return (
    <div className="flex flex-col items-center select-none pointer-events-none">
      <div className="w-px h-3 bg-gray-300" />
      {fromBlock.type === 'branch' ? (
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200">
          <span className="text-[10px] text-red-400 font-medium">はい / いいえ</span>
        </div>
      ) : (
        <svg width="10" height="6" viewBox="0 0 10 6" className="fill-gray-300">
          <path d="M5 6L0 0h10z" />
        </svg>
      )}
      <div className="w-px h-3 bg-gray-300" />
    </div>
  )
}

export default function Canvas() {
  const { scenario, reorderBlocks } = useEditorStore()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  if (!scenario) return null

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const blocks = scenario.blocks
    const oldIdx = blocks.findIndex((b) => b.id === active.id)
    const newIdx = blocks.findIndex((b) => b.id === over.id)
    reorderBlocks(arrayMove(blocks, oldIdx, newIdx))
  }

  return (
    <div id="editor-canvas" className="flex-1 min-w-0 overflow-y-auto p-4">
      {scenario.blocks.length === 0 ? (
        <EmptyStatePrompt />
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={scenario.blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col">
              {scenario.blocks.map((block, i) => (
                <Fragment key={block.id}>
                  <BlockItem block={block} index={i} />
                  {i < scenario.blocks.length - 1 && (
                    <BlockConnector fromBlock={block} />
                  )}
                </Fragment>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
