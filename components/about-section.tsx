"use client"

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-slide-in-left">
            <div className="inline-block border-2 border-[#E63946] px-4 py-2 rounded-full bg-[#E63946]/10 animate-pop-in">
              <span className="text-[#E63946] text-xs uppercase tracking-widest font-bold">Since 1999 🎄</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#2C1810] leading-tight animate-slide-in-left delay-100">
              Handcrafted
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#06A77D]">
                Christmas Magic
              </span>
            </h2>
            <p className="text-lg text-[#2C1810]/80 leading-relaxed font-medium animate-fade-in delay-200">
              Every piece in our collection is meticulously crafted to capture the warmth and magic of the holiday
              season. From luxurious candles to premium gift sets, each item tells a story of elegance and tradition.
            </p>
            <p className="text-lg text-[#2C1810]/80 leading-relaxed font-medium animate-fade-in delay-300">
              We believe Christmas is more than a season—it's a feeling. Our artisans pour their hearts into creating
              pieces that bring joy, comfort, and timeless beauty to your celebrations. ✨
            </p>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t-2 border-[#E63946]/20">
              <div className="text-center animate-bounce-gentle delay-100">
                <div className="text-4xl font-serif font-bold bg-gradient-to-r from-[#E63946] to-[#06A77D] bg-clip-text text-transparent mb-2">
                  100+
                </div>
                <div className="text-xs text-[#2C1810]/60 uppercase tracking-widest font-bold">Luxury Items</div>
              </div>
              <div className="text-center animate-bounce-gentle delay-200">
                <div className="text-4xl font-serif font-bold bg-gradient-to-r from-[#E63946] to-[#06A77D] bg-clip-text text-transparent mb-2">
                  50K+
                </div>
                <div className="text-xs text-[#2C1810]/60 uppercase tracking-widest font-bold">Happy Clients</div>
              </div>
              <div className="text-center animate-bounce-gentle delay-300">
                <div className="text-4xl font-serif font-bold bg-gradient-to-r from-[#E63946] to-[#06A77D] bg-clip-text text-transparent mb-2">
                  25+
                </div>
                <div className="text-xs text-[#2C1810]/60 uppercase tracking-widest font-bold">Years Legacy</div>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-in-right group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#E63946]/40 to-[#06A77D]/40 rounded-3xl blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-700 animate-glow-pulse" />
            <div className="relative border-2 border-[#E63946]/30 p-4 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl hover:border-[#E63946] transition-all duration-500">
              <img
                src="/luxury-christmas-decorations-elegant-setup.jpg"
                alt="Luxury Christmas Setup"
                className="relative w-full shadow-2xl group-hover:shadow-2xl transition-all duration-700 rounded-2xl hover:scale-105"
              />
            </div>
            <div className="absolute -top-6 -right-6 text-[#E63946] text-4xl animate-spin-slow opacity-80">🎄</div>
            <div className="absolute -bottom-6 -left-6 text-[#06A77D] text-4xl animate-swing opacity-80">🎅</div>
          </div>
        </div>
      </div>
    </section>
  )
}
