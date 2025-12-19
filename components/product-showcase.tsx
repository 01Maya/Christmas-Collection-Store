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
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)
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
            Discover our curated selection of premium holiday treasures. Click cards to flip and see details. ✨
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="h-auto md:h-[520px] cursor-pointer perspective animate-pop-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setFlipped(flipped === product.id ? null : product.id)}
            >
              <div
                className="relative w-full h-full transition-transform duration-500 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flipped === product.id ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front of card */}
                <div style={{ backfaceVisibility: "hidden" }} className="absolute w-full h-full">
                  <Card className="group cursor-pointer overflow-hidden bg-white/90 backdrop-blur-md border-2 border-[#E63946]/20 hover:border-[#E63946] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-2xl md:rounded-3xl h-full flex flex-col hover:animate-shimmer">
                    <div className="relative overflow-hidden flex-1 bg-white/50 flex items-center justify-center min-h-[280px]">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-contain max-w-full max-h-full group-hover:scale-105 transition-transform duration-700 ease-out p-2 md:p-4"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(product.id)
                        }}
                        className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/90 backdrop-blur-md p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 hover:bg-[#E63946] hover:text-white hover:scale-110 hover:animate-heartbeat"
                      >
                        <Heart
                          className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${
                            favorites.includes(product.id) ? "fill-[#E63946] text-[#E63946]" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <div className="p-5 md:p-8">
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2C1810] mb-2 group-hover:text-[#E63946] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[#2C1810]/80 text-xs md:text-sm mb-4 line-clamp-2 font-medium">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between border-t border-[#E63946]/20 pt-3 md:pt-4">
                        <span className="text-xl md:text-2xl font-serif font-bold text-[#E63946]">
                          {product.price}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-[#2C1810]/70 group-hover:text-[#E63946] transition-colors font-bold">
                          Click to Flip
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Back of card */}
                <div
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  className="absolute w-full h-full"
                >
                  <Card className="group overflow-hidden bg-gradient-to-br from-[#E63946]/95 to-[#D62839]/95 border-2 border-[#E63946] backdrop-blur-md rounded-2xl md:rounded-3xl h-full flex flex-col p-5 md:p-8 text-white">
                    <h3 className="font-serif text-xl md:text-2xl font-bold mb-3 md:mb-4">
                      {product.name}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed mb-4 md:mb-6 flex-grow text-white/95 whitespace-pre-line">
                      {product.details}
                    </p>
                    <div className="space-y-3 md:space-y-4 border-t border-white/30 pt-4 md:pt-6">
                      <div className="text-2xl md:text-3xl font-serif font-bold">
                        {product.price}
                      </div>
                      <Button
                        size="lg"
                        className="w-full bg-white text-[#E63946] hover:bg-[#FFE8E0] transition-all duration-300 py-4 md:py-6 text-sm md:text-base font-serif uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl hover:scale-105 font-bold"
                      >
                        🛍️ Add to Cart
                      </Button>
                    </div>
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
