'use client'
import { ReactNode } from 'react'
import { useParallaxTilt } from '../hooks/useParallaxTilt'

export default function DashboardClientWrapper({ children }: { children: ReactNode }) {
  useParallaxTilt()
  return <>{children}</>
}
