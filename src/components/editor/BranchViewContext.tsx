'use client'

import { createContext, useContext, useState } from 'react'

export interface BranchView {
  branchId: string
  side: 'yes' | 'no'
}

interface BranchViewContextValue {
  branchView: BranchView | null
  setBranchView: (view: BranchView | null) => void
}

export const BranchViewContext = createContext<BranchViewContextValue>({
  branchView: null,
  setBranchView: () => {},
})

export function useBranchView() {
  return useContext(BranchViewContext)
}

export function BranchViewProvider({ children }: { children: React.ReactNode }) {
  const [branchView, setBranchView] = useState<BranchView | null>(null)
  return (
    <BranchViewContext.Provider value={{ branchView, setBranchView }}>
      {children}
    </BranchViewContext.Provider>
  )
}
