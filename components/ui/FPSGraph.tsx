'use client'
import React, { useEffect, useRef } from 'react'

export default function FPSGraph({ fps }: { fps: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const dataRef = useRef<number[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    dataRef.current.push(fps)
    if (dataRef.current.length > 80) dataRef.current.shift()

    const w = (canvas.width = 160)
    const h = (canvas.height = 40)
    ctx.clearRect(0, 0, w, h)
    ctx.beginPath()

    dataRef.current.forEach((v, i) => {
      const x = (i / 80) * w
      const y = h - (v / 80) * h
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    })

    ctx.strokeStyle = 'rgba(124,92,255,0.8)'
    ctx.lineWidth = 2
    ctx.stroke()
  }, [fps])

  return (
    <canvas
      ref={canvasRef}
      className="fps-graph"
    />
  )
}
