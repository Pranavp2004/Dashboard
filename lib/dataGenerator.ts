import { DataPoint } from './types'

export async function generateInitialDataset(size = 10000): Promise<DataPoint[]> {
  const now = Date.now()
  const out: DataPoint[] = new Array(size).fill(0).map((_, i) => ({
    timestamp: now - (size - i) * 100,
    value: Math.sin(i / 45) * 25 + Math.cos(i / 20) * 10 + Math.random() * 4,
    category: `c${i % 5}`,
    id: i,
  }))
  return out
}

export function makePoint(id = 0): DataPoint {
  const t = Date.now() / 1000
  return {
    timestamp: Date.now(),
    value:
      Math.sin(t + id * 0.5) * 20 +
      Math.cos(t * 0.8 + id * 0.3) * 10 +
      (Math.random() - 0.5) * 5,
    category: `c${id % 5}`,
    id,
  }
}
