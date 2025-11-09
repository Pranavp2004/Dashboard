'use client'
import React from 'react'
export default function TimeRangeSelector(){
  return (
    <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:12}}>
      <div className="range small">Range
        <select style={{marginLeft:8}}>
          <option>1min</option>
          <option>5min</option>
          <option>1hour</option>
        </select>
      </div>
      <button className="btn">Apply</button>
    </div>
  )
}
