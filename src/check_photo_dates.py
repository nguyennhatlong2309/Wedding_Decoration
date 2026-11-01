import sys
import time
import io
import re

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        viewport={"width": 1280, "height": 900},
        locale="vi-VN"
    )
    
    page.goto("https://www.facebook.com/nguyen.maily.244865/photos_by", wait_until="domcontentloaded", timeout=30000)
    time.sleep(3)
    
    # Scroll to load photos
    photo_links = []
    seen = set()
    for _ in range(8):
        links = page.query_selector_all("a[href*='/photo']")
        for a in links:
            href = a.get_attribute("href")
            if href and "fbid=" in href and href not in seen:
                seen.add(href)
                photo_links.append(href)
        page.evaluate("window.scrollBy(0, 1500)")
        time.sleep(1.5)
        
    print(f"Total collected: {len(photo_links)}")
    
    # Check the first (newest) and the last (oldest among these 82)
    for idx in [0, len(photo_links)//2, len(photo_links)-1]:
        plink = photo_links[idx]
        page.goto(plink, wait_until="domcontentloaded", timeout=20000)
        time.sleep(2)
        txt = page.evaluate("() => document.body.innerText")
        lines = [l.strip() for l in txt.split("\n") if l.strip()]
        date_line = "Unknown"
        for i, l in enumerate(lines):
            if "Nguyễn Maily" in l and i + 1 < len(lines):
                date_line = lines[i+1]
                break
        print(f"Index {idx}: {plink[:60]} -> Date: {date_line}")
        
    browser.close()
