'use client'
import React, { useEffect, useRef, useState } from 'react'
import FPSGraph from './FPSGraph'

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(0)
  const [memory, setMemory] = useState('—')
  const frames = useRef(0)

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    function tick() {
      frames.current++
      raf = requestAnimationFrame(tick)
      const now = performance.now()
      if (now - last >= 1000) {
        setFps(frames.current)
        frames.current = 0
        last = now
        if ((performance as any).memory) {
          const mem = ((performance as any).memory.usedJSHeapSize / 1024 / 1024).toFixed(0)
          setMemory(mem + 'MB')
        }
      }
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ padding: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 12 }}>FPS</div>
          <div style={{ fontWeight: 700 }}>{fps}</div>
        </div>
        <div style={{ padding: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 12 }}>Memory</div>
          <div style={{ fontWeight: 700 }}>{memory}</div>
        </div>
      </div>
      <FPSGraph fps={fps} />
    </div>
  )
}
