'use client'

import Link from 'next/link'
import { Scenario } from '@/types/scenario'
import { getScenarioStatus, ScenarioStatus } from '@/lib/scenarioUtils'

const CATEGORY_ICON: Record<Scenario['category'], string> = {
  moving: '🏠',
  mynumber: '🪪',
  tax: '💴',
  childcare: '👶',
}

const CATEGORY_LABEL: Record<Scenario['category'], string> = {
  moving: '引越し・転居',
  mynumber: 'マイナンバー',
  tax: '確定申告',
  childcare: '育児・出産',
}

const STATUS_CONFIG: Record<ScenarioStatus, { label: string; badge: string; dot: string }> = {
  not_started: { label: '未開始',  badge: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',        dot: 'bg-gray-400' },
  in_progress:  { label: '作成中',  badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',        dot: 'bg-blue-500' },
  completed:    { label: '完了',    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',   dot: 'bg-emerald-500' },
}

interface Props {
  scenario: Scenario
  onDelete: (id: string) => void
}

export default function ScenarioTaskCard({ scenario, onDelete }: Props) {
  const status = getScenarioStatus(scenario)
  const cfg = STATUS_CONFIG[status]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all flex items-start gap-4">
      {/* Category icon */}
      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-gray-700 flex items-center justify-center text-xl flex-shrink-0">
        {CATEGORY_ICON[scenario.category]}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-slate-400">
          {CATEGORY_LABEL[scenario.category]}
        </span>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1.5 truncate">{scenario.title}</h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          ブロック数: {scenario.blocks.length}・更新: {new Date(scenario.updatedAt).toLocaleDateString('ja-JP')}
        </p>
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full mt-2 ${cfg.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}{status === 'completed' && ' ✓'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <Link
          href={`/editor/${scenario.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center gap-1 whitespace-nowrap"
        >
          編集する →
        </Link>
        <button
          onClick={() => onDelete(scenario.id)}
          className="text-gray-300 dark:text-gray-600 hover:text-red-400 transition-colors text-lg leading-none"
          title="削除"
        >
          ×
        </button>
      </div>
    </div>
  )
}
