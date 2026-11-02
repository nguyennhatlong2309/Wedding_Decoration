import sys, os
sys.path.append(os.path.dirname(__file__))
from test_v2 import composite_product

sample = r"images/trap/fb_20250803_1465882498072157_nobg.png"
composite_product(
    "images/backgrounds/bg_ceremony_red_runner.jpg",
    sample,
    "C:/Users/Lenovo/.gemini/antigravity-cli/brain/3559f2a1-0103-4428-907a-2916ca84d27d/sample_runner_v1.jpg",
    target_h=470,
    base_y=690
)
