'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useDataContext } from '../components/providers/DataProvider'

export default function useDataStream(initialRate = 100, initialBatch = 20) {
  const { dispatch } = useDataContext()
  const [rate, setRate] = useState(initialRate)
  const [batch, setBatch] = useState(initialBatch)
  const workerRef = useRef<Worker | null>(null)

  useEffect(() => {
    let mounted = true

    // Inline Web Worker logic (stringified)
    const workerCode = `
      let t = 0
      let rate = 100, batch = 20
      let interval = null

      function makePoint(i) {
        const now = Date.now()
        return {
          id: (t * batch) + i,
          timestamp: now,
          value: Math.sin((now / 800) + i) * 25 + Math.cos((now / 400) - i) * 10 + (Math.random() - 0.5) * 6,
          category: 'c' + ((t + i) % 5)
        }
      }

      function startStream() {
        clearInterval(interval)
        interval = setInterval(() => {
          const pts = []
          for (let i = 0; i < batch; i++) pts.push(makePoint(i))
          postMessage(pts)
          t++
        }, rate)
      }

      onmessage = (e) => {
        const { cmd, rate: newRate, batch: newBatch } = e.data
        if (cmd === 'config') {
          rate = newRate
          batch = newBatch
          startStream()
        } else if (cmd === 'start') {
          startStream()
        } else if (cmd === 'stop') {
          clearInterval(interval)
        }
      }
    `

    const blob = new Blob([workerCode], { type: 'application/javascript' })
    const worker = new Worker(URL.createObjectURL(blob))
    workerRef.current = worker

    worker.onmessage = (m) => {
      if (!mounted || !m.data) return
      dispatch({ type: 'append', payload: m.data })
    }

    // Delay the start to let charts mount
    const startTimeout = setTimeout(() => {
      worker.postMessage({ cmd: 'start' })
    }, 500)

    return () => {
      mounted = false
      clearTimeout(startTimeout)
      worker.terminate()
    }
  }, [dispatch])

  const setStress = useCallback(
    (enable: boolean) => {
      if (!workerRef.current) return
      if (enable) {
        setRate(20)
        setBatch(200)
        workerRef.current.postMessage({
          cmd: 'config',
          rate: 20,
          batch: 200,
        })
      } else {
        setRate(initialRate)
        setBatch(initialBatch)
        workerRef.current.postMessage({
          cmd: 'config',
          rate: initialRate,
          batch: initialBatch,
        })
      }
    },
    [initialRate, initialBatch]
  )

  return { rate, batch, setStress }
}
