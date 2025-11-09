'use client'
import React, { createContext, useContext, useMemo, useReducer } from 'react'
import { DataPoint } from '../../lib/types'
import StreamInitializer from './StreamInitializer'

type State = { data: DataPoint[] }
type Action =
  | { type: 'append'; payload: DataPoint[] }
  | { type: 'replace'; payload: DataPoint[] }

const DataContext = createContext<{
  data: DataPoint[]
  dispatch: React.Dispatch<Action>
} | null>(null)

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'append': {
      const merged = [...state.data, ...action.payload]
      return { data: merged.slice(-15000) }
    }
    case 'replace':
      return { data: action.payload }
    default:
      return state
  }
}

export default function DataProvider({
  children,
  initialData = [],
}: {
  children: React.ReactNode
  initialData?: DataPoint[]
}) {
  const [state, dispatch] = useReducer(reducer, { data: initialData })

  const value = useMemo(() => ({ data: state.data, dispatch }), [state.data])

  return (
    <DataContext.Provider value={value}>
      {/* StreamInitializer runs after mount to feed live data */}
      <StreamInitializer />
      {children}
    </DataContext.Provider>
  )
}

export function useDataContext() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useDataContext must be used inside DataProvider')
  return ctx
}
