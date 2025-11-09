'use client'
import { useEffect } from 'react'

export function useParallaxTilt() {
  useEffect(() => {
    const panels = document.querySelectorAll('.panel')

    const handleMove = (e: MouseEvent, panel: HTMLElement) => {
      const rect = panel.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * 5
      const rotateY = ((x - centerX) / centerX) * -5
      panel.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    }

    const handleLeave = (panel: HTMLElement) => {
      panel.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
    }

    panels.forEach((panel) => {
      const el = panel as HTMLElement
      const move = (e: MouseEvent) => handleMove(e, el)
      const leave = () => handleLeave(el)
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)

      // Store references for cleanup
      el.dataset.listenerMove = move.toString()
      el.dataset.listenerLeave = leave.toString()
    })

    // Clean up safely
    return () => {
      panels.forEach((panel) => {
        const el = panel as HTMLElement
        el.removeEventListener('mousemove', (e) => handleMove(e, el))
        el.removeEventListener('mouseleave', () => handleLeave(el))
        el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
      })
    }
  }, [])
}
