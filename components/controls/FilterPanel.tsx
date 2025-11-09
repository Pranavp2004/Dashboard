'use client'
import React, { useState } from 'react'
import { useDataContext } from '../providers/DataProvider'
import useDataStream from '../../hooks/useDataStream'

export default function FilterPanel() {
  const { data } = useDataContext()
  const [stress, setStress] = useState(false)
  const { setStress: toggleStress } = useDataStream()

  const handleClick = () => {
    const next = !stress
    setStress(next)
    toggleStress(next)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>Controls</strong>
        <button className="btn" onClick={handleClick}>
          {stress ? 'Stop' : 'Stress'}
        </button>
      </div>
      <div className="small" style={{ marginTop: 8 }}>
        Points: {data.length}
      </div>
    </div>
  )
}
