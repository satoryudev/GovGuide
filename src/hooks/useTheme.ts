'use client'

import { useEffect, useState } from 'react'

export function useTheme() {
  // DOMの実際の状態を正とする（inline scriptで設定済みの値を反映）
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setIsDark(next)
  }

  return { isDark, toggle }
}
