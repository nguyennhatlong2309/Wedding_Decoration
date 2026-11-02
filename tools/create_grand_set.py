import os
from PIL import Image, ImageFilter, ImageOps, ImageEnhance, ImageDraw

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

def place_trap_on_canvas(canvas, trap_path, center_x, base_y, target_h):
    trap = Image.open(trap_path).convert('RGBA')
    bbox = trap.getbbox()
    if bbox:
        trap = trap.crop(bbox)
        
    t_w, t_h = trap.size
    scale = target_h / t_h
    target_w = int(t_w * scale)
    trap_resized = trap.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    pos_x = center_x - target_w // 2
    pos_y = base_y - target_h
    
    # 1. Reflection
    reflection = create_polished_reflection(trap_resized, max_reflection_h=60, initial_alpha=0.22)
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

def build_grand_set(bg_path, out_path):
    bg = Image.open(bg_path).convert('RGBA')
    
    # 5 Traps arranged in classic ceremonial depth:
    # Back row (higher on table, smaller scale):
    # - Far Left: x = 320, base_y = 625, target_h = 310
    # - Far Right: x = 1056, base_y = 625, target_h = 310
    # Mid row:
    # - Left: x = 490, base_y = 660, target_h = 350
    # - Right: x = 886, base_y = 660, target_h = 350
    # Center Front:
    # - Center: x = 688, base_y = 690, target_h = 420
    
    items = [
        # Back row first (so foreground overlays naturally)
        ("images/trap/fb_20231209_1070927370901007_nobg.png", 320, 625, 300),
        ("images/trap/fb_20231209_1070927754234302_nobg.png", 1056, 625, 300),
        # Mid row
        ("images/trap/fb_20231209_1070927214234356_nobg.png", 470, 660, 350),
        ("images/trap/fb_20231209_1070927654234312_nobg.png", 906, 660, 350),
        # Centerpiece (Main Dragon/Phoenix)
        ("images/trap/fb_20250803_1465882498072157_nobg.png", 688, 690, 420)
    ]
    
    for trap_path, cx, by, th in items:
        if os.path.exists(trap_path):
            place_trap_on_canvas(bg, trap_path, cx, by, th)
            
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    bg.convert('RGB').save(out_path, quality=96)
    print(f"Grand set saved: {out_path}")

if __name__ == '__main__':
    build_grand_set(
        "images/backgrounds/bg_ceremony_red_runner.jpg",
        "C:/Users/Lenovo/.gemini/antigravity-cli/brain/3559f2a1-0103-4428-907a-2916ca84d27d/grand_set_red.jpg"
    )
    build_grand_set(
        "images/backgrounds/bg_wedding_studio_cream.jpg",
        "C:/Users/Lenovo/.gemini/antigravity-cli/brain/3559f2a1-0103-4428-907a-2916ca84d27d/grand_set_cream.jpg"
    )
