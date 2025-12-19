'use client'

import { useEffect, useState } from 'react'

export function ChristmasBackground() {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([])

  useEffect(() => {
    const flakes = Array.from({ length: 75 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 15, // Slower, more soothing fall
      size: 0.2 + Math.random() * 0.8,
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {/* Updated gradient to rich red theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#990000_0%,#720e1e_40%,#4a0404_70%,#2C0B0E_100%)]" />
      
      {/* Added subtle noise texture for premium feel */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Added vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>

      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake absolute text-white/60 blur-[0.5px]"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            fontSize: `${flake.size}rem`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  )
}
