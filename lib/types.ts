export interface DataPoint {
  timestamp: number
  value: number
  category?: string
  id?: number
}
export interface PerformanceMetrics {
  fps: number
  memoryMB?: number
}
