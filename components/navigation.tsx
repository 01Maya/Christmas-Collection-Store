"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navLinks = ["Home", "About", "Collection", "Builder", "Gifts"]

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/80 backdrop-blur-md py-4 shadow-lg border-b border-[#E63946]/20"
            : "bg-white/40 py-6 border-b border-transparent",
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="font-serif text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E63946] to-[#06A77D] bg-clip-text text-transparent animate-pop-in">
            ✨ Christmas Magic ✨
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item, idx) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-[#2C1810] hover:text-[#E63946] transition-all duration-300 relative group text-sm tracking-widest uppercase font-medium"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-gradient-to-r from-[#E63946] to-[#06A77D] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="text-[#E63946] hover:text-[#FFFBF0] hover:bg-[#E63946] transition-all duration-300 rounded-full hover:scale-110 hover:animate-pop-bounce"
            >
              <ShoppingBag className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#E63946] hover:text-[#06A77D] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-all duration-500 md:hidden flex items-center justify-center",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={cn(
                "font-serif text-3xl text-[#E63946] hover:text-[#06A77D] transition-all duration-300 transform",
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
