import React, { useState } from 'react';
import { TESTIMONIALS, FAQS } from '../data/decorData';
import { Star, ChevronDown, MessageSquareHeart, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-200 text-[11px] font-semibold uppercase tracking-[0.2em]">
            <MessageSquareHeart className="w-3.5 h-3.5 text-rose-800" />
            <span>Câu Chuyện Hạnh Phúc & Cảm Nhận Thực Tế</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Đồng Hành Cùng Hơn 1.200 Cặp Đôi & Gia Đình
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Sự hài lòng và những nụ cười viên mãn của cô dâu chú rể cùng hai họ chính là thước đo giá trị lớn nhất của MÂY DECOR.
          </p>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 sm:mb-28">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-2 rounded-[2rem] bg-white border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="p-6 sm:p-8 flex flex-col h-full justify-between space-y-6">
                
                {/* Rating Stars & Event Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                    {t.eventType}
                  </span>
                </div>

                {/* Quote Content */}
                <p className="font-serif text-stone-700 text-base sm:text-lg italic leading-relaxed">
                  “{t.quote}”
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-300 font-serif font-bold text-sm flex items-center justify-center shrink-0">
                      {t.avatarText}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-1">
                        {t.coupleName}
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      </h4>
                      <span className="text-[11px] text-stone-500 block">
                        {t.role} · {t.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tone Pill */}
                <div className="text-[11px] text-rose-900 bg-rose-50/80 px-3 py-1.5 rounded-lg border border-rose-100 font-medium">
                  🎨 {t.toneUsed}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Giải Đáp Thắc Mắc Thường Gặp
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Câu Hỏi Về Dịch Vụ & Lễ Nghi
            </h3>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-stone-200 bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-stone-900 hover:text-rose-900 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-rose-900' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
