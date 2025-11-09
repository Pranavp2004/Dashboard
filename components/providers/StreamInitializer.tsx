'use client'
import { useEffect } from 'react'
import { useDataContext } from './DataProvider'
import { makePoint } from '../../lib/dataGenerator'

export default function StreamInitializer() {
  const { dispatch } = useDataContext()

  useEffect(() => {
    const interval = setInterval(() => {
      const newPoints = Array.from({ length: 10 }, () => makePoint())
      dispatch({ type: 'append', payload: newPoints })
    }, 500) // update every half second

    return () => clearInterval(interval)
  }, [dispatch])

  return null
}
