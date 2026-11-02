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


---
## Cập nhật lúc [2026-11-02 20:39] - Thiết Kế Phông Nền Studio & Ghép Mâm Tráp Tự Động (Composite Showcase)

### 1. Phông Nền Cưới Cao Cấp (Studio Backgrounds)
- **Mẫu 1 - Lễ Nghi Đỏ Hoàng Kim (`bg_ceremony_red_runner.jpg`):** Bàn lễ nghi gỗ gụ bóng cao cấp, dải khăn nhung đỏ thêu rồng phượng dát vàng, biểu tượng chữ Song Hỷ (囍) phát sáng ấm áp, đèn lồng và trụ hoa lan sen quý phái.
- **Mẫu 2 - Studio Tone Kem Ivory & Champagne (`bg_wedding_studio_cream.jpg`):** Bàn trưng bày viền dát vàng hoàng gia, rèm lụa mềm mại, ánh sáng spotlight dịu êm và đôn hoa trắng thanh nhã.

### 2. Công Cụ Ghép Mâm Tráp Tự Động (`tools/batch_composite_showcase.py`)
- **Hiệu ứng đổ bóng thực tế (Realistic Shadows):**
  - Contact Shadow sắc nét sát đáy tráp mô phỏng tiếp xúc vật lý mặt bàn.
  - Ambient Drop Shadow lan tỏa mềm mại tạo chiều sâu không gian.
  - Phản chiếu gương bề mặt bóng (Polished Table Reflection) có độ mờ và gradient suy giảm tự nhiên.
- **Xuất ảnh đa dạng:**
  - **36 ảnh đơn:** Ghép lần lượt 18 mâm tráp vào cả 2 mẫu phông nền đỏ và kem (`images/trap_showcase/red/` và `images/trap_showcase/cream/`).
  - **2 ảnh đại cảnh Panorama (Grand Ceremony Set):** Tái hiện trọn vẹn dàn 5 mâm tráp cưới hỏi chuẩn nghi lễ xếp tầng nghệ thuật trên bàn lễ gia tiên (`grand_ceremony_set_red.jpg` và `grand_studio_set_cream.jpg`).


---
## Cập nhật lúc [2026-11-02 20:46] - Tối Ưu Hiển Thị ToneStudio Theo Góp Ý Phản Hồi

### 1. Giảm Lớp Phủ Tối (Minimal Scrim)
- Loại bỏ 2 lớp gradient đen dày đặc (`via-stone-950/70` và `from-stone-950/90`).
- Thay thế bằng lớp phủ siêu mỏng `bg-gradient-to-t from-black/60 via-transparent to-black/15`, giúp hơn 90% diện tích bức ảnh không gian tiệc cưới hiển thị nguyên bản, sáng rõ và rực rỡ.

### 2. Tinh Gọn & Đẩy Thông Tin Về Hai Góc (Corner-Docked & Ultra Glassmorphic)
- **Góc dưới bên trái:** Cụm tiêu đề và nút đặt lịch được đóng gói trong card kính siêu trong suốt (`bg-black/35 backdrop-blur-md`), dạt hẳn về góc trái.
- **Góc dưới bên phải (`lg:col-span-5` cũ):** Bảng màu Pantone và danh sách hoa tươi phụ trợ được thiết kế thành widget nổi dạt sát góc phải (`bg-black/30 backdrop-blur-md`), giải phóng hoàn toàn vùng trung tâm của bức ảnh.
- **Nút "Chế độ ngắm ảnh" (View Only):** Bổ sung nút chuyển đổi ở góc trên bên phải cho phép ẩn/hiện toàn bộ các khối chữ chỉ với 1 click để chiêm ngưỡng 100% hình ảnh không bị che khuất.


---
## Cập nhật lúc [2026-11-02 20:51] - Thu Gọn Navbar & Chuyển Đổi Hero Sang Tone Sáng

### 1. Thu Gọn Thanh Điều Hướng (Compact Floating Navbar - `Navbar.tsx`)
- Chuyển đổi từ thanh dàn trải toàn màn hình (`w-[95%] max-w-7xl`) thành thanh capsule nổi tinh gọn (`w-auto max-w-[96%] px-3.5 sm:px-5 py-1.5 sm:py-2`).
- Thu gọn kích thước icon logo, font chữ điều hướng và nút CTA tư vấn gọn gàng.
- Giải phóng toàn bộ không gian hai bên mép trên màn hình giúp hình ảnh đằng sau hiển thị rộng thoáng và trọn vẹn hơn.

### 2. Chuyển Đổi Toàn Bộ Hero Sang Tone Sáng Lãng Mạn (`Hero.tsx`)
- **Phông nền & Màu chủ đạo:** Đổi từ nền tối đen (`bg-stone-950`) sang tone sáng lụa ngà sang trọng (`bg-[#FAF7F2] text-stone-900`).
- **Hình ảnh Slide 1:** Sử dụng ảnh lễ đường đón nắng mai hoàng gia rực rỡ (`/images/hero_light.jpg`) với mái vòm hoa hồng và hoa mẫu đơn trắng, ánh nắng sớm xuyên qua cửa kính cung điện.
- **Lớp phủ ánh sáng:** Loại bỏ toàn bộ lớp vignette đen tối tăm, thay bằng màn sương sáng nhẹ `from-[#FAF7F2] via-transparent to-white/40` giữ nguyên độ trong trẻo và rạng rỡ của bức ảnh.
- **Typography & Điều khiển:** Chữ tiêu đề Serif màu than chì quyền quý (`text-stone-900`), chữ thư pháp đỏ rượu nho (`text-rose-900`) và thanh chọn slide kính sáng sang trọng (`bg-white/80`).


---
## Cập nhật lúc [2026-11-02 21:03] - Tái Tạo 4 Bộ Ảnh Gia Tiên Studio Chuẩn 8K Theo Đúng Tone & Bố Cục Thực Tế

### 1. Tạo 4 Bộ Phối Cảnh Lễ Gia Tiên Mới Bằng AI (Không Logo & Chuẩn Tỷ Lệ 16:9)
- **Tone Xanh Cốm & Emerald (`giatien_sage_emerald.jpg`):** Tái tạo từ mẫu ảnh thực tế `sample_giatien_1.jpg`. Phông nhung xanh ngọc bích, rèm voan xanh cốm, chữ Song Hỷ mạ vàng, 2 trụ hoa lan hồ điệp trắng lớn đối xứng, bàn hai họ 12 ghế Chiavari vàng kim thắt nơ xanh.
- **Tone Hồng Pastel & Peach Romance (`giatien_blush_pink.jpg`):** Tái tạo từ mẫu ảnh `sample_giatien_5.jpg`. Phông lụa kem xếp ly với rèm sò rủ mềm mại, vòm hoa hồng mẫu đơn uốn lượn nghệ thuật, chữ Lễ Vu Quy dát vàng, bàn trải lụa hồng pastel và ghế Crossback gỗ sồi.
- **Tone Đỏ Chu Sa & Hoàng Kim (`giatien_royal_red.jpg`):** Tái tạo từ mẫu `sample_giatien_2.jpg`. Bàn thờ gia tiên gỗ gụ với bộ đỉnh đồng ngũ sự trang nghiêm, hoành phi Song Hỷ phát sáng ấm áp, rèm nhung đỏ thêu phượng hoàng và bàn tiệc khăn gấm đỏ.
- **Tone Xanh Baby & Bạc Kim Tuyến (`giatien_baby_blue.jpg`):** Tái tạo từ mẫu `sample_giatien_3.jpg`. Phông voan xanh baby đính đèn sao fairy lights, bàn tiệc phủ ren kim tuyến lấp lánh và ghế trắng nơ mây xanh.

### 2. Cập Nhật Vào Hệ Thống Dữ Liệu Web
- Đồng bộ hóa hình ảnh vào `images/gia_tien_studio/` và `public/images/gia_tien_studio/`.
- Cập nhật trực tiếp vào danh mục `TONES` và `PRODUCTS` trong `src/data/decorData.ts`.


---
## Cập nhật lúc [2026-11-02 21:43] - Nâng Cấp Banner Gia Tiên Full Màn Hình & Tinh Gọn Thanh Menu

### 1. Tinh Gọn Tối Đa Thanh Menu Điều Hướng (`Navbar.tsx` & `AudioPlayerWidget.tsx`)
- **Giảm mạnh kích thước chiếm dụng:** Thu gọn padding (`px-2.5 sm:px-4 py-1`), đưa chiều cao tổng thể thanh menu xuống mức siêu mỏng (~36-38px), giúp không gian xem ảnh trên màn hình lớn và laptop (như viewport 1707×772) hoàn toàn thoáng đãng, không bị che chắn.
- **Tinh chỉnh tỷ lệ chi tiết:**
  - Logo tròn thu gọn về `w-6 h-6`, tên thương hiệu `text-xs sm:text-[13px]`.
  - Liên kết điều hướng tinh chỉnh font `text-[11px] sm:text-xs`, khoảng cách `gap-3 xl:gap-5`.
  - Cụm widget phát nhạc `AudioPlayerWidget` thu gọn viền mỏng (`py-0.5`, nút play `w-5 h-5`), giữ trọn visualizer sóng nhạc tinh tế.
  - Nút gọi hotline và nút "Tư Vấn" thiết kế dạng capsule mini thanh mảnh.

### 2. Nâng Cấp Banner Gia Tiên Thành Trải Nghiệm Full Màn Hình Lướt Ngang (`ToneStudio.tsx`)
- **Trải nghiệm Full-Screen tương tự Hero:**
  - Thiết kế tràn viền toàn màn hình (`min-h-[100dvh]`), biến khu vực Gian Thờ Gia Tiên thành một triển lãm hình ảnh thực thụ.
  - Sử dụng toàn bộ **6 bộ ảnh phối cảnh Gia Tiên 16:9 chất lượng cao** vừa được tái tạo (`1_do_trang.jpg` đến `6_trang_xanhla.jpg`).
  - Lớp phủ gradient chỉ áp dụng rất mỏng ở viền trên và đáy, giải phóng hơn 85% diện tích trung tâm để chiêm ngưỡng trọn vẹn từng chi tiết bàn thờ, rèm lụa, chữ Song Hỷ và mâm quả rồng phượng.
- **Tính năng lướt ngang linh hoạt:**
  - Hỗ trợ thao tác vuốt cảm ứng trên màn hình cảm ứng/điện thoại/tablet (`Touch Swipe`).
  - Hỗ trợ phím mũi tên bàn phím (`←` và `→`) để chuyển đổi tức thì.
  - Nút mũi tên chuyển tone lớn (`ChevronLeft` / `ChevronRight`) dạng nút kính tròn nổi ở hai mép màn hình.
  - Thanh chọn tone lướt ngang (`overflow-x-auto`) đặt ở đáy màn hình với 6 tone màu trực quan:
    1. `Tone 01. Đỏ - Trắng` (Đỏ là màu chủ đạo)
    2. `Tone 02. Trắng - Đỏ` (Trắng là màu chủ đạo)
    3. `Tone 03. Trắng - Hồng` (Trắng là màu chủ đạo)
    4. `Tone 04. Trắng - Vàng` (Trắng là màu chủ đạo)
    5. `Tone 05. Trắng - Xanh Biển` (Trắng chủ đạo, xanh biển)
    6. `Tone 06. Trắng - Xanh Lá` (Trắng chủ đạo, xanh lá)
- **Hệ thống điều khiển & Thẻ thông tin nổi:**
  - **Thẻ bên trái:** Tên tone, ý nghĩa phong tục truyền thống/đương đại, đặc điểm bày trí gian thờ, nút "Đặt Lễ Gia Tiên Này" và "Xem Mâm Quả Đi Kèm".
  - **Thẻ bên phải:** Bảng mã màu Pantone hỗ trợ 1-click copy hex và gợi ý các loại hoa tươi chuyên dụng.
  - **Nút "Chế độ ngắm ảnh" (Eye toggle):** Cho phép ẩn toàn bộ thẻ chữ để thưởng thức 100% hình ảnh không tì vết.
