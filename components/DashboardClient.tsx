'use client'

import dynamic from 'next/dynamic'
import ParticleBackground from './ui/ParticleBackground'
import DashboardClientWrapper from './DashboardClientWrapper'

// Client-only dynamic imports
const PerformanceMonitor = dynamic(() => import('./ui/PerformanceMonitor'), { ssr: false })
const ClientLineChart = dynamic(() => import('./charts/LineChart'), { ssr: false })
const ClientScatterPlot = dynamic(() => import('./charts/ScatterPlot'), { ssr: false })
const ClientHeatmap = dynamic(() => import('./charts/Heatmap'), { ssr: false })
const FilterPanel = dynamic(() => import('./controls/FilterPanel'), { ssr: false })
const TimeRangeSelector = dynamic(() => import('./controls/TimeRangeSelector'), { ssr: false })
const DataTable = dynamic(() => import('./ui/DataTable'), { ssr: false })

export default function DashboardClient() {
  return (
    <DashboardClientWrapper>
      {/* Particle Background (behind everything) */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -3 }}>
        <ParticleBackground />
      </div>

      <div className="container">
        {/* Header */}
        <div className="header">
          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              background: 'linear-gradient(90deg, #7c5cff, #4ec5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Performance Dashboard
          </h1>
          <PerformanceMonitor />
        </div>

        <div className="dashboard-layout">
          <main className="main-section">
            {/* === Chart Row 1 === */}
            <div className="charts-grid">
              {/* Line Chart */}
              <div
                className="panel chart-box glow"
                style={{
                  height: 380,
                  position: 'relative',
                  zIndex: 5,
                  overflow: 'visible',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 18,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#9aa4c0',
                    textShadow: '0 0 8px rgba(124, 92, 255, 0.4)',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                >
                  📈 Line Chart (Trend)
                </div>
                <ClientLineChart />
              </div>

              {/* Scatter Plot */}
              <div
                className="panel chart-box glow"
                style={{
                  height: 380,
                  position: 'relative',
                  zIndex: 5,
                  overflow: 'visible',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 18,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#9aa4c0',
                    textShadow: '0 0 8px rgba(124, 92, 255, 0.4)',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                >
                  💠 Scatter Plot (Distribution)
                </div>
                <ClientScatterPlot />
              </div>
            </div>

            {/* === Chart Row 2 === */}
            <div className="charts-grid">
              {/* Heatmap */}
              <div
                className="panel chart-box glow"
                style={{
                  height: 380,
                  position: 'relative',
                  zIndex: 6,
                  overflow: 'visible',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 18,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#9aa4c0',
                    textShadow: '0 0 10px rgba(124, 92, 255, 0.6)',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                >
                  🔥 Heatmap (Density)
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    zIndex: 5,
                    position: 'relative',
                  }}
                >
                  <ClientHeatmap />
                </div>
              </div>

              {/* Control Panel */}
              <div
                className="panel glow"
                style={{
                  height: 380,
                  position: 'relative',
                  zIndex: 5,
                }}
              >
                <h2
                  style={{
                    fontSize: '1rem',
                    marginBottom: 10,
                    color: 'var(--muted)',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  Controls
                </h2>
                <FilterPanel />
              </div>
            </div>
          </main>

          {/* === Sidebar === */}
          <aside
            className="panel glow sidebar"
            style={{
              position: 'relative',
              zIndex: 6,
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <h2
              style={{
                fontSize: '1rem',
                marginBottom: 10,
                color: 'var(--muted)',
                textTransform: 'uppercase',
              }}
            >
              Latest Data
            </h2>
            <TimeRangeSelector />
            <div className="tableWrap" style={{ marginTop: 12 }}>
              <DataTable />
            </div>
          </aside>
        </div>
      </div>
    </DashboardClientWrapper>
  )
}
