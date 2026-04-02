export type BlockType = 'start' | 'end' | 'speech' | 'spotlight' | 'input-spotlight' | 'branch'

export interface StartBlock {
  id: string
  type: 'start'
  message?: string
  characterMood?: 'normal' | 'happy' | 'thinking'
  nextId: string | null
}

export interface EndBlock {
  id: string
  type: 'end'
  message?: string
  characterMood?: 'normal' | 'happy' | 'thinking'
}

export interface SpeechBlock {
  id: string
  type: 'speech'
  message: string
  characterMood?: 'normal' | 'happy' | 'thinking'
  nextId: string | null
}

export interface SpotlightBlock {
  id: string
  type: 'spotlight'
  message: string
  targetSelector: string
  targetLabel: string
  nextId: string | null
}

/** 機能1: 画面暗転＋スポットライト（入力フォーム特化） */
export interface InputSpotlightBlock {
  id: string
  type: 'input-spotlight'
  message: string
  targetId: string
  targetLabel: string
  nextId: string | null
  /** バリデーション設定（省略時はバリデーションなし） */
  validationPattern?: string
  errorMessage?: string
  /** 書類プレビュー設定（省略時はプレビューなし） */
  documentType?: string
  buttonLabel?: string
}

export interface BranchBlock {
  id: string
  type: 'branch'
  question: string
  yesNextId: string | null
  noNextId: string | null
  /** 分岐後の合流先（どちらのパスも終わったら進むメインフローのブロック） */
  nextId: string | null
}

export type Block =
  | StartBlock
  | EndBlock
  | SpeechBlock
  | SpotlightBlock
  | InputSpotlightBlock
  | BranchBlock

export interface Scenario {
  id: string
  title: string
  category: 'moving' | 'mynumber' | 'tax' | 'childcare'
  blocks: Block[]
  startBlockId: string | null
  /** 機能4: プログレスバー用の総ステップ数。省略時はブロック数から自動算出 */
  totalSteps?: number
  /** プレビューで読み込む対象HTMLのURL。省略時は /demo.html */
  previewUrl?: string
  /** JSONエクスポート時にセット（完了状態の判定に使用） */
  completedAt?: string
  createdAt: string
  updatedAt: string
}
