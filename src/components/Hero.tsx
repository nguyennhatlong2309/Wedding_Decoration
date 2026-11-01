import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Palette } from 'lucide-react';

interface HeroProps {
  onExploreTones: () => void;
  onOpenEstimator: () => void;
  onSelectToneHero?: (toneId: string) => void;
}

interface SlideItem {
  id: string;
  toneId: string;
  image: string;
  tagline: string;
  artisticScript: string;
  serifTitle: string;
  description: string;
  toneLabel: string;
  accentColor: string;
}

export const Hero: React.FC<HeroProps> = ({ onExploreTones, onOpenEstimator, onSelectToneHero }) => {
  const slides: SlideItem[] = [
    {
      id: 'slide-1',
      toneId: 'tone-gold',
      image: '/images/hero.jpg',
      tagline: 'NGHỆ THUẬT ĐẠI TIỆC 5 SAO',
      serifTitle: 'Nâng Niu Ngày Trọng Đại',
      artisticScript: 'Hào Hoa & Tráng Lệ',
      description: 'Không gian tiệc cưới hoàng gia với dàn đèn chùm pha lê, dải lụa chiffon rủ bóng và ánh nến lung linh.',
      toneLabel: 'Tone Champagne Gold',
      accentColor: '#C89D4B',
    },
    {
      id: 'slide-2',
      toneId: 'tone-red',
      image: '/images/mam_trap_red.jpg',
      tagline: 'MÂM TRÁP RỒNG PHƯỢNG SƠN MÀI',
      serifTitle: 'Gìn Giữ Nếp Nhà Xưa',
      artisticScript: 'Son Sắt Thủy Chung',
      description: 'Mâm tráp Rồng Phượng chạm trổ tỉ mỉ từ cau tươi Đắk Lắk, khay sơn mài đỏ chu sa dát vàng 24k vương giả.',
      toneLabel: 'Tone Đỏ Chu Sa Hoàng Kim',
      accentColor: '#9E1B32',
    },
    {
      id: 'slide-3',
      toneId: 'tone-pink',
      image: '/images/gia_tien_pink.jpg',
      tagline: 'LỄ VU QUY & GIA TIÊN ĐƯƠNG ĐẠI',
      serifTitle: 'Thanh Thuần Khởi Đầu',
      artisticScript: 'Giấc Mơ Cổ Tích',
      description: 'Gian thờ gia tiên ấm cúng, hoa hồng Ohara nhập khẩu đan xen chữ Song Hỷ mạ vàng trong nắng mai.',
      toneLabel: 'Tone Hồng Pastel Romance',
      accentColor: '#E58B9C',
    },
    {
      id: 'slide-4',
      toneId: 'tone-sage',
      image: '/images/tiec_cuoi_sage.jpg',
      tagline: 'TIỆC CƯỚI GLASSHOUSE & GARDEN',
      serifTitle: 'Hòa Mình Cùng Thiên Nhiên',
      artisticScript: 'Thuần Khiết Tinh Khôi',
      description: 'Mái vòm hoa lan trắng kết hợp lá bạch đàn dịu mát, phong cách Minimalist Botanical thanh lịch Châu Âu.',
      toneLabel: 'Tone Trắng & Xanh Sage',
      accentColor: '#5B7563',
    },
    {
      id: 'slide-5',
      toneId: 'tone-baby',
      image: '/images/thoi_noi_baby.jpg',
      tagline: 'THÔI NÔI 1 TUỔI & LỄ ĐẦY THÁNG',
      serifTitle: 'Chào Đón Thiên Thần Nhỏ',
      artisticScript: 'Bầu Trời Tuổi Thơ',
      description: 'Backdrop 3D khinh khí cầu bồng bềnh, mây pastel và mâm cúng 12 Bà Mụ chuẩn phong tục cầu bình an.',
      toneLabel: 'Tone Baby Cloud Pastel',
      accentColor: '#6299C9',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
    if (onSelectToneHero) {
      onSelectToneHero(slides[index].toneId);
    }
  };

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + slides.length) % slides.length;
    handleSlideChange(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % slides.length;
    handleSlideChange(nextIdx);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-stone-950 text-white">
      
      {/* Full-Screen Background Image Layers with Smooth Transitions */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.serifTitle}
            className={`w-full h-full object-cover transition-transform duration-10000 ease-out ${
              idx === currentIndex ? 'scale-105' : 'scale-100'
            }`}
          />
          {/* Layered Vignette & Dark Scrim for Artistic Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-stone-950/60" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-stone-950/30 to-stone-950/80" />
        </div>
      ))}

      {/* Main Full-Screen Artistic Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-32 flex flex-col items-center justify-center min-h-[100dvh]">
        
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] mb-6 shadow-xl animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{currentSlide.tagline}</span>
        </div>

        {/* Grand Typography: Serif Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
          {currentSlide.serifTitle}
        </h1>

        {/* Artistic Calligraphy Script Overlay */}
        <div className="font-script text-5xl sm:text-7xl lg:text-8xl text-amber-300 drop-shadow-[0_4px_20px_rgba(197,160,89,0.35)] -mt-2 sm:-mt-4 mb-4 select-none tracking-wide">
          {currentSlide.artisticScript}
        </div>

        {/* Poetic Description */}
        <p className="text-sm sm:text-lg text-stone-200 max-w-2xl mx-auto font-light leading-relaxed mb-8 drop-shadow-sm px-4">
          {currentSlide.description}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 mb-8">
          <button
            onClick={onExploreTones}
            className="group inline-flex items-center gap-3 px-7 sm:px-8 py-4 rounded-full bg-stone-900 text-white font-medium text-sm sm:text-base border border-amber-300/40 shadow-[0_10px_35px_rgba(0,0,0,0.4)] hover:bg-stone-800 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
          >
            <span>Khám Phá 5 Tone Màu</span>
            <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </button>

          <button
            onClick={onOpenEstimator}
            className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-medium text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Palette className="w-4 h-4 text-amber-300" />
            <span>Ước Tính Chi Phí Trọn Gói</span>
          </button>
        </div>

        {/* Floating Slide Navigation Bar (Full Screen Tone Selector) */}
        <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-full bg-black/40 backdrop-blur-lg border border-white/15 shadow-2xl">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => handleSlideChange(idx)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'bg-white text-stone-900 font-bold shadow-lg scale-105'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: slide.accentColor }}
              />
              <span className="hidden md:inline">{slide.toneLabel}</span>
              <span className="md:hidden font-mono">{idx + 1}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Left / Right Arrow Controls */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/20 items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 text-white border border-white/20 items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Scroll-Down Hint with Animated Mouse */}
      <div
        onClick={onExploreTones}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-stone-400 hover:text-white cursor-pointer transition-colors"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.25em]">
          Cuộn Để Khám Phá
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-stone-400 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-amber-300 rounded-full animate-bounce" />
        </div>
      </div>

    </section>
  );
};
