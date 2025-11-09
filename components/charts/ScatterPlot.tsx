'use client'
import { useEffect, useRef } from 'react'
import { useDataContext } from '../providers/DataProvider'
import { DataPoint } from '../../lib/types'

export default function ScatterPlot() {
  const { data } = useDataContext()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dataRef = useRef<DataPoint[]>([])

  useEffect(() => {
    dataRef.current = data
  }, [data])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio
      canvas.height = canvas.clientHeight * window.devicePixelRatio
    }
    resize()
    window.addEventListener('resize', resize)

    let raf: number
    let last = performance.now()

    const draw = () => {
      raf = requestAnimationFrame(draw)
      const now = performance.now()
      if (now - last < 16) return
      last = now

      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const pts = dataRef.current
      if (!pts || pts.length < 10) return

      const len = pts.length
      const display = Math.min(len, 1000)
      const start = len - display
      const visible = pts.slice(start)

      // Get value range for scaling
      const minVal = Math.min(...visible.map(p => p.value))
      const maxVal = Math.max(...visible.map(p => p.value))
      const range = maxVal - minVal || 1

      for (let i = 0; i < display; i++) {
        const p = visible[i]
        const x = (i / display) * w
        const y = h - ((p.value - minVal) / range) * h

        const cat = parseInt(p.category.replace('c', '')) || 0
        const colors = [
          'rgba(124,92,255,0.7)', // violet
          'rgba(78,197,255,0.7)', // cyan
          'rgba(255,165,0,0.7)',  // orange
          'rgba(255,105,180,0.7)',// pink
          'rgba(0,255,170,0.7)',  // aqua
        ]
        const color = colors[cat % colors.length]

        const grad = ctx.createRadialGradient(x, y, 0, x, y, 8 * window.devicePixelRatio)
        grad.addColorStop(0, color)
        grad.addColorStop(1, 'transparent')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, 3 * window.devicePixelRatio, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

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
