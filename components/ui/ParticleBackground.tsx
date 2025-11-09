'use client'
import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    // Smooth parallax layers — subtle depth
    const layerCount = 3
    const allParticles: {
      x: number
      y: number
      r: number
      speedY: number
      speedX: number
      color: string
      layer: number
    }[] = []

    for (let layer = 1; layer <= layerCount; layer++) {
      const count = layer === 1 ? 25 : layer === 2 ? 35 : 50
      for (let i = 0; i < count; i++) {
        allParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * (1.4 + layer * 0.3),
          speedY: (Math.random() * 0.3 + 0.1) * layer * 0.4,
          speedX: (Math.random() - 0.5) * 0.1,
          color:
            Math.random() > 0.5
              ? `rgba(124,92,255,${0.12 + layer * 0.05})`
              : `rgba(78,197,255,${0.12 + layer * 0.05})`,
          layer,
        })
      }
    }

    const animate = () => {
      if (!ctx) return

      // darker transparent wipe for smooth trailing effect
      ctx.fillStyle = 'rgba(10, 16, 32, 0.28)'
      ctx.fillRect(0, 0, width, height)

      for (const p of allParticles) {
        p.x += p.speedX
        p.y += p.speedY

        // recycle particles when off screen
        if (p.y > height + 20) {
          p.y = -10
          p.x = Math.random() * width
        }

        if (p.x < -20 || p.x > width + 20) p.speedX *= -1

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 10)
        gradient.addColorStop(0, p.color)
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, p.r * 10, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none',
        opacity: 0.9,
        mixBlendMode: 'screen',
        filter: 'blur(1px) brightness(1.2)',
        transition: 'opacity 0.6s ease',
      }}
    />
  )
}
