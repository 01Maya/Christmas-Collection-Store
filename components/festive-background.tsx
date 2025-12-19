"use client"

import { useEffect, useState } from "react"

interface StaticDoodle {
  id: number
  emoji: string
  left: number
  top: number
  size: number
  rotation: number
  opacity: number
  duration: number
  delay: number
  amplitude: number
}

const DOODLES = [
  {
    emoji: "🎄",
    positions: [
      { left: 3, top: 10 },
      { left: 94, top: 65 },
      { left: 5, top: 75 },
    ],
  },
  {
    emoji: "❄️",
    positions: [
      { left: 88, top: 5 },
      { left: 12, top: 60 },
      { left: 75, top: 82 },
    ],
  },
  {
    emoji: "⛄",
    positions: [
      { left: 82, top: 40 },
      { left: 8, top: 48 },
    ],
  },
  {
    emoji: "🎅",
    positions: [
      { left: 90, top: 20 },
      { left: 6, top: 32 },
    ],
  },
  {
    emoji: "🔔",
    positions: [
      { left: 18, top: 22 },
      { left: 82, top: 58 },
    ],
  },
  {
    emoji: "✨",
    positions: [
      { left: 32, top: 35 },
      { left: 68, top: 15 },
    ],
  },
  {
    emoji: "🎁",
    positions: [
      { left: 12, top: 72 },
      { left: 88, top: 78 },
    ],
  },
  {
    emoji: "🎀",
    positions: [
      { left: 45, top: 25 },
      { left: 55, top: 70 },
    ],
  },
  {
    emoji: "🧤",
    positions: [
      { left: 25, top: 55 },
      { left: 72, top: 45 },
    ],
  },
]

export function FestiveBackground() {
  const [doodles, setDoodles] = useState<StaticDoodle[]>([])

  useEffect(() => {
    const staticDoodles = DOODLES.flatMap((doodle, idx) =>
      doodle.positions.map((pos, posIdx) => ({
        id: idx * 100 + posIdx,
        emoji: doodle.emoji,
        left: pos.left,
        top: pos.top,
        size: 1.2 + Math.random() * 1.3,
        rotation: Math.random() * 20 - 10,
        opacity: 0.12 + Math.random() * 0.06,
        duration: 3 + Math.random() * 1.8,
        delay: -Math.random() * 3,
        amplitude: 6 + Math.random() * 10,
      })),
    )
    setDoodles(staticDoodles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9] via-[#FFFBF7] to-[#FFF8F3]" />

      <style>{`
        .doodle-inner {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          will-change: transform, opacity;
          display: inline-block;
        }

        @keyframes float-ease {
          0% {
            transform: translate(-50%, -50%) translateY(0) rotate(var(--rot));
          }
          50% {
            transform: translate(-50%, -50%) translateY(calc(-1 * var(--amp) * 1px)) rotate(calc(var(--rot) + 6deg));
          }
          100% {
            transform: translate(-50%, -50%) translateY(0) rotate(var(--rot));
          }
        }

        .doodle-anim {
          animation-name: float-ease;
          animation-timing-function: cubic-bezier(.22,.85,.35,1);
          animation-iteration-count: infinite;
          animation-fill-mode: both;
        }
      `}</style>

      {doodles.map((doodle) => (
        <div
          key={doodle.id}
          className="absolute pointer-events-none transition-opacity duration-500"
          style={{
            left: `${doodle.left}%`,
            top: `${doodle.top}%`,
            opacity: doodle.opacity,
          }}
        >
          <span
            className="doodle-inner doodle-anim"
            style={
              {
                ["--rot" as any]: `${doodle.rotation}deg`,
                ["--amp" as any]: `${doodle.amplitude}`,
                animationDuration: `${doodle.duration}s`,
                animationDelay: `${doodle.delay}s`,
                fontSize: `${doodle.size}rem`,
              } as React.CSSProperties
            }
            aria-hidden
          >
            {doodle.emoji}
          </span>
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/2 to-transparent pointer-events-none" />
    </div>
  )
}
