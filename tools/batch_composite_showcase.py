import os
import sys
import io
import time
from PIL import Image, ImageFilter, ImageOps, ImageEnhance, ImageDraw

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', line_buffering=True)

INPUT_DIR = r"images\trap"
BG_RED = r"images\backgrounds\bg_ceremony_red_runner.jpg"
BG_CREAM = r"images\backgrounds\bg_wedding_studio_cream.jpg"

OUT_BASE_DIRS = [
    r"images\trap_showcase",
    r"public\images\trap_showcase"
]

def create_polished_reflection(trap_rgba, max_reflection_h=80, initial_alpha=0.25):
    w, h = trap_rgba.size
    flipped = ImageOps.flip(trap_rgba)
    crop_h = min(h, max_reflection_h)
    ref_part = flipped.crop((0, 0, w, crop_h))
    
    mask = Image.new('L', (w, crop_h))
    draw = ImageDraw.Draw(mask)
    for y in range(crop_h):
        val = int(255 * initial_alpha * (1.0 - (y / crop_h) ** 0.8))
        draw.line([(0, y), (w, y)], fill=val)
        
    ref_alpha = ref_part.split()[-1]
    combined_alpha = Image.new('L', (w, crop_h))
    pixels_ref = ref_alpha.load()
    pixels_mask = mask.load()
    pixels_comb = combined_alpha.load()
    for y in range(crop_h):
        for x in range(w):
            pixels_comb[x, y] = int((pixels_ref[x, y] * pixels_mask[x, y]) / 255)
            
    ref_part.putalpha(combined_alpha)
    ref_part = ref_part.filter(ImageFilter.GaussianBlur(radius=1.5))
    return ref_part

def make_realistic_shadow(trap_rgba):
    w, h = trap_rgba.size
    alpha = trap_rgba.split()[-1]
    
    bottom_h = max(10, int(h * 0.12))
    base_mask = alpha.crop((0, h - bottom_h, w, h))
    
    cs_w = int(w * 0.96)
    cs_h = max(6, int(bottom_h * 0.25))
    cs_alpha = base_mask.resize((cs_w, cs_h), Image.Resampling.LANCZOS)
    cs_alpha = cs_alpha.filter(ImageFilter.GaussianBlur(radius=3.5))
    
    contact_shadow = Image.new('RGBA', (cs_w, cs_h), (18, 8, 6, 0))
    contact_shadow.putalpha(ImageEnhance.Brightness(cs_alpha).enhance(0.85))
    
    as_w = int(w * 1.08)
    as_h = max(12, int(h * 0.16))
    as_alpha = base_mask.resize((as_w, as_h), Image.Resampling.LANCZOS)
    as_alpha = as_alpha.filter(ImageFilter.GaussianBlur(radius=10))
    
    ambient_shadow = Image.new('RGBA', (as_w, as_h), (25, 12, 10, 0))
    ambient_shadow.putalpha(ImageEnhance.Brightness(as_alpha).enhance(0.55))
    
    return contact_shadow, ambient_shadow

def place_trap_on_canvas(canvas, trap_path, center_x, base_y, target_h, max_w_ratio=0.72):
    trap = Image.open(trap_path).convert('RGBA')
    bbox = trap.getbbox()
    if bbox:
        trap = trap.crop(bbox)
        
    t_w, t_h = trap.size
    scale = target_h / t_h
    target_w = int(t_w * scale)
    
    # Cap width
    max_w = int(canvas.width * max_w_ratio)
    if target_w > max_w:
        scale = max_w / t_w
        target_w = int(t_w * scale)
        target_h = int(t_h * scale)
        
    trap_resized = trap.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    pos_x = center_x - target_w // 2
    pos_y = base_y - target_h
    
    # 1. Reflection
    reflection = create_polished_reflection(trap_resized, max_reflection_h=70, initial_alpha=0.22)
    ref_x = pos_x
    ref_y = base_y - 2
    canvas.alpha_composite(reflection, (ref_x, ref_y))
    
    # 2. Shadows
    contact_shadow, ambient_shadow = make_realistic_shadow(trap_resized)
    as_x = pos_x - (ambient_shadow.width - target_w) // 2
    as_y = base_y - int(ambient_shadow.height * 0.45)
    canvas.alpha_composite(ambient_shadow, (as_x, as_y))
    
    cs_x = pos_x - (contact_shadow.width - target_w) // 2
    cs_y = base_y - int(contact_shadow.height * 0.5)
    canvas.alpha_composite(contact_shadow, (cs_x, cs_y))
    
    # 3. Product
    canvas.alpha_composite(trap_resized, (pos_x, pos_y))

def composite_single_image(bg_template, trap_path, target_h, base_y):
    canvas = bg_template.copy()
    cx = canvas.width // 2
    place_trap_on_canvas(canvas, trap_path, cx, base_y, target_h)
    return canvas.convert('RGB')

def build_grand_set(bg_path, items):
    bg = Image.open(bg_path).convert('RGBA')
    for trap_path, cx, by, th in items:
        if os.path.exists(trap_path):
            place_trap_on_canvas(bg, trap_path, cx, by, th, max_w_ratio=0.35)
    return bg.convert('RGB')

def main():
    print("=" * 60)
    print("BẮT ĐẦU TẠO PHÔNG NỀN & GHÉP MÂM TRÁP TỰ ĐỘNG (COMPOSITE SHOWCASE)")
    print("=" * 60)
    
    # Ensure dirs exist
    sub_dirs = ["red", "cream", "grand_sets"]
    for base in OUT_BASE_DIRS:
        for sub in sub_dirs:
            os.makedirs(os.path.join(base, sub), exist_ok=True)
            
    files = sorted([f for f in os.listdir(INPUT_DIR) if f.endswith('_nobg.png')])
    print(f"Tìm thấy {len(files)} ảnh mâm tráp cần ghép phông nền.")
    
    # Load background templates
    bg_red = Image.open(BG_RED).convert('RGBA')
    bg_cream = Image.open(BG_CREAM).convert('RGBA')
    
    # 1. Generate Individual Showcase (Tone Đỏ & Tone Kem)
    for idx, fname in enumerate(files, 1):
        trap_path = os.path.join(INPUT_DIR, fname)
        base_name = os.path.splitext(fname)[0].replace('_nobg', '')
        out_name = f"{base_name}_showcase.jpg"
        
        # Tone Đỏ (Ceremony Red Runner): target_h=470, base_y=685
        res_red = composite_single_image(bg_red, trap_path, target_h=470, base_y=685)
        for base in OUT_BASE_DIRS:
            out_p = os.path.join(base, "red", out_name)
            res_red.save(out_p, quality=95)
            
        # Tone Kem (Studio Cream): target_h=480, base_y=635
        res_cream = composite_single_image(bg_cream, trap_path, target_h=480, base_y=635)
        for base in OUT_BASE_DIRS:
            out_p = os.path.join(base, "cream", out_name)
            res_cream.save(out_p, quality=95)
            
        print(f"[{idx:2d}/{len(files)}] Đã tạo showcase cho: {out_name}")
        
    # 2. Generate Grand Panorama Sets (Dàn 5 Tráp Ăn Hỏi Cưới)
    print("\nĐang tạo ảnh đại cảnh Grand Panorama Set (Dàn 5 mâm tráp)...")
    grand_items = [
        # Back row
        ("images/trap/fb_20231209_1070927370901007_nobg.png", 260, 630, 290),
        ("images/trap/fb_20231209_1070927754234302_nobg.png", 1116, 630, 290),
        # Mid row
        ("images/trap/fb_20231209_1070927214234356_nobg.png", 460, 665, 350),
        ("images/trap/fb_20231209_1070927654234312_nobg.png", 916, 665, 350),
        # Centerpiece (Tráp Phượng Rồng Cau Tươi)
        ("images/trap/fb_20250803_1465882498072157_nobg.png", 688, 690, 420)
    ]
    
    grand_red = build_grand_set(BG_RED, grand_items)
    grand_cream = build_grand_set(BG_CREAM, grand_items)
    
    for base in OUT_BASE_DIRS:
        grand_red.save(os.path.join(base, "grand_sets", "grand_ceremony_set_red.jpg"), quality=96)
        grand_cream.save(os.path.join(base, "grand_sets", "grand_studio_set_cream.jpg"), quality=96)
        
    print("=" * 60)
    print("HOÀN TẤT TOÀN BỘ ẢNH SHOWCASE & ĐẠI CẢNH!")
    print(f"Tổng cộng: {len(files) * 2} ảnh đơn + 2 ảnh đại cảnh Panorama")
    for base in OUT_BASE_DIRS:
        print(f" - {base}")
    print("=" * 60)

if __name__ == '__main__':
    main()
