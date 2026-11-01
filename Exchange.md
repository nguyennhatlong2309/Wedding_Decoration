# Exchange - Lịch sử Thay Đổi Dự Án (MÂY DECOR & WEDDING)

## [2026-11-01] Khởi tạo & Hoàn thiện Website Landing Page & Công cụ Tách Nền Mâm Tráp

### 1. Kiến trúc & Giao diện Website (Frontend)
- **Công nghệ cốt lõi:** React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Canvas-Confetti.
- **Cuộn mượt Lenis:** Tích hợp `@studio-freight/lenis` mượt mà, đồng bộ với header và hiệu ứng chuyển động.
- **Visual Feedback Widget (Agentation):** Nhúng thư viện `agentation` hỗ trợ đánh dấu, chụp và chú thích lỗi trực quan trên UI web.
- **Âm nhạc lễ cưới (Romantic Audio Player):** Widget phát nhạc nền cưới tự động hoặc điều khiển thủ công với visualizer sóng nhạc sống động.
- **Hero Cinematic:** Thiết kế full màn hình với typography nghệ thuật, nút điều hướng nhanh, badge bảo chứng thương hiệu.
- **Tone Studio (5 Tông màu chủ đạo):**
  - Tone Đỏ Chu Sa & Hoàng Kim (Truyền thống, Vương giả)
  - Tone Hồng Pastel & Peach Romance (Ngọt ngào, Lãng mạn)
  - Tone Trắng Tinh Khôi & Xanh Sage (Thanh tao, Đương đại)
  - Tone Cam Cháy & Nắng Ấm Rustic (Phóng khoáng, Ấm áp)
  - Tone Baby Cloud Pastel (Xứ sở thần tiên cho thôi nôi / đầy tháng)
- **Timeline Lễ Nghi:** Quy trình chuẩn mực từ Lễ Dạm Ngõ, Lễ Ăn Hỏi, Lễ Vu Quy/Tân Hôn đến Tiệc Mừng và Thôi Nôi.
- **Bảng Tính Dự Toán Chi Phí (Cost Estimator):** Cho phép khách hàng tự chọn gói dịch vụ và tính toán ngân sách tức thời.
- **Modal Đặt Lịch & Tư Vấn (Booking Modal):** Form liên hệ trực quan, hỗ trợ chọn ngày, số lượng khách, tông màu mong muốn.

### 2. Thu thập Dữ liệu & Tách Nền AI Mâm Tráp
- **Cào dữ liệu ảnh Facebook:** Script Playwright tự động thu thập ảnh mâm tráp, rạp cưới, gia tiên chất lượng cao.
- **Tách nền AI hàng loạt (`rembg` + ONNX `bria-rmbg-2.0`):**
  - Xây dựng script tối ưu `tools/batch_remove_bg.py` giữ session mô hình trong bộ nhớ.
  - Tách nền sạch 100% cho toàn bộ 18 ảnh mâm tráp trong thư mục `images/trap/`.
  - Loại bỏ hoàn toàn phông nền vàng/phòng khách, chỉ giữ lại tráp, cau tươi, bánh, hoa quả và cặp rồng phượng.
  - Đồng bộ xuất ra file PNG trong suốt (`*_nobg.png`) sang cả `images/trap/` và `public/images/trap/`.

### 3. Kiểm thử & Đóng gói
- Build TypeScript / Vite production không lỗi (`npm run build`).
- Đã dừng toàn bộ các tiến trình background.
