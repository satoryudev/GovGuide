import { Block, BranchBlock } from '@/types/scenario'

/** branch.nextId（合流先）の ID セットを収集する */
function getMergeTargetIds(blocks: Block[]): Set<string> {
  const ids = new Set<string>()
  for (const b of blocks) {
    if (b.type === 'branch' && b.nextId) ids.add(b.nextId)
  }
  return ids
}

/**
 * startId から nextId チェーンを辿って Block の配列を返す。
 * branch.nextId（合流先）に達したら停止し、合流先自体はリストに含めない。
 */
export function getBranchChain(blocks: Block[], startId: string | null): Block[] {
  const mergeTargetIds = getMergeTargetIds(blocks)
  const result: Block[] = []
  let currentId = startId
  const visited = new Set<string>()
  while (currentId) {
    if (visited.has(currentId)) break
    if (mergeTargetIds.has(currentId)) break  // 合流先に達したら停止
    visited.add(currentId)
    const block = blocks.find((b) => b.id === currentId)
    if (!block) break
    result.push(block)
    currentId = block.type !== 'branch' && block.type !== 'end'
      ? (block as { nextId: string | null }).nextId
      : null
  }
  return result
}

/** すべての branch の yes/no チェーンに含まれるブロック ID を返す */
export function getBranchChainIds(blocks: Block[]): Set<string> {
  const ids = new Set<string>()
  for (const b of blocks) {
    if (b.type === 'branch') {
      for (const child of getBranchChain(blocks, b.yesNextId)) ids.add(child.id)
      for (const child of getBranchChain(blocks, b.noNextId)) ids.add(child.id)
    }
  }
  return ids
}
