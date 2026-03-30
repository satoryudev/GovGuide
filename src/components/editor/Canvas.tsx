'use client'

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
import { useEditorStore } from '@/store/editorStore'
import BlockItem from './BlockItem'

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
    <div className="flex-1 min-w-0 overflow-y-auto p-4">
      {scenario.blocks.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center text-gray-400">
          <div className="text-4xl mb-3">📦</div>
          <p className="font-medium">ブロックをここに追加</p>
          <p className="text-sm mt-1">左パレットのブロックをクリックして追加できます</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={scenario.blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {scenario.blocks.map((block, i) => (
                <BlockItem key={block.id} block={block} index={i} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
