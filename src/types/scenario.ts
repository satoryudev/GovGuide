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

/** 機能1: 画面暗転＋スポットライト（入力フォーム／ボタン共用） */
export interface InputSpotlightBlock {
  id: string
  type: 'input-spotlight'
  message: string
  targetId: string
  targetLabel: string
  nextId: string | null
  targetType?: 'input' | 'button' | 'element'
  validationPattern?: string
  errorMessage?: string
  documentType?: string
  buttonLabel?: string
}

export type BranchOptionColor =
  | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green'
  | 'cyan' | 'blue' | 'indigo' | 'purple' | 'pink' | 'white'

export interface BranchOption {
  id: string
  label: string
  color: BranchOptionColor
  nextId: string | null
}

export interface BranchBlock {
  id: string
  type: 'branch'
  question: string
  options: BranchOption[]
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
  totalSteps?: number
  previewUrl?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}

/** ボタン色スタイルのマッピング（スペクトル順） */
export const BRANCH_OPTION_COLOR_CLASSES: Record<BranchOptionColor, {
  bg: string; border: string; text: string; hover: string; active: string; swatch: string; label: string
}> = {
  red:    { bg: 'bg-red-50 dark:bg-red-900/20',       border: 'border-red-200 dark:border-red-700',       text: 'text-red-500 dark:text-red-400',       hover: 'hover:bg-red-100 dark:hover:bg-red-900/30',       active: 'active:bg-red-200 dark:active:bg-red-900/40',       swatch: 'bg-red-400',    label: '赤' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-700', text: 'text-orange-600 dark:text-orange-400', hover: 'hover:bg-orange-100 dark:hover:bg-orange-900/30', active: 'active:bg-orange-200 dark:active:bg-orange-900/40', swatch: 'bg-orange-400', label: 'オレンジ' },
  amber:  { bg: 'bg-amber-50 dark:bg-amber-900/20',   border: 'border-amber-200 dark:border-amber-700',   text: 'text-amber-700 dark:text-amber-400',   hover: 'hover:bg-amber-100 dark:hover:bg-amber-900/30',   active: 'active:bg-amber-200 dark:active:bg-amber-900/40',   swatch: 'bg-amber-400',  label: '茶' },
  yellow: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-700', text: 'text-yellow-600 dark:text-yellow-400', hover: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/30', active: 'active:bg-yellow-200 dark:active:bg-yellow-900/40', swatch: 'bg-yellow-400', label: '黄' },
  lime:   { bg: 'bg-lime-50 dark:bg-lime-900/20',     border: 'border-lime-200 dark:border-lime-700',     text: 'text-lime-600 dark:text-lime-400',     hover: 'hover:bg-lime-100 dark:hover:bg-lime-900/30',     active: 'active:bg-lime-200 dark:active:bg-lime-900/40',     swatch: 'bg-lime-400',   label: '黄緑' },
  green:  { bg: 'bg-green-50 dark:bg-green-900/20',   border: 'border-green-200 dark:border-green-700',   text: 'text-green-600 dark:text-green-400',   hover: 'hover:bg-green-100 dark:hover:bg-green-900/30',   active: 'active:bg-green-200 dark:active:bg-green-900/40',   swatch: 'bg-green-400',  label: '緑' },
  cyan:   { bg: 'bg-cyan-50 dark:bg-cyan-900/20',     border: 'border-cyan-200 dark:border-cyan-700',     text: 'text-cyan-600 dark:text-cyan-400',     hover: 'hover:bg-cyan-100 dark:hover:bg-cyan-900/30',     active: 'active:bg-cyan-200 dark:active:bg-cyan-900/40',     swatch: 'bg-cyan-400',   label: '水色' },
  blue:   { bg: 'bg-blue-50 dark:bg-blue-900/20',     border: 'border-blue-200 dark:border-blue-700',     text: 'text-blue-600 dark:text-blue-400',     hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',     active: 'active:bg-blue-200 dark:active:bg-blue-900/40',     swatch: 'bg-blue-400',   label: '青' },
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', border: 'border-indigo-200 dark:border-indigo-700', text: 'text-indigo-600 dark:text-indigo-400', hover: 'hover:bg-indigo-100 dark:hover:bg-indigo-900/30', active: 'active:bg-indigo-200 dark:active:bg-indigo-900/40', swatch: 'bg-indigo-400', label: '紺' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-700', text: 'text-purple-600 dark:text-purple-400', hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/30', active: 'active:bg-purple-200 dark:active:bg-purple-900/40', swatch: 'bg-purple-400', label: '紫' },
  pink:   { bg: 'bg-pink-50 dark:bg-pink-900/20',     border: 'border-pink-200 dark:border-pink-700',     text: 'text-pink-600 dark:text-pink-400',     hover: 'hover:bg-pink-100 dark:hover:bg-pink-900/30',     active: 'active:bg-pink-200 dark:active:bg-pink-900/40',     swatch: 'bg-pink-400',   label: 'ピンク' },
  white:  { bg: 'bg-white dark:bg-gray-700',          border: 'border-gray-200 dark:border-gray-600',     text: 'text-gray-600 dark:text-gray-300',     hover: 'hover:bg-gray-50 dark:hover:bg-gray-600',         active: 'active:bg-gray-100 dark:active:bg-gray-500',        swatch: 'bg-white border border-gray-300', label: '白' },
}
