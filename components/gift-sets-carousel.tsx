"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const giftSets = [
  {
    id: 1,
    name: "Winter Wonderland Bundle",
    price: "$299",
    image: "/luxury-winter-gift-set-with-candles-and-ornaments.jpg",
    items: ["3 Premium Candles", "Crystal Ornament Set", "Silk Gift Wrap"],
    details:
      "Perfect for those who love the serene beauty of winter. Includes our bestselling candle collection with premium essential oils and hand-crafted crystal ornaments.",
  },
  {
    id: 2,
    name: "Festive Elegance Collection",
    price: "$449",
    image: "/luxury-christmas-gift-collection-elegant.jpg",
    items: ["Diffuser Set", "Gold Wreath", "Velvet Stockings", "Artisan Chocolates"],
    details:
      "Experience pure luxury with our most comprehensive collection. Every piece selected to bring elegance and warmth to your holiday celebrations.",
  },
  {
    id: 3,
    name: "Holiday Luxury Essentials",
    price: "$349",
    image: "/luxury-holiday-essentials-gift-box.jpg",
    items: ["Premium Candle Trio", "Silk Ribbon Set", "Crystal Decorations"],
    details:
      "The essential collection for holiday joy. Thoughtfully curated essentials that bring comfort and beauty to your home this season.",
  },
]

export function GiftSetsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % giftSets.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + giftSets.length) % giftSets.length)
  }

  return (
    <section id="gifts" className="relative py-16 md:py-24 px-4 md:px-6 bg-transparent z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16 animate-slide-in-down">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2C1810] mb-3 md:mb-4 leading-tight">
            🎁 Curated Excellence
          </h2>
          <p className="text-base md:text-lg text-[#2C1810]/70 font-medium animate-fade-in delay-200">
            Handpicked gift sets for the perfect celebration
          </p>
        </div>

        <div className="relative mb-8 md:mb-12">
          <Card className="overflow-hidden border-2 border-[#E63946]/30 shadow-xl bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl hover:border-[#E63946] transition-all duration-500 animate-pop-in hover:shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
              {/* Image side */}
              <div className="relative group animate-slide-in-left h-64 md:h-80 overflow-hidden rounded-xl">
                <img
                  src={giftSets[currentIndex].image || "/placeholder.svg"}
                  alt={giftSets[currentIndex].name}
                  className="rounded-xl shadow-lg w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 right-3 md:top-4 md:right-4 text-3xl md:text-4xl animate-bounce-gentle">
                  🎄
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-4 md:space-y-6 animate-slide-in-right">
                <div className="space-y-4 md:space-y-6">
                  <h3 className="font-serif text-2xl md:text-4xl font-bold text-[#2C1810]">
                    {giftSets[currentIndex].name}
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    {giftSets[currentIndex].items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-[#2C1810]/80 font-medium text-sm md:text-base animate-slide-in-left"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <span className="text-[#E63946] text-base md:text-lg">★</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 space-y-3">
                    <p className="text-[#2C1810]/70 leading-relaxed text-sm md:text-base">
                      {giftSets[currentIndex].details}
                    </p>
                    <div className="text-3xl md:text-4xl font-serif font-bold text-[#E63946]">
                      {giftSets[currentIndex].price}
                    </div>
                  </div>
                  <Button className="w-full bg-[#E63946] text-white hover:bg-[#D62839] transition-all duration-300 py-5 md:py-6 text-base md:text-lg rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                    🛍️ Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <Button
              onClick={prev}
              size="icon"
              className="rounded-full border-2 border-[#E63946] text-[#E63946] hover:bg-[#E63946] hover:text-white transition-all duration-300 bg-white hover:scale-110 w-12 h-12 md:w-14 md:h-14 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            <div className="flex items-center gap-2">
              {giftSets.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-[#E63946] w-8" : "bg-[#2C1810]/30 hover:bg-[#2C1810]/50"
                  }`}
                />
              ))}
            </div>
            <Button
              onClick={next}
              size="icon"
              className="rounded-full border-2 border-[#E63946] text-[#E63946] hover:bg-[#E63946] hover:text-white transition-all duration-300 bg-white hover:scale-110 w-12 h-12 md:w-14 md:h-14 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
