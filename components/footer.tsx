"use client"

import { Facebook, Instagram, Twitter, Mail } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-gradient-to-br from-[#E63946] to-[#C91F30] text-white py-16 px-6 z-10 overflow-hidden">
      {/* Decorative emoji background */}
      <style>{`
        .footer-emoji {
          position: absolute;
          font-size: 2rem;
          opacity: 0.12;
          pointer-events: none;
          animation: float-gentle 6s ease-in-out infinite;
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
      
      {/* Emoji decorations */}
      <div className="footer-emoji" style={{ top: "5%", left: "3%", animationDelay: "0s" }}>❄️</div>
      <div className="footer-emoji" style={{ top: "10%", right: "5%", animationDelay: "1s" }}>✨</div>
      <div className="footer-emoji" style={{ top: "25%", left: "8%", animationDelay: "2s" }}>🎄</div>
      <div className="footer-emoji" style={{ top: "35%", right: "3%", animationDelay: "1.5s" }}>🎁</div>
      <div className="footer-emoji" style={{ bottom: "15%", left: "5%", animationDelay: "0.5s" }}>🔔</div>
      <div className="footer-emoji" style={{ bottom: "20%", right: "8%", animationDelay: "2.5s" }}>❄️</div>
      <div className="footer-emoji" style={{ top: "50%", left: "2%", animationDelay: "1.8s" }}>⭐</div>
      <div className="footer-emoji" style={{ top: "60%", right: "4%", animationDelay: "0.8s" }}>✨</div>
      
      <div className="container mx-auto max-w-6xl relative">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="animate-slide-in-left">
            <h3 className="font-serif text-2xl font-bold mb-4 animate-fade-in">✨ Christmas Magic ✨</h3>
            <p className="text-white/90 text-sm leading-relaxed font-medium animate-fade-in delay-200">
              Bringing elegance and magic to your holiday celebrations since 1998. Premium luxury gifts for
              unforgettable moments.
            </p>
          </div>

          <div className="animate-slide-in-up delay-100">
            <h4 className="font-serif font-bold mb-4 text-white text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "About Us", "Collection", "Gift Sets"].map((link, i) => (
                <li key={i} className="animate-slide-in-left" style={{ animationDelay: `${i * 50}ms` }}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="hover:text-[#FFE8E0] transition-colors font-medium hover:translate-x-1 duration-300 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide-in-up delay-200">
            <h4 className="font-serif font-bold mb-4 text-white text-lg">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              {["Shipping Info", "Returns", "FAQ", "Contact"].map((link, i) => (
                <li key={i} className="animate-slide-in-left" style={{ animationDelay: `${i * 50}ms` }}>
                  <a
                    href="#"
                    className="hover:text-[#FFE8E0] transition-colors font-medium hover:translate-x-1 duration-300 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide-in-right delay-300">
            <h4 className="font-serif font-bold mb-4 text-white text-lg">Connect With Us</h4>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#E63946] transition-all duration-300 hover:scale-110 shadow-lg hover:rotate-12 animate-pop-in"
                  style={{ animationDelay: `${i * 75}ms` }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in delay-400">
          <p className="text-sm text-white/80 font-medium">© 2025 Christmas Magic Luxury. All rights reserved. ✨</p>
          <div className="flex gap-6 text-sm text-white/80">
            <a
              href="#"
              className="hover:text-white transition-colors font-medium hover:scale-110 duration-300 inline-block"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors font-medium hover:scale-110 duration-300 inline-block"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-white/90 to-[#FFE8E0] text-[#E63946] flex items-center justify-center shadow-2xl hover:shadow-[#E63946]/50 transition-all duration-300 hover:scale-125 animate-bounce-gentle hover:animate-heartbeat z-40 font-serif font-bold text-2xl"
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  )
}
