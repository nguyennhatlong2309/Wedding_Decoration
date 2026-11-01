import React from 'react';
import { Sparkles, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface EventTimelineScheduleProps {
  onOpenBooking: (toneId?: string, serviceTitle?: string) => void;
}

export const EventTimelineSchedule: React.FC<EventTimelineScheduleProps> = ({ onOpenBooking }) => {
  const ceremonyMilestones = [
    {
      stepNumber: '01',
      stageName: 'GIAI ĐOẠN 1',
      title: 'Lễ Dạm Ngõ & Gặp Gỡ Hai Họ',
      venue: 'Tư gia Nhà Gái',
      decorFocus: 'Bộ khay tráp mica trong suốt, trầu têm cánh phượng, trà ô long & hoa tươi ngoại nhập nhẹ nhàng',
      recommendedTone: 'Tone Trắng Tinh Khôi & Xanh Sage',
      toneId: 'tone-sage',
      status: 'Nghi Lễ Đầu Tiên',
      statusColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      stepNumber: '02',
      stageName: 'GIAI ĐOẠN 2',
      title: 'Lễ Ăn Hỏi & Rước Dâu (7 - 9 Tráp)',
      venue: 'Nhà Trai sang Nhà Gái',
      decorFocus: 'Bộ 9 tráp Rồng Phượng sơn mài dát vàng 24k, đội bưng mâm nam nữ áo dài gấm đồng điệu',
      recommendedTone: 'Tone Đỏ Chu Sa Hoàng Kim',
      toneId: 'tone-red',
      status: 'Trọng Tâm Cưới Hỏi',
      statusColor: 'bg-rose-50 text-rose-800 border-rose-200',
      isHighlight: true,
    },
    {
      stepNumber: '03',
      stageName: 'GIAI ĐOẠN 3',
      title: 'Lễ Gia Tiên Vu Quy & Tân Hôn',
      venue: 'Gian thờ tư gia hai họ',
      decorFocus: 'Bàn thờ tổ tiên trang nghiêm, phông lụa Song Hỷ dát vàng, bàn trà hai họ 12 ghế đính nơ hoa',
      recommendedTone: 'Tone Hồng Pastel Kiêu Sa',
      toneId: 'tone-pink',
      status: 'Nghi Thức Thiêng Liêng',
      statusColor: 'bg-pink-50 text-pink-800 border-pink-200',
    },
    {
      stepNumber: '04',
      stageName: 'GIAI ĐOẠN 4',
      title: 'Đại Tiệc Cưới Sân Khấu & Sảnh Khách Sạn',
      venue: 'Trung tâm tiệc cưới 5 Sao / Ngoài trời',
      decorFocus: 'Backdrop check-in 3D cỡ đại, lối đi lễ đường ngập tràn hoa tươi, dàn đèn chùm pha lê rực rỡ',
      recommendedTone: 'Tone Champagne & Vàng Hoàng Gia',
      toneId: 'tone-gold',
      status: 'Khoảnh Khắc Tỏa Sáng',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      stepNumber: '05',
      stageName: 'GIAI ĐOẠN 5',
      title: 'Lễ Đầy Tháng & Tiệc Thôi Nôi 1 Tuổi Cho Bé',
      venue: 'Tư gia hoặc Nhà hàng ấm cúng',
      decorFocus: 'Mâm cúng 12 Bà Mụ chuẩn lễ, Backdrop 3D khinh khí cầu pastel, bảng Milestone và bánh kem nghệ thuật',
      recommendedTone: 'Tone Baby Cloud Pastel',
      toneId: 'tone-baby',
      status: 'Kỷ Niệm Đầu Đời Bé Yêu',
      statusColor: 'bg-sky-50 text-sky-800 border-sky-200',
    },
  ];

  return (
    <section id="lich-trinh" className="py-20 sm:py-28 bg-[#181615] text-white relative overflow-hidden scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-rose-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with XTRA artistic style */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>XTRA Timeline · Lịch Trình Lễ Nghi Trọn Đời</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Đồng Hành Qua Từng Mốc Son Trọng Đại
          </h2>

          {/* Artistic Script Swash */}
          <div className="font-script text-3xl sm:text-4xl text-amber-300/90 -mt-2">
            From Engagement to Baby Milestones
          </div>

          <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto leading-relaxed">
            Mỗi nghi thức là một tác phẩm được thiết kế chỉn chu từ hoa tươi, mâm quả đến phông nền, đảm bảo ngày vui trọn vẹn và đúng chuẩn thuần phong mỹ tục.
          </p>
        </div>

        {/* Milestone Rows in XTRA Concert Tour List Style */}
        <div className="space-y-4">
          {ceremonyMilestones.map((item, idx) => (
            <div
              key={idx}
              className={`group p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                item.isHighlight
                  ? 'bg-gradient-to-r from-stone-900 via-rose-950/40 to-stone-900 border-rose-800/60 shadow-xl'
                  : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800 hover:border-stone-700'
              }`}
            >
              {/* Left Column: Big Date/Stage Number in Playfair Serif */}
              <div className="flex items-center gap-5 sm:gap-6 shrink-0">
                <div className="flex flex-col items-center justify-center w-16 sm:w-20 text-center border-r border-stone-800 pr-5 sm:pr-6">
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-300 group-hover:scale-105 transition-transform">
                    {item.stepNumber}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mt-1">
                    {item.stageName}
                  </span>
                </div>

                {/* Event Name & Venue */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${item.statusColor}`}>
                      {item.status}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {item.venue}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Middle Column: Details & Tone Focus */}
              <div className="lg:max-w-md space-y-1 text-xs text-stone-300">
                <p className="line-clamp-2 leading-relaxed text-stone-400">
                  {item.decorFocus}
                </p>
                <div className="text-[11px] text-amber-400 font-medium flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Tone gợi ý: {item.recommendedTone}</span>
                </div>
              </div>

              {/* Right Column: Ticket / Action CTA Button */}
              <div className="shrink-0 flex items-center justify-end">
                <button
                  onClick={() => onOpenBooking(item.toneId, item.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-stone-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 active:scale-95 transition-all shadow-md group-hover:shadow-amber-500/10 cursor-pointer"
                >
                  <span>Tư Vấn Hạng Mục</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-stone-900/80 border border-stone-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-white font-medium">
              Đang mở cổng nhận lịch tư vấn cho mùa cưới & tiệc thôi nôi 2026 - 2027
            </span>
          </div>

          <button
            onClick={() => onOpenBooking(undefined, 'Gói combo trọn đời từ Ăn Hỏi đến Thôi Nôi')}
            className="text-amber-300 hover:text-white font-bold underline cursor-pointer"
          >
            Đăng ký giữ lịch ngày hoàng đạo trước 30 ngày →
          </button>
        </div>

      </div>
    </section>
  );
};
