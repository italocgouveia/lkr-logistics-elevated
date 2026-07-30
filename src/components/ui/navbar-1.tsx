import { useState } from "react";
import { Menu, X } from "lucide-react";

/**
 * Navbar1 — navbar flutuante (pill) com menu mobile em overlay.
 * Versão adaptada para Vite/TanStack (sem "use client") e nativa
 * (sem `motion`/framer-motion): animações via CSS + estado React.
 */

const NAV_ITEMS = ["Home", "Pricing", "Docs", "Projects"];

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((v) => !v);

  return (
    <div className="flex justify-center w-full py-6 px-4">
      <div className="flex items-center justify-between px-6 py-3 bg-white rounded-full shadow-lg w-full max-w-3xl relative z-10">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-6 transition-transform duration-300 hover:rotate-[10deg]">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="url(#navbar1_grad)" />
              <defs>
                <linearGradient id="navbar1_grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF9966" />
                  <stop offset="1" stopColor="#FF5E62" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item}
              href="#"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              className="anim-fade-down inline-block text-sm text-gray-900 hover:text-gray-600 transition-transform hover:scale-105 font-medium"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block anim-fade-down" style={{ animationDelay: "0.3s" }}>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-2 text-sm text-white bg-black rounded-full transition-all hover:bg-gray-800 hover:scale-105"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center transition-transform active:scale-90"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          <Menu className="h-6 w-6 text-gray-900" />
        </button>
      </div>

      {/* Mobile Menu Overlay — sempre montado, animado por CSS (entra/sai da direita) */}
      <div
        className={`fixed inset-0 bg-white z-50 pt-24 px-6 md:hidden transition-all duration-300 ease-out ${
          isOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-full pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <button
          className="absolute top-6 right-6 p-2 transition-transform active:scale-90"
          onClick={toggleMenu}
          aria-label="Fechar menu"
        >
          <X className="h-6 w-6 text-gray-900" />
        </button>
        <div className="flex flex-col space-y-6">
          {NAV_ITEMS.map((item) => (
            <a key={item} href="#" className="text-base text-gray-900 font-medium" onClick={toggleMenu}>
              {item}
            </a>
          ))}
          <div className="pt-6">
            <a
              href="#"
              className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
              onClick={toggleMenu}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Navbar1 };
