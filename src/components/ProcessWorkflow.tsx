import React from 'react';
import { WORKFLOW_STEPS } from '../data/decorData';
import { Sparkles, Palette, Compass, Layers, Flower2, Clock } from 'lucide-react';

export const ProcessWorkflow: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Palette className="w-5 h-5 text-rose-800" />;
      case 1:
        return <Compass className="w-5 h-5 text-amber-800" />;
      case 2:
        return <Layers className="w-5 h-5 text-emerald-800" />;
      case 3:
        return <Flower2 className="w-5 h-5 text-pink-700" />;
      default:
        return <Clock className="w-5 h-5 text-stone-900" />;
    }
  };

  return (
    <section id="quy-trinh" className="py-20 sm:py-28 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 text-stone-800 border border-stone-200 text-[11px] font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-rose-800" />
            <span>Quy Chuẩn Chuyên Nghiệp · An Tâm Tuyệt Đối</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            5 Bước Kiến Tạo Khoảnh Khắc Viên Mãn
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Quy trình vận hành khép kín và tỉ mỉ, giúp gia đình hoàn toàn thảnh thơi tận hưởng ngày vui mà không phải lo toan bất cứ áp lực thời gian nào.
          </p>
        </div>

        {/* 5-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="relative p-2 rounded-[2rem] bg-stone-50 border border-stone-200/80 hover:border-stone-400 transition-all duration-300 hover:shadow-lg flex flex-col justify-between group"
            >
              <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 flex flex-col h-full justify-between space-y-4">
                
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(idx)}
                  </div>
                  <span className="font-serif text-2xl font-bold text-stone-300 group-hover:text-rose-900 transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Step Title & Description */}
                <div className="space-y-2 flex-grow">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Sub Detail Chip */}
                <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-600 italic">
                  ✓ {step.detail}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
