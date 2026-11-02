import os
import sys
from PIL import Image, ImageFilter, ImageOps, ImageEnhance

def make_shadow(img_rgba, shadow_type='both'):
    # img_rgba is already cropped tight
    w, h = img_rgba.size
    alpha = img_rgba.split()[-1]
    
    # Base shadow canvas
    canvas_w = int(w * 1.3)
    canvas_h = int(h * 0.5)
    shadow_layer = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
    
    # 1. Contact shadow (very close to bottom, sharp and dark)
    # Extract bottom 20% of alpha
    bottom_h = int(h * 0.25)
    bottom_crop = alpha.crop((0, h - bottom_h, w, h))
    # Squash vertically
    contact_w = int(w * 0.95)
    contact_h = int(bottom_h * 0.35)
    contact_alpha = bottom_crop.resize((contact_w, max(1, contact_h)), Image.Resampling.LANCZOS)
    contact_alpha = contact_alpha.filter(ImageFilter.GaussianBlur(radius=6))
    
    # Colorize to warm dark tone (not pure pitch black, matches luxury warm lighting)
    contact_shadow = Image.new('RGBA', (contact_w, contact_h), (25, 12, 10, 0))
    contact_shadow.putalpha(ImageEnhance.Brightness(contact_alpha).enhance(0.7))
    
    # 2. Soft spread shadow (wider, softer blur)
    spread_w = int(w * 1.1)
    spread_h = int(h * 0.22)
    spread_alpha = bottom_crop.resize((spread_w, max(1, spread_h)), Image.Resampling.LANCZOS)
    spread_alpha = spread_alpha.filter(ImageFilter.GaussianBlur(radius=18))
    spread_shadow = Image.new('RGBA', (spread_w, spread_h), (20, 10, 8, 0))
    spread_shadow.putalpha(ImageEnhance.Brightness(spread_alpha).enhance(0.45))
    
    # Paste both into shadow_layer
    ox_spread = (canvas_w - spread_w) // 2
    oy_spread = canvas_h - spread_h - 10
    shadow_layer.alpha_composite(spread_shadow, (ox_spread, oy_spread))
    
    ox_contact = (canvas_w - contact_w) // 2
    oy_contact = canvas_h - contact_h - 15
    shadow_layer.alpha_composite(contact_shadow, (ox_contact, oy_contact))
    
    return shadow_layer, (ox_contact, oy_contact)

def composite_single(bg_path, trap_path, out_path, target_height_ratio=0.72, table_y_ratio=0.76):
    bg = Image.open(bg_path).convert('RGBA')
    bg_w, bg_h = bg.size
    
    trap = Image.open(trap_path).convert('RGBA')
    bbox = trap.getbbox()
    if bbox:
        trap = trap.crop(bbox)
        
    t_w, t_h = trap.size
    
    # Target height on background
    target_h = int(bg_h * target_height_ratio)
    scale = target_h / t_h
    target_w = int(t_w * scale)
    
    # Limit width if it exceeds 75% of bg
    if target_w > int(bg_w * 0.75):
        scale = (bg_w * 0.75) / t_w
        target_w = int(t_w * scale)
        target_h = int(t_h * scale)
        
    trap_resized = trap.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Position: centered horizontally, bottom placed on table_y
    pos_x = (bg_w - target_w) // 2
    table_y = int(bg_h * table_y_ratio)
    pos_y = table_y - target_h
    
    # Create shadow
    shadow_layer, _ = make_shadow(trap_resized)
    s_w, s_h = shadow_layer.size
    s_x = pos_x - (s_w - target_w) // 2
    s_y = pos_y + target_h - int(s_h * 0.7)
    
    # Composite: bg -> shadow -> trap
    bg.alpha_composite(shadow_layer, (s_x, s_y))
    bg.alpha_composite(trap_resized, (pos_x, pos_y))
    
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    bg.convert('RGB').save(out_path, quality=95)
    print(f"Saved: {out_path} ({bg.size})")

if __name__ == '__main__':
    sample = r"images/trap/fb_20250803_1465882498072157_nobg.png"
    composite_single("images/backgrounds/bg_wedding_studio_cream.jpg", sample, "images/backgrounds/test_cream.jpg")
    composite_single("images/backgrounds/bg_wedding_royal_red.jpg", sample, "images/backgrounds/test_red.jpg")
