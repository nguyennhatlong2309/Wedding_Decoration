# MÂY DECOR & WEDDING - Landing Page Nghệ Thuật Cưới & Lễ Nghi Trọn Gói

Landing Page sang trọng, chuẩn mỹ cảm đương đại dành cho thương hiệu trang trí tiệc cưới, mâm tráp ăn hỏi và sự kiện gia đình **MÂY DECOR & WEDDING**.

## ✨ Tính Năng Nổi Bật

- **Cinematic Hero:** Trải nghiệm thị giác tràn màn hình với nghệ thuật sắp đặt typography và video/hình ảnh ấn tượng.
- **Cuộn Mượt Lenis:** Tích hợp `@studio-freight/lenis` mang lại chuyển động cuộn êm ái, liền mạch.
- **Tone Studio (5 Tông màu chủ đạo):**
  - Đỏ Chu Sa Hoàng Kim (Truyền Thống & Phúc Lộc)
  - Hồng Pastel & Peach Romance (Ngọt Ngào & Thơ Mộng)
  - Trắng Tinh Khôi & Xanh Sage (Thanh Tao & Đương Đại)
  - Cam Cháy & Rustic Nắng Ấm (Ấm Áp & Phóng Khoáng)
  - Baby Cloud Pastel (Xứ Sở Cổ Tích Cho Thôi Nôi / Đầy Tháng)
- **Quy Trình Lễ Nghi Chuẩn Phong Tục:** Timeline trực quan từ Lễ Dạm Ngõ, Ăn Hỏi đến Lễ Vu Quy, Tân Hôn.
- **Bảng Dự Toán Chi Phí Tự Động (Cost Estimator):** Khách hàng dễ dàng dự trù ngân sách minh bạch.
- **Romantic Audio Player:** Widget phát nhạc nền cưới du dương với thanh visualizer sóng âm thanh sống động.
- **Visual Feedback Widget (Agentation):** Cho phép gắn cờ, chụp màn hình và ghi chú phản hồi trực quan trên trang web.
- **Bộ Công Cụ AI Tách Nền Mâm Tráp:** Tách nền trong suốt chất lượng cao toàn bộ kho ảnh mâm tráp cưới hỏi (`tools/batch_remove_bg.py`).

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Lucide Icons, Canvas-Confetti
- **Smooth Scroll:** `@studio-freight/lenis`
- **Feedback Tool:** `agentation`
- **AI Processing:** Python, `rembg`, ONNX Runtime (`bria-rmbg-2.0`), Pillow, Playwright

## 🚀 Khởi Chạy Dự Án

### Yêu Cầu
- Node.js 18+
- npm hoặc yarn

### Cài Đặt & Chạy Môi Trường Phát Triển
```bash
# Cài đặt dependencies
npm install

# Khởi chạy server phát triển
npm run dev
```

### Build Production
```bash
npm run build
```
