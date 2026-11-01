import React, { useState } from 'react';
import { TONES } from '../data/decorData';
import { Calculator, Sparkles, Gift, ArrowRight } from 'lucide-react';

interface CostEstimatorProps {
  onOpenBooking: (toneId?: string, serviceTitle?: string, estimatedPrice?: number) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onOpenBooking }) => {
  // Service selections
  const [trapOption, setTrapOption] = useState<number>(9500000); // default 9 tráp
  const [giaTienOption, setGiaTienOption] = useState<number>(7500000); // default gia tiên cao cấp
  const [tiecCuoiOption, setTiecCuoiOption] = useState<number>(0);
  const [thoiNoiOption, setThoiNoiOption] = useState<number>(0);
  const [selectedTone, setSelectedTone] = useState<string>('tone-red');

  // Add-ons
  const [addonBeTrap, setAddonBeTrap] = useState<boolean>(true);
  const [addonPhoto, setAddonPhoto] = useState<boolean>(false);
  const [addonCar, setAddonCar] = useState<boolean>(false);
  const [addonWelcome, setAddonWelcome] = useState<boolean>(true);

  // Pricing constants
  const ADDON_BE_TRAP_PRICE = 1200000;
  const ADDON_PHOTO_PRICE = 2500000;
  const ADDON_CAR_PRICE = 3000000;
  const ADDON_WELCOME_PRICE = 500000;

  // Calculation
  const mainServicesTotal = trapOption + giaTienOption + tiecCuoiOption + thoiNoiOption;
  
  let addonTotal = 0;
  if (addonBeTrap) addonTotal += ADDON_BE_TRAP_PRICE;
  if (addonPhoto) addonTotal += ADDON_PHOTO_PRICE;
  if (addonCar) addonTotal += ADDON_CAR_PRICE;
  if (addonWelcome) addonTotal += ADDON_WELCOME_PRICE;

  const rawTotal = mainServicesTotal + addonTotal;

  // Count how many main services chosen
  const chosenCount = [trapOption, giaTienOption, tiecCuoiOption, thoiNoiOption].filter(
    (v) => v > 0
  ).length;

  // Combo discount: 10% if >= 2 services
  const discountRate = chosenCount >= 2 ? 0.1 : 0;
  const discountAmount = Math.round(rawTotal * discountRate);
  const finalTotal = rawTotal - discountAmount;

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const handleSendEstimate = () => {
    const toneObj = TONES.find((t) => t.id === selectedTone);
    const summary = `Dự toán ước tính: ${chosenCount} hạng mục chính + tone ${toneObj?.name || ''} - Tổng: ${formatVND(finalTotal)}`;
    onOpenBooking(selectedTone, summary, finalTotal);
  };

  return (
    <section id="du-toan" className="py-20 sm:py-28 bg-[#FAF8F5] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-semibold uppercase tracking-[0.2em]">
            <Calculator className="w-3.5 h-3.5 text-amber-800" />
            <span>Công Cụ Minh Bạch & Dự Toán Nhanh</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Ước Tính Chi Phí Trọn Gói Trong 30 Giây
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Tự do lựa chọn các hạng mục cần thiết và tone màu yêu thích. Hệ thống sẽ tự động áp dụng ưu đãi combo và xuất bảng dự toán minh bạch, không phụ phí phát sinh.
          </p>
        </div>

        {/* Double Bezel Estimator Wrapper */}
        <div className="p-2 sm:p-4 bg-white/80 rounded-[2.5rem] ring-1 ring-stone-900/5 shadow-2xl">
          <div className="bg-white rounded-[calc(2.5rem-0.75rem)] p-6 sm:p-10 border border-stone-100 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left 7 Columns: Selection Form */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Mâm tráp */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
                  1. Gói Mâm Tráp Cưới Hỏi
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { label: 'Không chọn mâm tráp', price: 0 },
                    { label: 'Gói 5 Tráp Truyền Thống', price: 4800000 },
                    { label: 'Gói 7 Tráp Song Hỷ Lâm Môn', price: 6800000 },
                    { label: 'Gói 9 Tráp Rồng Phượng VIP', price: 9500000 },
                  ].map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setTrapOption(opt.price)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex justify-between items-center ${
                        trapOption === opt.price
                          ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                          : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-800'
                      }`}
                    >
                      <span className="font-medium">{opt.label}</span>
                      <span className={`font-semibold ${trapOption === opt.price ? 'text-amber-300' : 'text-rose-900'}`}>
                        {opt.price === 0 ? '0đ' : formatVND(opt.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Gia tiên & Tiệc cưới */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
                  2. Không Gian Gia Tiên Vu Quy / Tân Hôn
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { label: 'Không chọn gia tiên', price: 0 },
                    { label: 'Gia Tiên Tiêu Chuẩn (Hoa lụa)', price: 5500000 },
                    { label: 'Gia Tiên Cao Cấp (Hoa lụa + hoa tươi)', price: 7500000 },
                    { label: 'Gia Tiên Luxury (100% Hoa tươi)', price: 12500000 },
                  ].map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => setGiaTienOption(opt.price)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex justify-between items-center ${
                        giaTienOption === opt.price
                          ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                          : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-800'
                      }`}
                    >
                      <span className="font-medium">{opt.label}</span>
                      <span className={`font-semibold ${giaTienOption === opt.price ? 'text-amber-300' : 'text-rose-900'}`}>
                        {opt.price === 0 ? '0đ' : formatVND(opt.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Sân khấu tiệc & Thôi nôi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                    3. Sân Khấu & Sảnh Tiệc Cưới
                  </label>
                  <select
                    value={tiecCuoiOption}
                    onChange={(e) => setTiecCuoiOption(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-800 focus:outline-hidden focus:border-stone-900"
                  >
                    <option value={0}>Không chọn sảnh tiệc</option>
                    <option value={6000000}>Cổng hoa + Bàn Gallery (6.000.000đ)</option>
                    <option value={15000000}>Sân khấu 3D + Lối đi hoa (15.000.000đ)</option>
                    <option value={25000000}>Trọn gói Đại Tiệc 5 Sao (25.000.000đ)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                    4. Thôi Nôi / Đầy Tháng Bé
                  </label>
                  <select
                    value={thoiNoiOption}
                    onChange={(e) => setThoiNoiOption(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-800 focus:outline-hidden focus:border-stone-900"
                  >
                    <option value={0}>Không chọn tiệc cho bé</option>
                    <option value={2800000}>Mâm cúng Mụ 12 Bà Mụ chuẩn lễ (2.800.000đ)</option>
                    <option value={5500000}>Backdrop 3D Khinh khí cầu pastel (5.500.000đ)</option>
                    <option value={8500000}>Trọn gói VIP Lâu đài cổ tích (8.500.000đ)</option>
                  </select>
                </div>
              </div>

              {/* Step 4: Chọn Tone Màu */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
                  5. Chọn Tone Màu Trang Trí Chủ Đạo
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TONES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTone(t.id)}
                      className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center gap-2 ${
                        selectedTone === t.id
                          ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                          : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: t.primaryColor }}
                      />
                      <span className="truncate">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 5: Dịch vụ bổ sung */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
                  6. Dịch Vụ Bổ Sung Tối Ưu Lễ Nghi
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100">
                    <input
                      type="checkbox"
                      checked={addonBeTrap}
                      onChange={(e) => setAddonBeTrap(e.target.checked)}
                      className="rounded text-rose-900 focus:ring-rose-800"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-stone-800">Đội bưng tráp nam nữ (6 người)</span>
                      <span className="text-stone-500 text-[11px]">+1.200.000đ (Kèm áo dài đồng bộ)</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100">
                    <input
                      type="checkbox"
                      checked={addonPhoto}
                      onChange={(e) => setAddonPhoto(e.target.checked)}
                      className="rounded text-rose-900 focus:ring-rose-800"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-stone-800">Chụp ảnh phóng sự tiệc</span>
                      <span className="text-stone-500 text-[11px]">+2.500.000đ (1 photographer 1 buổi)</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100">
                    <input
                      type="checkbox"
                      checked={addonCar}
                      onChange={(e) => setAddonCar(e.target.checked)}
                      className="rounded text-rose-900 focus:ring-rose-800"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-stone-800">Xe hoa đón dâu kết hoa tươi</span>
                      <span className="text-stone-500 text-[11px]">+3.000.000đ (Mercedes đời mới)</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer hover:bg-stone-100">
                    <input
                      type="checkbox"
                      checked={addonWelcome}
                      onChange={(e) => setAddonWelcome(e.target.checked)}
                      className="rounded text-rose-900 focus:ring-rose-800"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-stone-800">Bảng Welcome mica vẽ tay</span>
                      <span className="text-stone-500 text-[11px]">+500.000đ (Tặng kèm giá gỗ)</span>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Receipt & Quote Summary */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-stone-900 text-white shadow-xl relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Bảng Dự Toán Dự Kiến
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Đã chọn {chosenCount} hạng mục chính
                  </span>
                </div>

                {/* Line Item Breakdown */}
                <div className="space-y-3 text-xs sm:text-sm">
                  {trapOption > 0 && (
                    <div className="flex justify-between text-stone-300">
                      <span>Mâm Tráp Cưới Hỏi</span>
                      <span className="font-semibold text-white">{formatVND(trapOption)}</span>
                    </div>
                  )}

                  {giaTienOption > 0 && (
                    <div className="flex justify-between text-stone-300">
                      <span>Trang Trí Gia Tiên</span>
                      <span className="font-semibold text-white">{formatVND(giaTienOption)}</span>
                    </div>
                  )}

                  {tiecCuoiOption > 0 && (
                    <div className="flex justify-between text-stone-300">
                      <span>Sân Khấu / Sảnh Tiệc</span>
                      <span className="font-semibold text-white">{formatVND(tiecCuoiOption)}</span>
                    </div>
                  )}

                  {thoiNoiOption > 0 && (
                    <div className="flex justify-between text-stone-300">
                      <span>Thôi Nôi / Đầy Tháng</span>
                      <span className="font-semibold text-white">{formatVND(thoiNoiOption)}</span>
                    </div>
                  )}

                  {addonTotal > 0 && (
                    <div className="flex justify-between text-stone-300">
                      <span>Dịch Vụ Bổ Sung</span>
                      <span className="font-semibold text-white">{formatVND(addonTotal)}</span>
                    </div>
                  )}

                  <div className="border-t border-stone-800 pt-3 flex justify-between text-stone-400 text-xs">
                    <span>Tone màu chủ đạo:</span>
                    <span className="text-amber-300 font-medium">
                      {TONES.find((t) => t.id === selectedTone)?.name}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800">
                      <span className="flex items-center gap-1.5 text-xs">
                        <Gift className="w-4 h-4 shrink-0" />
                        Ưu Đãi Combo (Giảm 10%)
                      </span>
                      <span>-{formatVND(discountAmount)}</span>
                    </div>
                  )}
                </div>

                {/* Total Row */}
                <div className="border-t border-stone-800 pt-4 flex flex-col gap-1">
                  <span className="text-xs text-stone-400 uppercase tracking-wider">
                    Tổng chi phí trọn gói ước tính:
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-300">
                    {formatVND(finalTotal)}
                  </span>
                  <span className="text-[11px] text-stone-400 italic">
                    * Giá đã bao gồm phí vận chuyển và thi công nội thành. Cam kết không phát sinh chi phí.
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 relative z-10">
                <button
                  onClick={handleSendEstimate}
                  className="w-full py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Gửi Dự Toán Nhận Phối Cảnh 3D</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[10px] text-stone-400 mt-2">
                  Chuyên viên MÂY DECOR sẽ liên hệ tư vấn trong vòng 15 phút.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
