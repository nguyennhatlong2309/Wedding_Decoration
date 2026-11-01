import React, { useState } from 'react';
import { TONES } from '../data/decorData';
import { X, Sparkles, Phone, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialToneId?: string;
  initialServiceTitle?: string;
  initialPrice?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialToneId,
  initialServiceTitle,
  initialPrice: _initialPrice,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('Lễ Cưới & Gia Tiên Trọn Gói');
  const [selectedTone, setSelectedTone] = useState(initialToneId || 'tone-red');
  const [locationType, setLocationType] = useState('Tư gia (Nhà riêng)');
  const [note, setNote] = useState(
    initialServiceTitle ? `Quan tâm gói: ${initialServiceTitle}` : ''
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      alert('Vui lòng cung cấp số điện thoại hoặc Zalo để chuyên viên liên hệ hỗ trợ!');
      return;
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E58B9C', '#C5A059', '#9E1B32', '#6299C9'],
      });
    } catch {
      // fallback if canvas-confetti fails
    }

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="space-y-2 mb-6 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-900 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Nhận Khảo Sát & Bản Vẽ Phối Cảnh 3D Miễn Phí</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Đăng Ký Tư Vấn Không Gian
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                Chuyên viên thiết kế của MÂY DECOR sẽ liên hệ trực tiếp trong vòng 15 phút để hỗ trợ báo giá và chuẩn bị bản vẽ 3D.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block">
                    Họ & Tên (CD / CR / Phụ huynh) *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="VD: Nguyễn Mai Anh"
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-900 focus:outline-hidden transition-all text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block">
                    Số Điện Thoại / Zalo *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="VD: 0988 123 456"
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-900 focus:outline-hidden transition-all text-xs"
                  />
                </div>
              </div>

              {/* Event Date & Event Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block">
                    Ngày Dự Kiến Diễn Ra Lễ
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-900 focus:outline-hidden transition-all text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block">
                    Loại Hình Sự Kiện
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-900 focus:outline-hidden transition-all text-xs"
                  >
                    <option value="Lễ Cưới & Gia Tiên Trọn Gói">Lễ Cưới & Gia Tiên Trọn Gói</option>
                    <option value="Mâm Tráp Cưới Hỏi (5-9 Tráp)">Mâm Tráp Cưới Hỏi (5-9 Tráp)</option>
                    <option value="Tiệc Cưới Sân Khấu & Sảnh Tiệc">Tiệc Cưới Sân Khấu & Sảnh Tiệc</option>
                    <option value="Tiệc Thôi Nôi Bé Yêu (1 Tuổi)">Tiệc Thôi Nôi Bé Yêu (1 Tuổi)</option>
                    <option value="Lễ Đầy Tháng & Cúng Mụ">Lễ Đầy Tháng & Cúng Mụ</option>
                    <option value="Dịch Vụ Khác">Dịch Vụ Khác</option>
                  </select>
                </div>
              </div>

              {/* Tone Selection */}
              <div className="space-y-1.5">
                <label className="font-semibold text-stone-700 block">
                  Tone Màu Yêu Thích Của Bạn
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TONES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTone(t.id)}
                      className={`p-2 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedTone === t.id
                          ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                          : 'border-stone-200 bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: t.primaryColor }}
                      />
                      <span className="truncate text-[11px]">{t.name}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelectedTone('consult')}
                    className={`p-2 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTone === 'consult'
                        ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                        : 'border-stone-200 bg-stone-50 text-stone-700'
                    }`}
                  >
                    <span>💬 Cần Tư Vấn Thêm</span>
                  </button>
                </div>
              </div>

              {/* Location Type */}
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">
                  Địa Điểm Dự Kiến Tổ Chức
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {['Tư gia (Nhà riêng)', 'Trung tâm tiệc cưới', 'Ngoài trời / Khác'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setLocationType(loc)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        locationType === loc
                          ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                          : 'border-stone-200 bg-stone-50 text-stone-700'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">
                  Ghi Chú Hoặc Mong Muốn Riêng
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="VD: Không gian phòng khách rộng 25m2, muốn phối thêm hoa lan hồ điệp trắng..."
                  className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-900 focus:outline-hidden transition-all text-xs"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Xác Nhận Nhận Tư Vấn & Phối Cảnh 3D</span>
                </button>
                <p className="text-center text-[10px] text-stone-400 mt-2">
                  🔒 Thông tin của bạn được bảo mật tuyệt đối. Chúng tôi không gửi spam.
                </p>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-8 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Đăng Ký Thành Công!
              </h3>
              <p className="text-sm text-stone-600 max-w-sm mx-auto">
                Cảm ơn <strong>{fullName || 'quý khách'}</strong> đã gửi niềm tin tới MÂY DECOR. Chuyên viên sẽ gọi điện / nhắn tin Zalo qua số <strong>{phone}</strong> trong vòng 15 phút.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1.5 text-left max-w-sm mx-auto">
              <div className="flex justify-between">
                <span>Loại sự kiện:</span>
                <span className="font-semibold text-stone-900">{eventType}</span>
              </div>
              <div className="flex justify-between">
                <span>Tone màu:</span>
                <span className="font-semibold text-stone-900">
                  {TONES.find((t) => t.id === selectedTone)?.name || 'Cần tư vấn thêm'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Địa điểm:</span>
                <span className="font-semibold text-stone-900">{locationType}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="tel:0988123456"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-stone-900 text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>Gọi Hotline Trực Tiếp</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
