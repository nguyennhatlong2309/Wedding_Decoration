import React, { useState } from 'react';
import { Phone, Sparkles, Menu, X, CalendarHeart } from 'lucide-react';
import { AudioPlayerWidget } from './AudioPlayerWidget';

interface NavbarProps {
  onOpenBooking: (initialTone?: string, serviceTitle?: string) => void;
  onNavigate?: (href: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Tone Màu', href: '#tone-studio' },
    { label: 'Bộ Sưu Tập', href: '#catalog' },
    { label: 'Lịch Trình Lễ', href: '#lich-trinh' },
    { label: 'Dự Toán Chi Phí', href: '#du-toan' },
    { label: 'Quy Trình', href: '#quy-trinh' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300">
        <nav className="glass-panel rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-stone-200/80">
          
          {/* Brand Logo with XTRA elegance */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center font-serif text-lg font-bold shadow-md group-hover:scale-105 transition-transform border border-amber-300/30">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900 leading-none">
                MÂY DECOR
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium mt-0.5">
                Wedding & Milestone
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="hover:text-rose-900 hover:font-semibold transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Action Cluster: Romantic Audio Player + Call + Book */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Romantic Ambient Wedding Music Player */}
            <div className="hidden md:block">
              <AudioPlayerWidget />
            </div>

            {/* Hotline Phone Pill */}
            <a
              href="tel:0988123456"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border border-stone-300 hover:border-stone-400 text-stone-700 hover:text-stone-900 bg-white/60 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-rose-800" />
              <span>0988.123.456</span>
            </a>

            {/* Main Booking CTA Button with XTRA Button-in-button design */}
            <button
              onClick={() => onOpenBooking()}
              className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-stone-900 text-white text-xs sm:text-sm font-medium shadow-md hover:bg-stone-800 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>Tư Vấn Ngay</span>
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] ml-0.5">
                ↗
              </div>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-md lg:hidden flex flex-col justify-start pt-24 px-6 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 flex flex-col gap-4">
            
            {/* Mini Player inside Mobile Drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Nhạc Lễ Cưới
              </span>
              <AudioPlayerWidget />
            </div>

            <div className="text-xs font-semibold tracking-wider text-stone-400 uppercase pt-1">
              Danh Mục Khám Phá
            </div>

            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-base font-medium text-stone-800 hover:text-rose-900 py-2 border-b border-stone-50 transition-colors"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-full bg-stone-900 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <CalendarHeart className="w-4 h-4 text-rose-300" />
                <span>Đặt Lịch Tư Vấn 3D Miễn Phí</span>
              </button>

              <a
                href="tel:0988123456"
                className="w-full py-2.5 rounded-full border border-stone-300 text-stone-800 font-medium text-xs flex items-center justify-center gap-2 hover:bg-stone-50"
              >
                <Phone className="w-3.5 h-3.5 text-rose-800" />
                <span>Hotline: 0988.123.456</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
