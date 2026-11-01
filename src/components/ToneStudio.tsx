import React, { useState } from 'react';
import { TONES } from '../data/decorData';
import { Sparkles, Check, Flower2, Heart, ArrowUpRight, Copy } from 'lucide-react';

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
  const currentTone = TONES.find((t) => t.id === selectedToneId) || TONES[0];
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const getScriptSubtitle = (id: string) => {
    switch (id) {
      case 'tone-red':
        return 'Son Sắt & Vương Giả';
      case 'tone-pink':
        return 'Lãng Mạn & Thanh Thuần';
      case 'tone-sage':
        return 'Tinh Khôi & Bình Yên';
      case 'tone-gold':
        return 'Hào Hoa & Quyền Quý';
      case 'tone-baby':
        return 'Ngọt Ngào & Kỳ Diệu';
      default:
        return 'Hạnh Phúc Viên Mãn';
    }
  };

  return (
    <section id="tone-studio" className="py-20 sm:py-28 bg-[#0F0E0E] text-white relative scroll-mt-20 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-25 transition-colors duration-1000"
        style={{ backgroundColor: currentTone.primaryColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-[11px] font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Studio Trải Nghiệm Tone Màu Chủ Đạo</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Nghệ Thuật Phối Màu Không Gian
          </h2>

          <div className="font-script text-4xl sm:text-5xl text-amber-300 -mt-2">
            Harmonious Color Palette & Floral Art
          </div>

          <p className="text-sm sm:text-base text-stone-400 leading-relaxed max-w-2xl mx-auto font-light">
            Chọn một tone màu bên dưới để chiêm ngưỡng không gian lễ nghi biến hóa theo từng cung bậc cảm xúc của riêng bạn.
          </p>
        </div>

        {/* Tone Selector Pill Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12 sm:mb-16">
          {TONES.map((tone) => {
            const isSelected = tone.id === currentTone.id;
            return (
              <button
                key={tone.id}
                onClick={() => onSelectTone(tone.id)}
                className={`group flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-stone-950 font-bold shadow-2xl scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-stone-300 border border-white/15'
                }`}
              >
                <div
                  className="w-3.5 h-3.5 rounded-full ring-2 ring-white/40 shadow-sm shrink-0"
                  style={{ backgroundColor: tone.primaryColor }}
                />
                <span>{tone.name}</span>
                {isSelected && <Check className="w-4 h-4 text-rose-900 ml-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Full-Bleed Atmospheric Visual Showcase */}
        <div className="relative rounded-3xl sm:rounded-[3rem] overflow-hidden border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.6)] min-h-[580px] sm:min-h-[640px] flex items-end">
          
          {/* Background Image of the Selected Tone */}
          <div className="absolute inset-0">
            <img
              src={currentTone.previewImage}
              alt={currentTone.vietnameseTitle}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
            />
            {/* Dramatic Dark Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent" />
          </div>

          {/* Overlaid Content Grid */}
          <div className="relative z-10 p-6 sm:p-12 lg:p-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Left 7 Columns: Artistic Typography & Emotional Description */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-block px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold text-amber-300 border border-white/20 uppercase tracking-widest">
                {currentTone.subtitle}
              </div>

              <div>
                <h3 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                  {currentTone.vietnameseTitle}
                </h3>
                <div className="font-script text-4xl sm:text-6xl text-amber-300 mt-1 drop-shadow-md">
                  {getScriptSubtitle(currentTone.id)}
                </div>
              </div>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                {currentTone.description}
              </p>

              {/* Mood Keywords Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentTone.moodKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-stone-200 text-xs border border-white/15"
                  >
                    #{kw}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => onOpenBooking(currentTone.id, `Trọn gói trang trí ${currentTone.vietnameseTitle}`)}
                  className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-white text-stone-950 font-bold text-xs sm:text-sm hover:bg-amber-300 active:scale-95 transition-all shadow-xl cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                  <span>Áp Dụng Tone Này Cho Tiệc Của Bạn</span>
                  <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px]">
                    ↗
                  </div>
                </button>

                <button
                  onClick={() => onFilterCatalogByTone(currentTone.id)}
                  className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:border-white/40 text-stone-200 text-xs sm:text-sm font-medium hover:bg-black/60 transition-all cursor-pointer"
                >
                  <span>Xem Sản Phẩm Thuộc Tone Này</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>

            </div>

            {/* Right 5 Columns: Glass Swatches & Flower Recommendations */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Glass Swatch Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/15 space-y-3 shadow-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                  Bảng Màu Chuẩn Pantone (Click để copy mã HEX)
                </span>
                
                <div className="grid grid-cols-2 gap-2">
                  {currentTone.hexCodes.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => handleCopyHex(c.hex)}
                      className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 transition-all text-left cursor-pointer group"
                    >
                      <div
                        className="w-6 h-6 rounded-lg ring-1 ring-white/30 shrink-0 shadow-xs"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="flex flex-col truncate">
                        <span className="text-[11px] font-semibold text-white truncate">
                          {c.label}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {copiedHex === c.hex ? 'Đã sao chép!' : c.hex}
                        </span>
                      </div>
                      <Copy className="w-3 h-3 text-stone-500 group-hover:text-stone-300 ml-auto shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended Floral Types */}
              <div className="p-5 sm:p-6 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/15 space-y-2.5 shadow-2xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Flower2 className="w-3.5 h-3.5" />
                  Loại Hoa Tươi Phối Chuẩn Tone
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentTone.flowerTypes.map((flower, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-stone-200 text-xs border border-white/10"
                    >
                      🌸 {flower}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
