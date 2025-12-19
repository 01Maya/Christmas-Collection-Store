"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ornamentCategories = [
  {
    name: "Colors",
    items: [
      { id: "red-ball", emoji: "🔴", name: "Red" },
      { id: "gold-ball", emoji: "🟡", name: "Gold" },
      { id: "silver-ball", emoji: "⚪", name: "Silver" },
      { id: "green-ball", emoji: "🟢", name: "Green" },
    ],
  },
  {
    name: "Shapes",
    items: [
      { id: "star", emoji: "⭐", name: "Star" },
      { id: "snowflake", emoji: "❄️", name: "Snow" },
      { id: "bell", emoji: "🔔", name: "Bell" },
      { id: "heart", emoji: "❤️", name: "Heart" },
    ],
  },
  {
    name: "Festive",
    items: [
      { id: "ribbon", emoji: "🎀", name: "Ribbon" },
      { id: "gift", emoji: "🎁", name: "Gift" },
      { id: "candy", emoji: "🍬", name: "Candy" },
      { id: "light", emoji: "💡", name: "Light" },
    ],
  },
  {
    name: "Effects",
    items: [
      { id: "sparkle", emoji: "✨", name: "Sparkle" },
      { id: "glow", emoji: "🌟", name: "Glow" },
      { id: "tinsel", emoji: "🪶", name: "Tinsel" },
      { id: "snow", emoji: "❄", name: "Flurry" },
    ],
  },
]

interface PlacedOrnament {
  id: string
  type: string
  emoji: string
  x: number
  y: number
  scale: number
  rotation: number
  isDragging?: boolean
}

export function InteractiveBuilder() {
  const [placedOrnaments, setPlacedOrnaments] = useState<PlacedOrnament[]>([])
  const [draggingFromPalette, setDraggingFromPalette] = useState<string | null>(null)
  const [draggingOrnamentId, setDraggingOrnamentId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedOrnament, setSelectedOrnament] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })

  const handlePaletteDragStart = (
    ornament: (typeof ornamentCategories)[0]["items"][0],
    e?: React.DragEvent,
  ) => {
    if (e && e.dataTransfer) {
      try {
        e.dataTransfer.setData("text/plain", ornament.id)
        e.dataTransfer.effectAllowed = "copy"
      } catch (err) {
        // some browsers may throw on setData in certain contexts
      }
    }
    setDraggingFromPalette(ornament.id)
    setSelectedOrnament(null)
  }

  const addOrnamentToCenter = (ornament: (typeof ornamentCategories)[0]["items"][0]) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setPlacedOrnaments((prev) => [
      ...prev,
      {
        id: `${ornament.id}-${Date.now()}`,
        type: ornament.id,
        emoji: ornament.emoji,
        x: Math.max(0, Math.min(centerX - 30, rect.width - 60)),
        y: Math.max(0, Math.min(centerY - 30, rect.height - 60)),
        scale: 1.2,
        rotation: Math.random() * 360,
      },
    ])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggingFromPalette || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    let ornament = null
    for (const category of ornamentCategories) {
      ornament = category.items.find((o) => o.id === draggingFromPalette)
      if (ornament) break
    }

    if (ornament && x > 0 && y > 0 && x < rect.width && y < rect.height) {
      setPlacedOrnaments((prev) => [
        ...prev,
        {
          id: `${ornament.id}-${Date.now()}`,
          type: ornament.id,
          emoji: ornament.emoji,
          x: Math.max(0, Math.min(x - 30, rect.width - 60)),
          y: Math.max(0, Math.min(y - 30, rect.height - 60)),
          scale: 1.2,
          rotation: Math.random() * 360,
        },
      ])
    }
    setDraggingFromPalette(null)
  }

  const handleOrnamentMouseDown = (ornament: PlacedOrnament, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()

    // correct offset calculation (use rect.top for Y)
    dragOffsetRef.current = {
      x: e.clientX - rect.left - ornament.x,
      y: e.clientY - rect.top - ornament.y,
    }

    setDraggingOrnamentId(ornament.id)
    setSelectedOrnament(ornament.id)
  }

  const handleOrnamentTouchStart = (ornament: PlacedOrnament, e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    dragOffsetRef.current = {
      x: touch.clientX - rect.left - ornament.x,
      y: touch.clientY - rect.top - ornament.y,
    }
    setDraggingOrnamentId(ornament.id)
    setSelectedOrnament(ornament.id)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingOrnamentId || !canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - dragOffsetRef.current.x
      const y = e.clientY - rect.top - dragOffsetRef.current.y

      setPlacedOrnaments((prev) =>
        prev.map((o) =>
          o.id === draggingOrnamentId
            ? {
                ...o,
                x: Math.max(0, Math.min(x, rect.width - 60)),
                y: Math.max(0, Math.min(y, rect.height - 60)),
              }
            : o,
        ),
      )
    }

    const handleMouseUp = () => {
      setDraggingOrnamentId(null)
    }

    if (draggingOrnamentId) {
      // mouse
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      // touch
      const handleTouchMove = (ev: TouchEvent) => {
        if (!draggingOrnamentId || !canvasRef.current) return
        const touch = ev.touches[0]
        const rect = canvasRef.current.getBoundingClientRect()
        const x = touch.clientX - rect.left - dragOffsetRef.current.x
        const y = touch.clientY - rect.top - dragOffsetRef.current.y
        setPlacedOrnaments((prev) =>
          prev.map((o) =>
            o.id === draggingOrnamentId
              ? {
                  ...o,
                  x: Math.max(0, Math.min(x, rect.width - 60)),
                  y: Math.max(0, Math.min(y, rect.height - 60)),
                }
              : o,
          ),
        )
      }

      const handleTouchEnd = () => setDraggingOrnamentId(null)

      document.addEventListener("touchmove", handleTouchMove, { passive: false })
      document.addEventListener("touchend", handleTouchEnd)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [draggingOrnamentId])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const removeOrnament = (id: string) => {
    setPlacedOrnaments((prev) => prev.filter((o) => o.id !== id))
    setSelectedOrnament(null)
  }

  const updateOrnament = (id: string, updates: Partial<PlacedOrnament>) => {
    setPlacedOrnaments((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)))
  }

  const clearAll = () => {
    setPlacedOrnaments([])
    setSelectedOrnament(null)
  }

  const duplicateOrnament = (ornament: PlacedOrnament) => {
    setPlacedOrnaments((prev) => [
      ...prev,
      {
        ...ornament,
        id: `${ornament.type}-${Date.now()}`,
        x: Math.min((canvasRef.current?.clientWidth ?? 800) - 60, ornament.x + 40),
        y: Math.min((canvasRef.current?.clientHeight ?? 600) - 60, ornament.y + 40),
      },
    ])
  }

  return (
    <section id="builder" className="relative py-16 md:py-24 px-4 md:px-6 z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-[#2C1810] mb-2 md:mb-3 leading-tight animate-slide-in-left">
            Design Your
          </h2>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#E63946] mb-3 md:mb-4 animate-slide-in-right">
            Perfect Christmas Tree
          </h2>
          <p className="text-sm md:text-base text-[#2C1810]/70 font-medium animate-fade-in delay-200">
            Drag ornaments onto the tree to decorate and design your perfect holiday masterpiece
          </p>
        </div>

        <div className="flex gap-2 md:gap-3 justify-center mb-8 md:mb-10 flex-wrap">
          {ornamentCategories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(idx)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-xs md:text-sm transition-all duration-500 transform hover:scale-110 animate-pop-in ${
                selectedCategory === idx
                  ? "bg-[#E63946] text-white shadow-xl scale-105 animate-shimmer"
                  : "bg-white/70 text-[#2C1810] hover:bg-white border-2 border-[#E63946]/30 hover:shadow-lg"
              }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
          {ornamentCategories[selectedCategory].items.map((ornament, idx) => (
            <Card
              key={ornament.id}
              draggable
              onDragStart={(e) => handlePaletteDragStart(ornament, e)}
              onClick={() => addOrnamentToCenter(ornament)}
              className="p-3 md:p-6 text-center cursor-move hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 border-[#E63946]/30 bg-white/80 backdrop-blur-md rounded-lg md:rounded-2xl hover:border-[#E63946] hover:bg-white group transform hover:rotate-3 animate-pop-in hover:animate-shimmer"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="text-3xl md:text-5xl mb-2 md:mb-3 animate-bounce-gentle group-hover:scale-125 transition-all duration-500 ease-out">
                {ornament.emoji}
              </div>
              <div className="font-semibold text-[#2C1810] text-xs md:text-sm uppercase tracking-wider leading-tight">
                {ornament.name}
              </div>
            </Card>
          ))}
        </div>

        <div
          ref={canvasRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="relative w-full aspect-video md:aspect-auto md:h-[700px] lg:h-[800px] rounded-2xl md:rounded-3xl border-4 border-dashed border-[#E63946]/50 bg-gradient-to-br from-white/80 via-[#FFF5F0]/90 to-white/80 backdrop-blur-sm overflow-hidden shadow-2xl hover:border-[#E63946] transition-all duration-500 ease-out ring-4 ring-[#E63946]/10 z-20 flex items-end justify-center pb-12 md:pb-16 lg:pb-20 hover:shadow-[#E63946]/30 hover:ring-8"
        >
          <div className="text-[180px] md:text-[320px] lg:text-[420px] animate-bounce-gentle pointer-events-none drop-shadow-2xl">
            🎄
          </div>

          <div className="absolute inset-0 flex items-center justify-center text-[#2C1810]/15 text-base md:text-xl font-serif pointer-events-none">
            {placedOrnaments.length === 0 && "✨ Drag ornaments here to decorate ✨"}
          </div>

          {placedOrnaments.map((ornament) => (
            <div
              key={ornament.id}
              className={`absolute cursor-grab active:cursor-grabbing group transition-all duration-200 animate-pop-in ${
                selectedOrnament === ornament.id ? "z-50" : "z-10"
              }`}
              style={{
                left: `${ornament.x}px`,
                top: `${ornament.y}px`,
              }}
              onMouseDown={(e) => handleOrnamentMouseDown(ornament, e)}
              onTouchStart={(e) => handleOrnamentTouchStart(ornament, e)}
            >
              <div
                className={`text-5xl md:text-7xl lg:text-8xl drop-shadow-2xl hover:drop-shadow-[0_0_20px_rgba(230,57,70,0.6)] transition-all duration-300 ease-out animate-bounce-gentle ${
                  selectedOrnament === ornament.id
                    ? "scale-150 animate-heartbeat drop-shadow-[0_0_30px_rgba(230,57,70,0.8)]"
                    : "hover:scale-150 hover:animate-shimmer"
                }`}
                style={{
                  transform: `scale(${ornament.scale}) rotate(${ornament.rotation}deg)`,
                }}
              >
                {ornament.emoji}
              </div>

              {selectedOrnament === ornament.id && (
                <div className="absolute -top-14 md:-top-20 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-lg md:rounded-xl p-2 md:p-3 shadow-xl flex gap-1 md:gap-2 whitespace-nowrap animate-slide-in-down flex-wrap justify-center w-max border-2 border-[#E63946]/30 z-[999]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updateOrnament(ornament.id, {
                        scale: Math.max(0.5, ornament.scale - 0.2),
                      })
                    }}
                    className="px-2 md:px-3 py-1 md:py-2 bg-[#E63946] text-white rounded text-xs md:text-sm hover:bg-[#D62839] transition-all duration-300 ease-out hover:scale-110 font-bold active:scale-95"
                  >
                    −
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updateOrnament(ornament.id, {
                        scale: Math.min(2, ornament.scale + 0.2),
                      })
                    }}
                    className="px-2 md:px-3 py-1 md:py-2 bg-[#06A77D] text-white rounded text-xs md:text-sm hover:bg-[#048A6F] transition-all duration-300 ease-out hover:scale-110 font-bold active:scale-95"
                  >
                    +
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      duplicateOrnament(ornament)
                    }}
                    className="px-2 md:px-3 py-1 md:py-2 bg-[#FFB703] text-white rounded text-xs md:text-sm hover:bg-[#F59E0B] transition-all duration-300 ease-out hover:scale-110 font-bold active:scale-95"
                  >
                    📋
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updateOrnament(ornament.id, { rotation: (ornament.rotation - 15) % 360 })
                    }}
                    className="px-2 md:px-3 py-1 md:py-2 bg-[#8B5CF6] text-white rounded text-xs md:text-sm hover:bg-[#7C3AED] transition-all duration-300 ease-out hover:scale-110 font-bold active:scale-95"
                  >
                    ↺
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updateOrnament(ornament.id, { rotation: (ornament.rotation + 15) % 360 })
                    }}
                    className="px-2 md:px-3 py-1 md:py-2 bg-[#06A77D] text-white rounded text-xs md:text-sm hover:bg-[#048A6F] transition-all duration-300 ease-out hover:scale-110 font-bold active:scale-95"
                  >
                    ↻
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeOrnament(ornament.id)
                    }}
                    className="px-2 md:px-3 py-1 md:py-2 bg-red-500 text-white rounded text-xs md:text-sm hover:bg-red-600 transition-all duration-300 ease-out hover:scale-110 font-bold active:scale-95"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12 space-y-4 animate-fade-in delay-300">
          <p className="text-xs md:text-sm text-[#2C1810]/60 font-medium">
            👆 Click ornaments to resize, copy, or delete • Drag ornaments to move on tree
          </p>
          {placedOrnaments.length > 0 && (
            <div className="flex gap-3 md:gap-4 justify-center flex-wrap items-center">
              <Button
                onClick={clearAll}
                className="bg-[#E63946] text-white hover:bg-[#D62839] rounded-full px-6 md:px-8 py-2 md:py-3 font-semibold text-xs md:text-base shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105 active:scale-95 uppercase tracking-wider"
              >
                Clear All
              </Button>
              <div className="px-4 md:px-6 py-2 md:py-3 bg-[#06A77D]/20 rounded-full font-semibold text-[#2C1810] text-xs md:text-base border-2 border-[#06A77D]/50">
                🎄 Ornaments: {placedOrnaments.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
