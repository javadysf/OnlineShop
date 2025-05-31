import React from 'react'

const Divider = () => {
  return (
<div className="relative w-full overflow-hidden leading-none">
<svg
  className="relative block w-full h-24"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="none"
  viewBox="0 0 1200 120"
>
  <path
    d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
    fill="#38bdf8" // آبی آسمونی
  />
  <path
    d="M0,0 C200,80 1000,20 1200,90 L1200,120 L0,120 Z"
    fill="#fde047" // زرد روشن
    fillOpacity="0.5"
  />
</svg>
</div>
  )
}

export default Divider