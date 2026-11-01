import React from 'react';
import { Phone, Mail, MapPin, Sparkles, Heart, ShieldCheck, Clock, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 sm:pt-20 pb-12 relative overflow-hidden">
      {/* Decorative ambient subtle circle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Gold Commitments Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-stone-800 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">100% Hoa Tươi Mới</h4>
              <p className="text-stone-400 text-[11px] mt-0.5">Nhập trong ngày, kiểm định tươi 24h</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">Đúng Giờ Hoàng Đạo</h4>
              <p className="text-stone-400 text-[11px] mt-0.5">Bàn giao trước giờ lễ từ 3 - 4 tiếng</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">Không Phát Sinh Chi Phí</h4>
              <p className="text-stone-400 text-[11px] mt-0.5">Hợp đồng rõ ràng, minh bạch từng chi tiết</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">Bản Vẽ Phối Cảnh 3D</h4>
              <p className="text-stone-400 text-[11px] mt-0.5">Khảo sát tận nơi & vẽ 3D hoàn toàn miễn phí</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-12 pb-12 border-b border-stone-800/80">
          
          {/* Brand Intro */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center font-serif text-xl font-bold border border-stone-700">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                  MÂY DECOR
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium mt-0.5">
                  Nghệ Thuật Lễ Nghi & Sự Kiện Trọng Đại
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Đơn vị tiên phong kết hợp mỹ cảm hiện đại và giá trị truyền thống trong nghệ thuật mâm tráp cưới hỏi, trang trí gia tiên, tiệc cưới và tiệc thôi nôi / đầy tháng cho bé tại Việt Nam.
            </p>

            <div className="pt-2 text-xs text-stone-400 flex items-center gap-1.5">
              <span>Được tạo nên bằng sự tận tụy & tình yêu</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-xs sm:text-sm">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
              Danh Mục Dịch Vụ
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#tone-studio" className="hover:text-amber-300 transition-colors">Studio 5 Tone Màu Chủ Đạo</a></li>
              <li><a href="#catalog" className="hover:text-amber-300 transition-colors">Mâm Tráp Rồng Phượng Sơn Mài</a></li>
              <li><a href="#catalog" className="hover:text-amber-300 transition-colors">Gia Tiên Vu Quy & Tân Hôn</a></li>
              <li><a href="#catalog" className="hover:text-amber-300 transition-colors">Sân Khấu & Lối Đi Lễ Đường</a></li>
              <li><a href="#catalog" className="hover:text-amber-300 transition-colors">Thôi Nôi & Đầy Tháng Cho Bé</a></li>
              <li><a href="#du-toan" className="hover:text-amber-300 transition-colors">Dự Toán Chi Phí Tự Động</a></li>
            </ul>
          </div>

          {/* Contact & Showroom */}
          <div className="md:col-span-4 space-y-3 text-xs sm:text-sm">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider">
              Hệ Thống Showroom
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Showroom 1: Số 88 Phố Huế, Quận Hai Bà Trưng, Hà Nội</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Showroom 2: Số 168 Võ Thị Sáu, Phường Võ Thị Sáu, Quận 3, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <a href="tel:0988123456" className="text-white font-bold hover:text-amber-300 transition-colors">
                  0988.123.456 (Hotline 24/7)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <span>tuvan@maydecor.vn</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 MÂY DECOR & WEDDING. Tất cả bản quyền được bảo hộ.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-stone-300 transition-colors">Chính Sách Bảo Mật</a>
            <span>·</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Điều Khoản Dịch Vụ</a>
            <span>·</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Cam Kết Chất Lượng</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
