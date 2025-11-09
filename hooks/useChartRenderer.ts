'use client'
import { useEffect } from 'react'
import { DataPoint } from '../lib/types'

export default function useChartRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  dataRef: React.MutableRefObject<DataPoint[]>
) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0

    const draw = () => {
      raf = requestAnimationFrame(draw)

      const w = (canvas.width = canvas.clientWidth * window.devicePixelRatio)
      const h = (canvas.height = (canvas.clientHeight || 300) * window.devicePixelRatio)

      ctx.clearRect(0, 0, w, h)

      const pts = dataRef.current
      if (!pts || pts.length < 2) {
        // 👇 draw placeholder line when data is empty
        ctx.strokeStyle = 'rgba(124,92,255,0.3)'
        ctx.beginPath()
        ctx.moveTo(0, h / 2)
        ctx.lineTo(w, h / 2)
        ctx.stroke()
        return
      }

      const len = pts.length
      const display = Math.min(len, 5000)
      const start = len - display
      const visible = pts.slice(start)

      const minVal = Math.min(...visible.map(p => p.value))
      const maxVal = Math.max(...visible.map(p => p.value))
      const range = maxVal - minVal || 1

      const gradient = ctx.createLinearGradient(0, 0, w, 0)
      gradient.addColorStop(0, '#7c5cff')
      gradient.addColorStop(1, '#4ec5ff')

      ctx.lineWidth = 2 * window.devicePixelRatio
      ctx.strokeStyle = gradient
      ctx.beginPath()

      visible.forEach((p, i) => {
        const x = (i / display) * w
        const y = h - ((p.value - minVal) / range) * h
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      })

      ctx.shadowBlur = 8
      ctx.shadowColor = 'rgba(124,92,255,0.3)'
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [canvasRef, dataRef])
}
