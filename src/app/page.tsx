'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Scenario } from '@/types/scenario'
import { loadScenarios, deleteScenario } from '@/lib/scenarioStorage'

const CATEGORY_LABELS: Record<Scenario['category'], string> = {
  moving: '引越し・転居',
  mynumber: 'マイナンバー',
  tax: '確定申告',
  childcare: '育児・出産',
}

const CATEGORY_COLORS: Record<Scenario['category'], string> = {
  moving: 'bg-blue-100 text-blue-700',
  mynumber: 'bg-green-100 text-green-700',
  tax: 'bg-amber-100 text-amber-700',
  childcare: 'bg-pink-100 text-pink-700',
}

export default function HomePage() {
  const [scenarios, setScenarios] = useState<Scenario[]>([])

  useEffect(() => {
    setScenarios(loadScenarios())
  }, [])

  const handleNew = () => {
    const id = `scenario-${Date.now()}`
    const now = new Date().toISOString()
    const scenario: Scenario = {
      id,
      title: '新しいシナリオ',
      category: 'moving',
      blocks: [],
      startBlockId: null,
      createdAt: now,
      updatedAt: now,
    }
    const { saveScenario } = require('@/lib/scenarioStorage')
    saveScenario(scenario)
    window.location.href = `/editor/${id}`
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (!confirm('このシナリオを削除しますか？')) return
    deleteScenario(id)
    setScenarios(loadScenarios())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">🗺️ TetsuzukiQuest</h1>
            <p className="text-sm text-gray-500">行政手続きチュートリアル エディタ</p>
          </div>
          <button
            onClick={handleNew}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm
              hover:bg-blue-700 transition-colors"
          >
            + 新規シナリオ
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">
          シナリオ一覧（{scenarios.length}件）
        </h2>

        {scenarios.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">📭</div>
            <p>シナリオがありません。「新規シナリオ」から作成してください。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {scenarios.map((s) => (
              <Link
                key={s.id}
                href={`/editor/${s.id}`}
                className="bg-white rounded-xl border border-gray-200 p-5
                  hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[s.category]}`}>
                    {CATEGORY_LABELS[s.category]}
                  </span>
                  <button
                    onClick={(e) => handleDelete(s.id, e)}
                    className="text-gray-300 hover:text-red-500 text-lg leading-none transition-colors"
                    title="削除"
                  >
                    ×
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-400">
                  ブロック数: {s.blocks.length} | 更新: {new Date(s.updatedAt).toLocaleDateString('ja-JP')}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
