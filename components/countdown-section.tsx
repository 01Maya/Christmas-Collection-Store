"use client"

import { useState, useEffect } from "react"

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmas = new Date(new Date().getFullYear(), 11, 25)
      const now = new Date()

      if (now > christmas) {
        christmas.setFullYear(christmas.getFullYear() + 1)
      }

      const difference = christmas.getTime() - now.getTime()

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-32 px-6 overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFE8E0] via-[#FFF5F0] to-[#FFFBF0] opacity-50" />

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <h2 className="font-serif text-5xl md:text-7xl font-bold text-[#2C1810] mb-6 animate-slide-in-left leading-tight">
          The Magic Arrives In 🎅
        </h2>
        <p className="text-xl text-[#2C1810]/70 mb-16 font-medium tracking-wide animate-fade-in delay-200">
          Count down the moments to the most wonderful time of the year ✨
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <div
              key={unit}
              className="relative group animate-pop-bounce"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E63946]/30 to-[#06A77D]/30 rounded-3xl blur-2xl group-hover:opacity-100 transition-all duration-500 opacity-60 animate-glow-pulse" />
              <div className="relative bg-white/80 backdrop-blur-md border-2 border-[#E63946]/30 p-8 md:p-12 rounded-3xl hover:border-[#E63946] transition-all duration-500 hover:-translate-y-2 group-hover:shadow-2xl hover:animate-rotate-scale">
                <div className="text-6xl md:text-7xl font-serif font-bold bg-gradient-to-r from-[#E63946] to-[#06A77D] bg-clip-text text-transparent mb-4 tabular-nums animate-pulse-scale">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="text-[#2C1810]/60 uppercase tracking-[0.2em] text-sm font-bold border-t-2 border-[#E63946]/20 pt-4 group-hover:text-[#E63946] transition-colors">
                  {unit}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-4 text-2xl animate-bounce-gentle">
          <span className="animate-pop-bounce delay-100">🎁</span>
          <span className="animate-pop-bounce delay-200">🎄</span>
          <span className="animate-pop-bounce delay-300">🎀</span>
          <span className="animate-pop-bounce delay-400">🔔</span>
        </div>
      </div>
    </section>
  )
}
