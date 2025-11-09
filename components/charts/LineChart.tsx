'use client'
import { useRef, useEffect } from 'react'
import { useDataContext } from '../providers/DataProvider'
import useChartRenderer from '../../hooks/useChartRenderer'

export default function LineChart() {
  const { data } = useDataContext() || { data: [] }
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dataRef = useRef(data)

  useEffect(() => {
    dataRef.current = data
  }, [data])

  useChartRenderer(canvasRef, dataRef)

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.02)',
      }}
    />
  )
}
