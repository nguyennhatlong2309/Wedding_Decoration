import React, { useState } from 'react';
import { PRODUCTS, TONES, type ProductItem } from '../data/decorData';
import { Sparkles, CheckCircle2, ArrowRight, X, Phone, Heart } from 'lucide-react';

interface ProductCatalogProps {
  initialToneFilter?: string;
  onOpenBooking: (toneId?: string, serviceTitle?: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  initialToneFilter,
  onOpenBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTone, setActiveTone] = useState<string>(initialToneFilter || 'all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const categories = [
    { id: 'all', label: 'Tất Cả Sản Phẩm' },
    { id: 'mam-trap', label: 'Mâm Tráp Cưới Hỏi' },
    { id: 'gia-tien-tiec-cuoi', label: 'Gia Tiên & Tiệc Cưới' },
    { id: 'thoi-noi-day-thang', label: 'Thôi Nôi & Đầy Tháng' },
  ];

  // Filter products
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchTone = activeTone === 'all' || p.toneId === activeTone;
    return matchCategory && matchTone;
  });

  return (
    <section id="catalog" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-200 text-[11px] font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3 h-3 text-rose-800" />
            <span>Bộ Sưu Tập Sản Phẩm & Dịch Vụ Trọn Gói</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Nghệ Thuật Lễ Nghi & Không Gian Hoàn Mỹ
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Mỗi chi tiết đều được chăm chút thủ công bởi những nghệ nhân có trên 10 năm kinh nghiệm, đảm bảo cả giá trị tâm linh truyền thống lẫn mỹ cảm đương đại.
          </p>
        </div>

        {/* Dual Filter Controls: Category + Tone */}
        <div className="flex flex-col gap-5 mb-12 sm:mb-16">
          
          {/* 1. Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 2. Tone Filter Sub-bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-stone-400 font-medium py-1">Lọc theo tone màu:</span>
            <button
              onClick={() => setActiveTone('all')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTone === 'all'
                  ? 'bg-rose-900 text-white font-semibold'
                  : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              Tất cả tone
            </button>
            {TONES.map((tone) => (
              <button
                key={tone.id}
                onClick={() => setActiveTone(tone.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  activeTone === tone.id
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: tone.primaryColor }}
                />
                <span>{tone.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative p-2 rounded-[2rem] bg-stone-50 border border-stone-200 hover:border-stone-400 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              {/* Inner Core Container */}
              <div className="bg-white rounded-[calc(2rem-0.5rem)] overflow-hidden flex flex-col h-full">
                
                {/* Product Image Frame */}
                <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Badges Top Left & Right */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-stone-800 uppercase tracking-wider">
                      {product.categoryLabel}
                    </span>
                    {product.badge && (
                      <span className="px-2.5 py-1 rounded-full bg-rose-900 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-xs font-medium">
                      🎨 {product.toneLabel}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 group-hover:text-rose-900 transition-colors leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                      {product.summary}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    {product.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-800 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">
                        Giá trọn gói từ
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-bold text-rose-900">
                        {product.priceFrom}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-3.5 py-2 rounded-full border border-stone-300 hover:border-stone-500 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-all cursor-pointer"
                      >
                        Chi Tiết
                      </button>

                      <button
                        onClick={() => onOpenBooking(product.toneId, product.title)}
                        className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white transition-all shadow-sm active:scale-95 cursor-pointer"
                        title="Đặt dịch vụ này"
                      >
                        <ArrowRight className="w-4 h-4 text-amber-300" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-stone-50 rounded-3xl border border-dashed border-stone-300">
            <p className="text-stone-500 text-sm">
              Không có sản phẩm nào phù hợp với bộ lọc đã chọn.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveTone('all');
              }}
              className="mt-3 text-xs font-semibold text-rose-900 hover:underline"
            >
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-900 text-xs font-semibold mb-2">
                  {selectedProduct.categoryLabel} · {selectedProduct.toneLabel}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {selectedProduct.title}
                </h3>
                <p className="text-rose-900 font-serif text-xl font-bold mt-1">
                  {selectedProduct.priceFrom}
                </p>
              </div>

              {/* Modal Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-stone-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-stone-600 text-sm leading-relaxed">
                {selectedProduct.summary}
              </p>

              {/* Danh sách vật phẩm chi tiết trong gói */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Danh Mục Lễ Vật & Hạng Mục Đi Kèm Trong Gói
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700">
                  {selectedProduct.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-stone-50 border border-stone-100">
                      <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal CTAs */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="tel:0988123456"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-300 hover:border-stone-500 text-stone-700 text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-rose-800" />
                  <span>Gọi Tư Vấn Nhanh</span>
                </a>

                <button
                  onClick={() => {
                    const prod = selectedProduct;
                    setSelectedProduct(null);
                    onOpenBooking(prod.toneId, prod.title);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold shadow-md cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>Đặt Lịch Tư Vấn Cho Gói Này</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
