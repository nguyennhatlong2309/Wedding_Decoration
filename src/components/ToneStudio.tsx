import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ArrowUpRight,
  Copy,
  Flower2,
  Eye,
  EyeOff,
  Check,
  ShieldCheck,
} from 'lucide-react';

interface GiaTienSlide {
  toneKey: string;
  toneId: string;
  number: string;
  name: string;
  role: string;
  vietnameseTitle: string;
  scriptSubtitle: string;
  description: string;
  image: string;
  primaryColor: string;
  accentColor: string;
  hexCodes: { label: string; hex: string }[];
  flowerTypes: string[];
  setupHighlights: string[];
}

export const GIA_TIEN_TONES: GiaTienSlide[] = [
  {
    toneKey: 'do_trang',
    toneId: 'tone-red',
    number: '01',
    name: 'Đỏ - Trắng',
    role: 'Đỏ là màu chủ đạo',
    vietnameseTitle: 'Lễ Gia Tiên Đỏ - Trắng Hoàng Gia',
    scriptSubtitle: 'Son Sắt Thủy Chung & Vương Giả',
    description: 'Gian thờ gia tiên trang nghiêm với rèm nhung đỏ thắm viền lụa trắng mềm mại uốn lượn. Nổi bật trung tâm là đại tự Song Hỷ màu trắng tinh khiết, bàn gia tiên kết rồng phượng trái tươi Đắk Lắk cùng dải lụa đỏ ghế Tiffany truyền thống.',
    image: '/images/gia_tien_6_tones/1_do_trang.jpg',
    primaryColor: '#9E1B32',
    accentColor: '#FFFFFF',
    hexCodes: [
      { label: 'Đỏ Chu Sa', hex: '#9E1B32' },
      { label: 'Trắng Lụa', hex: '#FFFFFF' },
      { label: 'Vàng Hoàng Kim', hex: '#D4AF37' },
      { label: 'Đỏ Ruby', hex: '#70091C' },
    ],
    flowerTypes: ['Lan Hồ Điệp đỏ thắm', 'Hoa Mẫu Đơn chu sa', 'Hồng nhung Ecuador', 'Sen trắng tuyết'],
    setupHighlights: ['Rèm nhung đỏ viền lụa trắng', 'Đại tự Song Hỷ trắng tinh', 'Bàn thờ kết rồng phượng', 'Ghế Tiffany thắt nơ đỏ'],
  },
  {
    toneKey: 'trang_do',
    toneId: 'tone-red',
    number: '02',
    name: 'Trắng - Đỏ',
    role: 'Trắng là màu chủ đạo',
    vietnameseTitle: 'Lễ Gia Tiên Trắng - Đỏ Tân Hôn',
    scriptSubtitle: 'Nền Lụa Thanh Tao & Điểm Hoa Chu Sa',
    description: 'Không gian gia tiên mang hơi thở đương đại với phông lụa trắng xếp ly trang nhã làm chủ đạo, phối hợp khung vòm CNC mạ vàng sang trọng. Điểm xuyết biển tròn Lễ Tân Hôn mạ vàng và hai trụ hoa đỏ vươn cao rực rỡ.',
    image: '/images/gia_tien_6_tones/2_trang_do.jpg',
    primaryColor: '#FAFAFA',
    accentColor: '#B91C1C',
    hexCodes: [
      { label: 'Trắng Lụa', hex: '#FAFAFA' },
      { label: 'Đỏ Chu Sa', hex: '#B91C1C' },
      { label: 'Vàng Gold', hex: '#D4AF37' },
      { label: 'Gỗ Ấm', hex: '#78350F' },
    ],
    flowerTypes: ['Hồng đỏ Ohara', 'Lan chu sa cao cấp', 'Baby trắng', 'Lá khuynh diệp'],
    setupHighlights: ['Phông lụa trắng xếp ly', 'Vách CNC mạ vàng', 'Biển tròn Tân Hôn vàng gương', 'Trụ hoa đỏ chu sa rực rỡ'],
  },
  {
    toneKey: 'trang_hong',
    toneId: 'tone-pink',
    number: '03',
    name: 'Trắng - Hồng',
    role: 'Trắng là màu chủ đạo',
    vietnameseTitle: 'Lễ Gia Tiên Trắng - Hồng Pastel',
    scriptSubtitle: 'Thanh Thuần E Ấp & Giấc Mơ Cổ Tích',
    description: 'Thiết kế dịu êm dành riêng cho ngày Lễ Vu Quy của cô dâu. Nền trắng kem sữa bồng bềnh phối cùng hoa hồng pastel và mẫu đơn màu cam đào, chữ nổi Lễ Vu Quy dát vàng ánh kim cùng bàn ghế gỗ Crossback mộc mạc Châu Âu.',
    image: '/images/gia_tien_6_tones/3_trang_hong.jpg',
    primaryColor: '#FFF9FA',
    accentColor: '#E58B9C',
    hexCodes: [
      { label: 'Trắng Kem Sữa', hex: '#FFF9FA' },
      { label: 'Hồng Pastel', hex: '#E58B9C' },
      { label: 'Cam Đào Peach', hex: '#F7D1BA' },
      { label: 'Vàng Champagne', hex: '#E6CA9A' },
    ],
    flowerTypes: ['Hồng Ohara phấn', 'Mẫu đơn hồng đào', 'Lan hồ điệp trắng', 'Cẩm tú cầu pastel'],
    setupHighlights: ['Phông lụa trắng kem', 'Chữ nổi Vu Quy vàng kim', 'Bàn ghế Crossback gỗ mộc', 'Khăn trải phớt hồng kiều diễm'],
  },
  {
    toneKey: 'trang_vang',
    toneId: 'tone-gold',
    number: '04',
    name: 'Trắng - Vàng',
    role: 'Trắng là màu chủ đạo',
    vietnameseTitle: 'Lễ Gia Tiên Trắng - Vàng Hoàng Kim',
    scriptSubtitle: 'Hào Hoa Phú Quý & Ánh Sáng Nắng Mai',
    description: 'Tái hiện không gian lễ đường quý tộc với phông voan trắng thêu led sao đêm kết hợp vách song tiện mạ vàng hoàng gia đối xứng. Vòng hoa tròn bao quanh chữ Lễ Vu Quy vàng gương, khăn trải bàn dệt kim tuyến champagne lộng lẫy.',
    image: '/images/gia_tien_6_tones/4_trang_vang.jpg',
    primaryColor: '#FCFBF7',
    accentColor: '#C89D4B',
    hexCodes: [
      { label: 'Trắng Voan', hex: '#FCFBF7' },
      { label: 'Vàng Ánh Kim', hex: '#C89D4B' },
      { label: 'Champagne Glitter', hex: '#E2C785' },
      { label: 'Hổ Phách', hex: '#9C6F19' },
    ],
    flowerTypes: ['Lan vũ nữ hoàng kim', 'Hồng kem Pháp', 'Cúc mẫu đơn vàng bơ', 'Lá bạc ánh kim'],
    setupHighlights: ['Phông voan trắng led fairy', 'Vách CNC mạ vàng hoàng gia', 'Vòng hoa Vu Quy vàng gương', 'Khăn trải kim tuyến champagne'],
  },
  {
    toneKey: 'trang_xanh',
    toneId: 'tone-baby',
    number: '05',
    name: 'Trắng - Xanh Biển',
    role: 'Trắng chủ đạo · Xanh biển',
    vietnameseTitle: 'Lễ Gia Tiên Trắng - Xanh Biển Dịu Êm',
    scriptSubtitle: 'Biển Trời Bình Yên & Hạnh Phúc Mênh Mông',
    description: 'Sự hòa quyện mát lành giữa phông voan trắng và dải lụa xanh baby pastel. Đèn sao lung linh huyền ảo, trụ hoa cẩm tú cầu đại đóa cùng dải khăn sequin ánh bạc lấp lánh mang đến không gian hiện đại, trẻ trung và an yên.',
    image: '/images/gia_tien_6_tones/5_trang_xanh.jpg',
    primaryColor: '#F8FAFC',
    accentColor: '#4A90E2',
    hexCodes: [
      { label: 'Trắng Sứ', hex: '#F8FAFC' },
      { label: 'Xanh Baby Blue', hex: '#6BA4E8' },
      { label: 'Xanh Lam Sâu', hex: '#2A5D9E' },
      { label: 'Bạc Sequin', hex: '#D8E2EC' },
    ],
    flowerTypes: ['Cẩm tú cầu xanh biển', 'Delphinium xanh biếc', 'Lan trắng hồ điệp', 'Hồng tuyết nhập khẩu'],
    setupHighlights: ['Phông voan trắng & xanh baby', 'Đèn sao lung linh huyền ảo', 'Khăn trải sequin ánh bạc', 'Nơ ghế voan xanh bồng bềnh'],
  },
  {
    toneKey: 'trang_xanhla',
    toneId: 'tone-sage',
    number: '06',
    name: 'Trắng - Xanh Lá',
    role: 'Trắng chủ đạo · Xanh lá',
    vietnameseTitle: 'Lễ Gia Tiên Trắng - Xanh Lá Botanical',
    scriptSubtitle: 'Xô Thơm Tươi Mát & Thuần Khiết Tự Nhiên',
    description: 'Phong cách cưới Eco-Chic tối giản với phông rèm nhung ngọc lục bảo kết hợp voan xanh sage và trắng ngà. Bảng đại tự Song Hỷ vàng kim quyền quý, trụ hoa lan hồ điệp trắng muốt và ghế Chiavari vàng kim thắt nơ xanh lá thanh tao.',
    image: '/images/gia_tien_6_tones/6_trang_xanhla.jpg',
    primaryColor: '#F9FAF8',
    accentColor: '#3B694F',
    hexCodes: [
      { label: 'Trắng Tinh Khôi', hex: '#F9FAF8' },
      { label: 'Xanh Sage', hex: '#6E987E' },
      { label: 'Xanh Ngọc Lục Bảo', hex: '#235338' },
      { label: 'Vàng Kim Chiavari', hex: '#D4AF37' },
    ],
    flowerTypes: ['Lan hồ điệp trắng muốt', 'Lá bạch đàn tròn Dollar', 'Hồng Juliet trắng', 'Lá măng tây'],
    setupHighlights: ['Rèm nhung ngọc lục bảo & sage', 'Song Hỷ vàng kim quyền quý', 'Trụ hoa lan hồ điệp vươn cao', 'Ghế Chiavari thắt nơ xanh lá'],
  },
];

interface ToneStudioProps {
  selectedToneId: string;
  onSelectTone: (toneId: string) => void;
  onOpenBooking: (toneId: string, serviceTitle?: string) => void;
  onFilterCatalogByTone: (toneId: string) => void;
}

export const ToneStudio: React.FC<ToneStudioProps> = ({
  selectedToneId,
  onSelectTone,
  onOpenBooking,
  onFilterCatalogByTone,
}) => {
  // Find initial slide index matching selectedToneId
  const initialIndex = GIA_TIEN_TONES.findIndex((t) => t.toneId === selectedToneId);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Sync when selectedToneId is updated from outside
  useEffect(() => {
    const idx = GIA_TIEN_TONES.findIndex((t) => t.toneId === selectedToneId);
    if (idx >= 0 && idx !== currentIndex) {
      setCurrentIndex(idx);
    }
  }, [selectedToneId]);

  const currentTone = GIA_TIEN_TONES[currentIndex];

  const handleSlideChange = useCallback(
    (index: number) => {
      const safeIndex = (index + GIA_TIEN_TONES.length) % GIA_TIEN_TONES.length;
      setCurrentIndex(safeIndex);
      onSelectTone(GIA_TIEN_TONES[safeIndex].toneId);
    },
    [onSelectTone]
  );

  const handlePrev = useCallback(() => {
    handleSlideChange(currentIndex - 1);
  }, [currentIndex, handleSlideChange]);

  const handleNext = useCallback(() => {
    handleSlideChange(currentIndex + 1);
  }, [currentIndex, handleSlideChange]);

  // Touch Swipe for Mobile / Tablet
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Keyboard arrow listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section
      id="tone-studio"
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-stone-950 text-white scroll-mt-0 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Full-Screen Edge-to-Edge Image Slides */}
      {GIA_TIEN_TONES.map((tone, idx) => (
        <div
          key={tone.toneKey}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <img
            src={tone.image}
            alt={tone.vietnameseTitle}
            className={`w-full h-full object-cover transition-transform duration-7000 ease-out ${
              idx === currentIndex ? 'scale-105' : 'scale-100'
            }`}
          />
          {/* Subtle Scrim: leaves 80% center bright and clear, softly shading top & bottom for high-contrast typography */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />
        </div>
      ))}

      {/* 2. Top Header Bar (Floating Glass Island) */}
      <div className="relative z-20 pt-16 sm:pt-20 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
        
        {/* Left Badge: Gia Tien Collection + Counter */}
        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
            <span
              className="w-2.5 h-2.5 rounded-full ring-2 ring-white/60 animate-pulse"
              style={{ backgroundColor: currentTone.primaryColor === '#FFFFFF' ? '#D4AF37' : currentTone.primaryColor }}
            />
            <span className="uppercase tracking-wider text-[11px] font-bold text-amber-300">
              TRANG TRÍ LỄ GIA TIÊN
            </span>
            <span className="text-white/40">|</span>
            <span className="font-mono text-[11px] text-stone-200">
              {currentTone.number} / 06
            </span>
          </div>

          {/* Dominant Color Pill */}
          <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] text-stone-200 font-medium">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>{currentTone.role}</span>
          </div>
        </div>

        {/* Right Action: Eye Toggle to hide all text & admire 100% full photos */}
        <button
          onClick={() => setShowOverlay(!showOverlay)}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/25 hover:border-white/50 text-xs text-stone-100 font-medium transition-all cursor-pointer shadow-xl active:scale-95"
          title={showOverlay ? 'Ẩn thông tin để ngắm trọn hình ảnh' : 'Hiện thông tin chi tiết'}
        >
          {showOverlay ? (
            <>
              <EyeOff className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Chế độ ngắm ảnh</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Hiện thông tin</span>
            </>
          )}
        </button>
      </div>

      {/* 3. Horizontal Navigation Arrows (Left & Right Flanks) */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl group"
        aria-label="Tone trước"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-stone-200 group-hover:text-amber-300 transition-colors" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl group"
        aria-label="Tone kế tiếp"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-stone-200 group-hover:text-amber-300 transition-colors" />
      </button>

      {/* 4. Bottom Content Cards & Horizontal Tone Bar */}
      <div className="relative z-20 pb-6 sm:pb-8 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-4">
        
        {/* Floating Detail Panels (Can be hidden via showOverlay toggle) */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-4 items-end transition-all duration-500 ${
            showOverlay ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          {/* Main Title & Cultural Narrative (Left - Col 8) */}
          <div className="lg:col-span-8 p-5 sm:p-7 rounded-3xl bg-black/45 hover:bg-black/55 backdrop-blur-md border border-white/20 space-y-3.5 shadow-2xl transition-all duration-300">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30">
                {currentTone.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-stone-300 text-[10px] font-medium border border-white/15">
                {currentTone.role}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                {currentTone.vietnameseTitle}
              </h3>
              <div className="font-script text-2xl sm:text-4xl text-amber-300 mt-0.5 drop-shadow-md">
                {currentTone.scriptSubtitle}
              </div>
            </div>

            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed font-light drop-shadow-sm max-w-2xl line-clamp-2 sm:line-clamp-none">
              {currentTone.description}
            </p>

            {/* Setup Highlights Tags */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {currentTone.setupHighlights.map((hl, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-xs text-stone-200 text-[11px] border border-white/15 font-medium"
                >
                  ✓ {hl}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => onOpenBooking(currentTone.toneId, currentTone.vietnameseTitle)}
                className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white hover:bg-amber-300 text-stone-950 font-bold text-xs active:scale-95 transition-all shadow-xl cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                <span>Đặt Lễ Gia Tiên Này</span>
                <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[9px]">
                  ↗
                </div>
              </button>

              <button
                onClick={() => onFilterCatalogByTone(currentTone.toneId)}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/20 hover:border-white/40 text-stone-200 text-xs font-medium transition-all cursor-pointer"
              >
                <span>Xem Mâm Quả Đi Kèm</span>
                <ArrowUpRight className="w-3 h-3 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Palette & Flowers Widget (Right - Col 4) */}
          <div className="lg:col-span-4 p-4 sm:p-5 rounded-3xl bg-black/40 hover:bg-black/50 backdrop-blur-md border border-white/20 space-y-3 shadow-2xl transition-all duration-300">
            
            {/* Pantone Palette */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                  Bảng Màu Pantone (Click copy)
                </span>
                {copiedHex && (
                  <span className="text-[10px] text-emerald-400 font-medium animate-pulse">
                    Đã chép {copiedHex}!
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {currentTone.hexCodes.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => handleCopyHex(c.hex)}
                    className="flex items-center gap-1.5 p-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 transition-all text-left cursor-pointer group"
                    title={`Sao chép ${c.hex}`}
                  >
                    <div
                      className="w-4 h-4 rounded-md ring-1 ring-white/30 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="flex flex-col truncate">
                      <span className="text-[9px] font-semibold text-white truncate">
                        {c.label}
                      </span>
                      <span className="text-[8px] text-stone-400 font-mono">
                        {c.hex}
                      </span>
                    </div>
                    <Copy className="w-2 h-2 text-stone-400 group-hover:text-stone-200 ml-auto shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Floral Accents */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Flower2 className="w-3 h-3" />
                Hoa Tươi Gian Thờ
              </span>
              <div className="flex flex-wrap gap-1">
                {currentTone.flowerTypes.map((flower, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white/10 text-stone-200 text-[10px] border border-white/10 font-light"
                  >
                    🌸 {flower}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 5. Horizontal Tone Selector Carousel Strip (Lướt ngang 6 tone màu) */}
        <div className="relative pt-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1 justify-start md:justify-center">
            {GIA_TIEN_TONES.map((tone, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={tone.toneKey}
                  onClick={() => handleSlideChange(idx)}
                  className={`group shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white text-stone-950 font-bold shadow-xl scale-105 border border-white ring-2 ring-amber-300/60'
                      : 'bg-black/50 hover:bg-black/70 text-stone-300 border border-white/20 hover:border-white/40'
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full ring-1 ring-white/60 shrink-0"
                    style={{ backgroundColor: tone.primaryColor === '#FFFFFF' ? '#D4AF37' : tone.primaryColor }}
                  />
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[10px] opacity-70">{tone.number}.</span>
                    <span className="font-medium whitespace-nowrap">{tone.name}</span>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-rose-800 ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
