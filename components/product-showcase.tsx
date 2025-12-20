"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Golden Pine Candle",
    price: "$89",
    image: "/luxury-gold-pine-scented-candle.jpg",
    description: "Hand-poured with premium wax and infused with pine and cinnamon notes",
    details:
      "This exquisite candle burns for 40 hours, filling your space with warmth and elegance. Perfect for creating a cozy holiday atmosphere.\n\n★ 40-hour long-lasting burn\n★ Pine & cinnamon infused fragrance\n★ Hand-poured premium wax",
  },
  {
    id: 2,
    name: "Ruby Velvet Gift Box",
    price: "$149",
    image: "/luxury-red-velvet-gift-box-with-ribbon.jpg",
    description: "Exquisite velvet box filled with artisan chocolates and treats",
    details:
      "Hand-crafted velvet presentation box containing a curated selection of premium artisan chocolates and festive delights.\n\n★ Luxurious velvet finish\n★ Artisan chocolates & festive treats\n★ Ideal for premium gifting",
  },
  {
    id: 3,
    name: "Crystal Snowflake Ornament",
    price: "$129",
    image: "/crystal-snowflake-ornament-luxury.jpg",
    description: "Hand-cut crystal ornament that captures and reflects light beautifully",
    details:
      "Each ornament is individually hand-cut from premium crystal, creating a unique sparkle that brings magic to your tree.\n\n★ Hand-cut premium crystal\n★ Elegant light-reflecting design\n★ Timeless festive décor",
  },
  {
    id: 4,
    name: "Festive Gold Wreath",
    price: "$199",
    image: "/luxury-gold-christmas-wreath.jpg",
    description: "Premium wreath adorned with gold-dusted pine and silk ribbons",
    details:
      "Luxuriously crafted with real pine branches dusted with 24k gold leaf and adorned with handmade silk ribbons.\n\n★ Real pine branches\n★ Gold-dusted luxury finish\n★ Statement holiday décor",
  },
  {
    id: 5,
    name: "Maroon Silk Stocking",
    price: "$79",
    image: "/luxury-maroon-silk-christmas-stocking.jpg",
    description: "Hand-stitched silk stocking with gold embroidery details",
    details:
      "Made from the finest silk with intricate gold embroidery, each stocking is a treasured keepsake for generations.\n\n★ Premium silk material\n★ Hand-stitched gold embroidery\n★ Heirloom-quality design",
  },
  {
    id: 6,
    name: "Evergreen Diffuser Set",
    price: "$119",
    image: "/luxury-evergreen-reed-diffuser-set.jpg",
    description: "Premium reed diffuser with natural evergreen and cedar scents",
    details:
      "Blended with 100% natural essential oils, this diffuser brings the forest's fresh essence into your home.\n\n★ Natural evergreen & cedar oils\n★ Long-lasting fragrance\n★ Elegant glass bottle",
  },
]

export function ProductShowcase() {
  const [flipped, setFlipped] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <section id="collection" className="relative py-16 md:py-32 px-4 md:px-6 z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-[#E63946] tracking-widest uppercase text-sm mb-4 block animate-slide-in-down font-bold">
            🎁 Curated Excellence 🎁
          </span>
          <h2 className="font-serif text-3xl md:text-6xl font-bold text-[#2C1810] mb-4 md:mb-6 animate-slide-in-left leading-tight">
            The Christmas Collection
          </h2>
          <p className="text-base md:text-lg text-[#2C1810]/70 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in delay-200">
            Discover our curated selection of premium holiday treasures. Tap cards to flip and see details. ✨
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="cursor-pointer animate-pop-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setFlipped(flipped === product.id ? null : product.id)}
            >
              <div
                className="relative transition-transform duration-500 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flipped === product.id ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <div style={{ backfaceVisibility: "hidden" }}>
                  <Card className="group bg-white/90 backdrop-blur-md border-2 border-[#E63946]/20 hover:border-[#E63946] transition-all duration-500 hover:shadow-2xl rounded-2xl md:rounded-3xl flex flex-col">
                    <div className="relative bg-white/50 flex items-center justify-center h-[220px] sm:h-[260px] md:h-[280px]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-3 md:p-4 group-hover:scale-105 transition-transform duration-700"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(product.id)
                        }}
                        className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-[#E63946] hover:text-white transition"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(product.id) ? "fill-[#E63946] text-[#E63946]" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div className="p-5 md:p-8">
                      <h3 className="font-serif text-lg md:text-2xl font-bold text-[#2C1810] mb-2">
                        {product.name}
                      </h3>
                      <p className="text-[#2C1810]/80 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between border-t border-[#E63946]/20 pt-3">
                        <span className="text-xl font-serif font-bold text-[#E63946]">
                          {product.price}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-[#2C1810]/70 font-bold">
                          Tap to Flip
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Back */}
                <div
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  className="absolute inset-0"
                >
                  <Card className="bg-gradient-to-br from-[#E63946]/95 to-[#D62839]/95 border-2 border-[#E63946] rounded-2xl md:rounded-3xl p-5 md:p-8 text-white flex flex-col h-full">
                    <h3 className="font-serif text-lg md:text-2xl font-bold mb-4">
                      {product.name}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed flex-grow whitespace-pre-line">
                      {product.details}
                    </p>
                    <Button
                      size="lg"
                      className="mt-6 bg-white text-[#E63946] hover:bg-[#FFE8E0] font-serif uppercase tracking-widest rounded-full"
                    >
                      🛍️ Add to Cart
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
