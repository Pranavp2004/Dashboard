'use client'
import React, { useMemo } from 'react'
import { useDataContext } from '../providers/DataProvider'

export default function DataTable() {
  const { data } = useDataContext()
  const visible = useMemo(() => data.slice(-200), [data])

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
        boxShadow: '0 0 12px rgba(124,92,255,0.15)',
        border: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Subtle glowing header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background:
            'linear-gradient(90deg, rgba(124,92,255,0.1), rgba(78,197,255,0.1))',
          color: '#e6eef8',
          fontWeight: 600,
          letterSpacing: 0.5,
          textShadow: '0 0 6px rgba(124,92,255,0.5)',
        }}
      >
        Latest Data
        <span
          style={{
            fontSize: 11,
            color: '#9aa4c0',
            fontWeight: 400,
            letterSpacing: 0.3,
          }}
        >
          {visible.length} rows
        </span>
      </div>

      <div
        style={{
          maxHeight: 280,
          overflowY: 'auto',
          scrollbarWidth: 'thin',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 12,
            color: '#d6dcf0',
          }}
        >
          <thead>
            <tr
              style={{
                background: 'rgba(255,255,255,0.03)',
                textAlign: 'left',
              }}
            >
              <th style={{ padding: '6px 10px' }}>Timestamp</th>
              <th style={{ padding: '6px 10px' }}>Value</th>
              <th style={{ padding: '6px 10px' }}>Category</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    'rgba(124,92,255,0.1)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'transparent')
                }
              >
                <td style={{ padding: '6px 10px', color: '#aab2cf' }}>
                  {new Date(r.timestamp).toLocaleTimeString()}
                </td>
                <td
                  style={{
                    padding: '6px 10px',
                    color: '#7c5cff',
                    fontWeight: 600,
                  }}
                >
                  {r.value.toFixed(2)}
                </td>
                <td
                  style={{
                    padding: '6px 10px',
                    color: '#4ec5ff',
                    fontWeight: 500,
                  }}
                >
                  {r.category}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
