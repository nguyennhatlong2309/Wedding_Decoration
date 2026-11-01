import os
import sys
import io
import time
from PIL import Image
from rembg import remove, new_session

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', line_buffering=True)

INPUT_DIR = r"images\trap"
OUTPUT_DIRS = [
    r"images\trap",
    r"public\images\trap"
]

for d in OUTPUT_DIRS:
    os.makedirs(d, exist_ok=True)

def main():
    print("=" * 50)
    print("BẮT ĐẦU TÁCH NỀN HÀNG LOẠT (BATCH BACKGROUND REMOVAL)")
    print(f"Thư mục nguồn: {INPUT_DIR}")
    print("=" * 50)

    # Pre-initialize session to keep model in memory
    print("Khởi tạo mô hình AI tách nền...")
    session = new_session()

    files = [
        f for f in os.listdir(INPUT_DIR)
        if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')) and not f.endswith('_nobg.png')
    ]

    total = len(files)
    print(f"Tìm thấy {total} ảnh cần tách nền.")

    success_count = 0
    start_time = time.time()

    for idx, fname in enumerate(files, 1):
        in_path = os.path.join(INPUT_DIR, fname)
        base_name, _ = os.path.splitext(fname)
        out_name = f"{base_name}_nobg.png"

        # Check if already processed
        all_exist = all(os.path.exists(os.path.join(d, out_name)) for d in OUTPUT_DIRS)
        if all_exist:
            print(f"[{idx}/{total}] Đã tách nền trước đó: {out_name} (Bỏ qua)")
            success_count += 1
            continue

        print(f"[{idx}/{total}] Đang xử lý: {fname}...")
        try:
            t0 = time.time()
            img = Image.open(in_path)
            # Remove background using persistent session
            out_img = remove(img, session=session)

            for d in OUTPUT_DIRS:
                target_path = os.path.join(d, out_name)
                out_img.save(target_path, "PNG")

            duration = time.time() - t0
            print(f"  -> HOÀN THÀNH trong {duration:.1f}s: {out_name} (Kích thước: {out_img.size})")
            success_count += 1
        except Exception as e:
            print(f"  -> LỖI khi xử lý {fname}: {e}")

    total_duration = time.time() - start_time
    print("=" * 50)
    print(f"TỔNG KẾT: Đã tách nền thành công {success_count}/{total} ảnh trong {total_duration:.1f}s!")
    print(f"Thư mục lưu trữ:")
    for d in OUTPUT_DIRS:
        print(f" - {d}")
    print("=" * 50)

if __name__ == "__main__":
    main()
