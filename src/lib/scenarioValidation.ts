import { Block, BranchBlock, InputSpotlightBlock, SpeechBlock } from '@/types/scenario'
import { getBranchChain } from '@/lib/branchChain'

export interface ValidationIssue {
  severity: 'error' | 'warning'
  message: string
  blockId?: string
}

export function validateScenario(blocks: Block[]): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const blockIds = new Set(blocks.map((b) => b.id))

  // シナリオにEndブロックがない
  const hasEnd = blocks.some((b) => b.type === 'end')
  if (blocks.length > 0 && !hasEnd) {
    issues.push({ severity: 'error', message: '終了ブロックがありません' })
  }

  for (const block of blocks) {
    if (block.type === 'speech') {
      const b = block as SpeechBlock
      if (!b.message?.trim()) {
        issues.push({ severity: 'warning', message: 'セリフブロックのメッセージが空です', blockId: b.id })
      }
    }

    if (block.type === 'input-spotlight') {
      const b = block as InputSpotlightBlock
      if (!b.targetId?.trim()) {
        issues.push({ severity: 'warning', message: 'スポットライトブロックの対象要素が未設定です', blockId: b.id })
      }
    }

    if (block.type === 'branch') {
      const b = block as BranchBlock
      if (!b.question?.trim()) {
        issues.push({ severity: 'warning', message: '条件分岐ブロックの質問文が空です', blockId: b.id })
      }
      if (b.options.length < 2) {
        issues.push({ severity: 'error', message: '条件分岐ブロックの選択肢が1個以下です', blockId: b.id })
      } else {
        const hasEmptyLabel = b.options.some((opt) => !opt.label?.trim())
        if (hasEmptyLabel) {
          issues.push({ severity: 'warning', message: '条件分岐ブロックに空のラベルの選択肢があります', blockId: b.id })
        }
        for (const opt of b.options) {
          const label = opt.label?.trim() || '（ラベルなし）'
          if (!opt.nextId) {
            issues.push({ severity: 'warning', message: `条件分岐の選択肢「${label}」の分岐先が未設定です`, blockId: b.id })
          } else if (!blockIds.has(opt.nextId)) {
            issues.push({ severity: 'warning', message: `条件分岐の選択肢「${label}」の分岐先ブロックが存在しません`, blockId: b.id })
          } else if (getBranchChain(blocks, opt.nextId).length === 0) {
            issues.push({ severity: 'warning', message: `条件分岐の選択肢「${label}」に処理がありません`, blockId: b.id })
          }
        }
      }
    }
  }

  return issues
}
