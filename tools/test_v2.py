import os
from PIL import Image, ImageFilter, ImageOps, ImageEnhance, ImageDraw

def create_polished_reflection(trap_rgba, max_reflection_h=120, initial_alpha=0.25):
    w, h = trap_rgba.size
    flipped = ImageOps.flip(trap_rgba)
    
    # Take only top portion of flipped image (which is the bottom of original)
    crop_h = min(h, max_reflection_h)
    ref_part = flipped.crop((0, 0, w, crop_h))
    
    # Create linear gradient mask
    mask = Image.new('L', (w, crop_h))
    draw = ImageDraw.Draw(mask)
    for y in range(crop_h):
        # Fade from initial_alpha at y=0 down to 0 at y=crop_h
        val = int(255 * initial_alpha * (1.0 - (y / crop_h) ** 0.8))
        draw.line([(0, y), (w, y)], fill=val)
        
    # Combine with original alpha
    ref_alpha = ref_part.split()[-1]
    # Multiply alphas
    combined_alpha = Image.new('L', (w, crop_h))
    pixels_ref = ref_alpha.load()
    pixels_mask = mask.load()
    pixels_comb = combined_alpha.load()
    for y in range(crop_h):
        for x in range(w):
            pixels_comb[x, y] = int((pixels_ref[x, y] * pixels_mask[x, y]) / 255)
            
    ref_part.putalpha(combined_alpha)
    # Slight blur to simulate polished wood surface roughness
    ref_part = ref_part.filter(ImageFilter.GaussianBlur(radius=1.8))
    return ref_part

def make_realistic_shadow(trap_rgba):
    w, h = trap_rgba.size
    alpha = trap_rgba.split()[-1]
    
    # 1. Contact shadow (razor sharp under base)
    bottom_h = max(10, int(h * 0.12))
    base_mask = alpha.crop((0, h - bottom_h, w, h))
    
    cs_w = int(w * 0.96)
    cs_h = max(6, int(bottom_h * 0.25))
    cs_alpha = base_mask.resize((cs_w, cs_h), Image.Resampling.LANCZOS)
    cs_alpha = cs_alpha.filter(ImageFilter.GaussianBlur(radius=3.5))
    
    contact_shadow = Image.new('RGBA', (cs_w, cs_h), (18, 8, 6, 0))
    contact_shadow.putalpha(ImageEnhance.Brightness(cs_alpha).enhance(0.85))
    
    # 2. Ambient drop shadow (soft diffuse warm glow underneath)
    as_w = int(w * 1.08)
    as_h = max(12, int(h * 0.16))
    as_alpha = base_mask.resize((as_w, as_h), Image.Resampling.LANCZOS)
    as_alpha = as_alpha.filter(ImageFilter.GaussianBlur(radius=12))
    
    ambient_shadow = Image.new('RGBA', (as_w, as_h), (25, 12, 10, 0))
    ambient_shadow.putalpha(ImageEnhance.Brightness(as_alpha).enhance(0.55))
    
    return contact_shadow, ambient_shadow

def composite_product(bg_path, trap_path, out_path, target_h=510, base_y=662):
    bg = Image.open(bg_path).convert('RGBA')
    bg_w, bg_h = bg.size
    
    trap = Image.open(trap_path).convert('RGBA')
    bbox = trap.getbbox()
    if bbox:
        trap = trap.crop(bbox)
        
    t_w, t_h = trap.size
    scale = target_h / t_h
    target_w = int(t_w * scale)
    
    # Cap width
    if target_w > int(bg_w * 0.72):
        scale = (bg_w * 0.72) / t_w
        target_w = int(t_w * scale)
        target_h = int(t_h * scale)
        
    trap_resized = trap.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    pos_x = (bg_w - target_w) // 2
    pos_y = base_y - target_h
    
    # 1. Reflection
    reflection = create_polished_reflection(trap_resized, max_reflection_h=90, initial_alpha=0.30)
    ref_x = pos_x
    ref_y = base_y - 2
    
    # 2. Shadows
    contact_shadow, ambient_shadow = make_realistic_shadow(trap_resized)
    
    # Ambient shadow position
    as_x = pos_x - (ambient_shadow.width - target_w) // 2
    as_y = base_y - int(ambient_shadow.height * 0.45)
    
    # Contact shadow position
    cs_x = pos_x - (contact_shadow.width - target_w) // 2
    cs_y = base_y - int(contact_shadow.height * 0.5)
    
    # Composite layers:
    # 1. Background
    # 2. Reflection
    bg.alpha_composite(reflection, (ref_x, ref_y))
    # 3. Ambient Shadow
    bg.alpha_composite(ambient_shadow, (as_x, as_y))
    # 4. Contact Shadow
    bg.alpha_composite(contact_shadow, (cs_x, cs_y))
    # 5. Product Trap
    bg.alpha_composite(trap_resized, (pos_x, pos_y))
    
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    bg.convert('RGB').save(out_path, quality=96)
    print(f"Generated: {out_path}")

if __name__ == '__main__':
    sample = r"images/trap/fb_20250803_1465882498072157_nobg.png"
    # For Cream Studio: base_y is around 662
    composite_product("images/backgrounds/bg_wedding_studio_cream.jpg", sample, 
                      "C:/Users/Lenovo/.gemini/antigravity-cli/brain/3559f2a1-0103-4428-907a-2916ca84d27d/sample_cream_v2.jpg",
                      target_h=510, base_y=665)
    # For Royal Red: base_y is around 685
    composite_product("images/backgrounds/bg_wedding_royal_red.jpg", sample, 
                      "C:/Users/Lenovo/.gemini/antigravity-cli/brain/3559f2a1-0103-4428-907a-2916ca84d27d/sample_red_v2.jpg",
                      target_h=500, base_y=680)
