import { Block, BlockType, BranchBlock, SpeechBlock } from '@/types/scenario'

export function createBlock(type: BlockType): Block {
  const id = `block-${Math.random().toString(36).slice(2, 7)}`
  switch (type) {
    case 'start':
      return { id, type: 'start', nextId: null }
    case 'end':
      return { id, type: 'end' }
    case 'speech':
      return { id, type: 'speech', message: '新しいセリフ', characterMood: 'normal', nextId: null }
    case 'spotlight':
      return { id, type: 'spotlight', message: '説明文', targetSelector: '#target', targetLabel: '対象要素', nextId: null }
    case 'input-spotlight':
      return { id, type: 'input-spotlight', message: '入力してください', targetId: 'input-id', targetLabel: '入力欄', nextId: null }
    case 'document-preview':
      return { id, type: 'document-preview', message: '書類を確認してください', targetId: 'input-id', targetLabel: '入力欄', documentType: 'mynumber-card', nextId: null }
    case 'validation':
      return { id, type: 'validation', message: '正しく入力してください', targetSelector: '#input-id', targetLabel: '入力欄', validationPattern: '^.+$', errorMessage: '入力が正しくありません', nextId: null }
    case 'branch':
      return { id, type: 'branch', question: 'はいですか？', yesNextId: null, noNextId: null, nextId: null }
  }
}

/** 条件分岐ブロックをドロップした際に yes/no の子ブロックを含めて3つまとめて生成する */
export function createBranchGroup(): [BranchBlock, SpeechBlock, SpeechBlock] {
  const branchId = `block-${Math.random().toString(36).slice(2, 7)}`
  const yesId    = `block-${Math.random().toString(36).slice(2, 7)}`
  const noId     = `block-${Math.random().toString(36).slice(2, 7)}`
  return [
    { id: branchId, type: 'branch',  question: 'はいですか？', yesNextId: yesId, noNextId: noId, nextId: null },
    { id: yesId,    type: 'speech',  message: 'はいの場合のセリフ',  characterMood: 'normal', nextId: null },
    { id: noId,     type: 'speech',  message: 'いいえの場合のセリフ', characterMood: 'normal', nextId: null },
  ]
}
