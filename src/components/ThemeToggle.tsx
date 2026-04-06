'use client'

import { useTheme } from '@/hooks/useTheme'

interface Props {
  className?: string
}

export default function ThemeToggle({ className = '' }: Props) {
  const { isDark, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      title={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      className={`text-base leading-none transition-colors ${className}`}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
