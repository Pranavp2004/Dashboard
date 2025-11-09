'use client'
import { useEffect, useRef } from 'react'

export default function Heatmap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = canvas.clientWidth || 800)
    let height = (canvas.height = canvas.clientHeight || 400)
    const rows = 20
    const cols = 32
    const grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.random())
    )

    function draw() {
      ctx.clearRect(0, 0, width, height)

      const cellW = width / cols
      const cellH = height / rows

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v = grid[y][x]

          // 🌈 Neon multi-color gradient scale (cool → warm)
          const hue = (1 - v) * 240 // 240 = blue → 0 = red
          const light = 45 + v * 25
          const sat = 100
          const alpha = 0.9
          ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${alpha})`
          ctx.fillRect(x * cellW, y * cellH, cellW, cellH)
        }
      }

      // ✨ Add highlight overlay (neon glow effect)
      const grad = ctx.createLinearGradient(0, 0, width, height)
      grad.addColorStop(0, 'rgba(124,92,255,0.15)')
      grad.addColorStop(1, 'rgba(78,197,255,0.15)')
      ctx.fillStyle = grad
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'source-over'

      // 🧩 Subtle grid lines for clarity
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath()
        ctx.moveTo(i * cellW, 0)
        ctx.lineTo(i * cellW, height)
        ctx.stroke()
      }
      for (let j = 0; j <= rows; j++) {
        ctx.beginPath()
        ctx.moveTo(0, j * cellH)
        ctx.lineTo(width, j * cellH)
        ctx.stroke()
      }

      // 🔄 Animated dynamic flow
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          grid[y][x] += (Math.random() - 0.5) * 0.08
          grid[y][x] = Math.min(1, Math.max(0, grid[y][x]))
        }
      }

      requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      width = canvas.width = canvas.clientWidth
      height = canvas.height = canvas.clientHeight
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        borderRadius: '12px',
        background: 'radial-gradient(circle at 30% 30%, rgba(20,20,40,0.8), rgba(10,10,25,0.95))',
        boxShadow:
          'inset 0 0 20px rgba(124,92,255,0.2), 0 0 35px rgba(124,92,255,0.15)',
      }}
    />
  )
}
