'use client'

import { useEffect } from 'react'

/** フラッシュを防ぐためのクライアントコンポーネント。
 *  マウント時に localStorage の値を読んで <html> に dark クラスを付与する。 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return <>{children}</>
}
