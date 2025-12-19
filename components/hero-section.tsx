"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const lastSnowRef = useRef(0)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    // Snowflake cursor tail
    const handleMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastSnowRef.current < 60) return // throttle
      lastSnowRef.current = now

      const el = document.createElement("span")
      el.className = "snowflake-tail"
      el.textContent = Math.random() < 0.8 ? "❄️" : "✨"
      const size = 8 + Math.random() * 16
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
      el.style.fontSize = `${size}px`
      el.style.opacity = "1"
      // random horizontal drift via CSS variable
      el.style.setProperty("--drift", `${Math.round(Math.random() * 40 - 20)}px`)
      el.style.setProperty("--spin", `${Math.round(Math.random() * 360)}deg`)
      document.body.appendChild(el)

      const remove = () => {
        if (el && el.parentNode) el.parentNode.removeChild(el)
      }
      el.addEventListener("animationend", remove)
      // fallback removal
      setTimeout(remove, 1200)
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen md:min-h-[90vh] flex items-center justify-center overflow-hidden pt-16 md:pt-20 px-4 md:px-6 z-10"
    >
      <style>{`
        /* CTA hover smoothing */
        .cta-hover {
          transition: transform .32s cubic-bezier(.22,.85,.35,1), box-shadow .32s cubic-bezier(.22,.85,.35,1), background-color .25s ease;
          will-change: transform, box-shadow;
        }
        .cta-hover:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,.12); }

        /* Image group hover subtle lift */
        .hero-image-lift { transition: transform .6s cubic-bezier(.22,.85,.35,1); }
        .group:hover .hero-image-lift { transform: translateY(-8px) scale(1.03); }

        /* Snowflake tail */
        .snowflake-tail {
          position: fixed;
          pointer-events: none;
          transform: translate(-50%, -50%) translateX(0) translateY(0) rotate(0);
          z-index: 9999;
          user-select: none;
          animation: snow-move 900ms cubic-bezier(.22,.85,.35,1) forwards;
          will-change: transform, opacity;
        }

        @keyframes snow-move {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(0) translateX(0) rotate(var(--spin, 0));
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translateY(-36px) translateX(var(--drift, 8px)) rotate(calc(var(--spin,0) + 180deg)) scale(.9);
          }
        }
      `}</style>
      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        <div className="mb-6 md:mb-8 animate-slide-in-down">
          <span className="inline-block text-[#E63946] tracking-widest text-xs md:text-sm uppercase border-b-2 border-[#E63946]/50 pb-2 md:pb-3 font-semibold drop-shadow-sm">
            ✨ 2025 Holiday Collection ✨
          </span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-slide-in-right leading-tight text-[#2C1810]">
          Celebrate the Magic of
          <br className="hidden sm:block" />
          <span className="text-[#E63946]"> Christmas </span>
          Together
        </h1>

        <p className="text-base md:text-lg text-[#2C1810]/70 mb-8 md:mb-12 max-w-2xl mx-auto animate-fade-in leading-relaxed font-medium delay-200">
          Discover handcrafted elegance designed to transform your holiday season into an unforgettable celebration
        </p>

        <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto mb-8 md:mb-12 animate-pop-bounce group">
          <img
            src="/luxury-christmas-candle-with-gold-accents.jpg"
            alt="Luxury Christmas Product"
            className="relative z-10 w-full h-full object-contain drop-shadow-lg transition-transform duration-700 group-hover:scale-105 rounded-xl"
          />
        </div>

<div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up delay-300 w-full">
  <a href="#collection">
    <Button
      size="lg"
      className="bg-[#E63946] text-white hover:bg-[#D62839] transition-all duration-500 hover:scale-105 font-semibold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-full shadow-lg hover:shadow-xl w-full sm:w-auto"
    >
      ✨ Explore Now
    </Button>
  </a>

  <a href="#gifts">
    <Button
      size="lg"
      variant="outline"
      className="border-2 border-[#E63946] text-[#E63946] hover:bg-[#E63946] hover:text-white transition-all duration-500 hover:scale-105 font-semibold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-full bg-white/50 hover:shadow-lg w-full sm:w-auto"
    >
      🎁 Shop Guide
    </Button>
  </a>
</div>

      </div>
    </section>
  )
}
