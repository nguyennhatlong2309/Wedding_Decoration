import sys
import os
import time
import io
import re
import json
import urllib.request
from datetime import datetime

# Enable real-time line buffering
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', line_buffering=True)
from playwright.sync_api import sync_playwright

CURRENT_YEAR = 2026
CUTOFF_DATE = datetime(2023, 12, 1)

TARGET_DIRS = [
    r"C:\Long\Long\PersonalProject\Wedding_Decoration\images",
    r"C:\Long\Long\PersonalProject\Wedding_Decoration\public\images\fb_photos"
]

for d in TARGET_DIRS:
    os.makedirs(d, exist_ok=True)

def parse_fb_date(date_str: str) -> datetime | None:
    if not date_str:
        return None
    d = date_str.lower().strip()
    
    if any(k in d for k in ["vừa xong", "phút", "giờ", "ngày", "hôm qua", "hôm nay", "tuần"]):
        return datetime(CURRENT_YEAR, 10, 1)

    m = re.search(r'(\d{1,2})\s+tháng\s+(\d{1,2})(?:[,\s]+(\d{4}))?', d)
    if m:
        day = int(m.group(1))
        month = int(m.group(2))
        year = int(m.group(3)) if m.group(3) else CURRENT_YEAR
        try:
            return datetime(year, month, day)
        except ValueError:
            return None

    m_year = re.search(r'\b(202[0-6])\b', d)
    if m_year:
        return datetime(int(m_year.group(1)), 1, 1)

    return None

def close_modals(page):
    for selector in ['div[aria-label="Đóng"]', 'div[aria-label="Close"]', 'div[role="dialog"] i', '[aria-label="Đóng"]']:
        try:
            btn = page.query_selector(selector)
            if btn:
                btn.click()
                time.sleep(0.3)
        except Exception:
            pass

def collect_photos_from_url(page, url, max_scrolls=25):
    print(f"\nScanning: {url}")
    page.goto(url, wait_until="domcontentloaded", timeout=30000)
    time.sleep(3)
    close_modals(page)
    
    collected_links = set()
    no_new_count = 0
    
    for i in range(max_scrolls):
        close_modals(page)
        links = page.query_selector_all("a[href*='/photo']")
        current_len = len(collected_links)
        
        for a in links:
            href = a.get_attribute("href")
            if href and "fbid=" in href:
                # Prepend domain if relative
                if href.startswith("/"):
                    href = "https://www.facebook.com" + href
                # Strip tracking params
                clean_link = href.split("&set=")[0] if "&set=" in href else href
                collected_links.add(clean_link)
                
        new_found = len(collected_links) - current_len
        print(f"  Scroll {i+1}/{max_scrolls}: {len(collected_links)} total links (+{new_found})")
        
        if new_found == 0:
            no_new_count += 1
            if no_new_count >= 3:
                print("  No new photos loaded, moving to next album.")
                break
        else:
            no_new_count = 0
            
        page.evaluate("window.scrollBy(0, 1800)")
        time.sleep(1.8)
        
    return collected_links

def download_image(img_url, dest_paths):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.facebook.com/'
    }
    req = urllib.request.Request(img_url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = resp.read()
            for path in dest_paths:
                with open(path, 'wb') as f:
                    f.write(data)
            return True
    except Exception as e:
        print(f"Error downloading {img_url[:60]}: {e}")
        return False

def main():
    album_urls = [
        "https://www.facebook.com/nguyen.maily.244865/photos_by",
        "https://www.facebook.com/media/set/?set=a.371407687519649&type=3", # Hoa quả_tráp cưới hỏi
        "https://www.facebook.com/media/set/?set=a.765686724758408&type=3", # Bàn gia tiên.bàn họ
        "https://www.facebook.com/media/set/?set=a.106027304057690&type=3", # Tải lên từ di động
    ]

    all_links = set()

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 900},
            locale="vi-VN"
        )
        page = context.new_page()

        # Phase 1: Collect photo links
        for a_url in album_urls:
            try:
                links = collect_photos_from_url(page, a_url, max_scrolls=20)
                all_links.update(links)
            except Exception as e:
                print(f"Error scanning {a_url}: {e}")

        print(f"\n==========================================")
        print(f"TOTAL UNIQUE PHOTO LINKS COLLECTED: {len(all_links)}")
        print(f"==========================================")

        # Phase 2: Process each photo, check date, and download
        downloaded_count = 0
        skipped_older_count = 0
        skipped_error_count = 0
        manifest = []

        link_list = list(all_links)

        for idx, plink in enumerate(link_list):
            try:
                # Ensure valid absolute URL
                if plink.startswith("/"):
                    plink = "https://www.facebook.com" + plink
                    
                # Extract fbid
                fbid_match = re.search(r'fbid=(\d+)', plink)
                fbid = fbid_match.group(1) if fbid_match else f"photo_{idx+1}"
                
                # Check if already downloaded
                already_exists = False
                for existing_file in os.listdir(TARGET_DIRS[0]):
                    if fbid in existing_file:
                        already_exists = True
                        break
                        
                if already_exists:
                    print(f"[{idx+1}/{len(link_list)}] fbid={fbid} already downloaded. Skipping.")
                    downloaded_count += 1
                    continue

                print(f"[{idx+1}/{len(link_list)}] Navigating to fbid={fbid}...")
                page.goto(plink, wait_until="domcontentloaded", timeout=15000)
                time.sleep(2)
                close_modals(page)

                # Extract date from page text
                body_text = page.evaluate("() => document.body.innerText")
                lines = [l.strip() for l in body_text.split("\n") if l.strip()]

                raw_date = "Unknown"
                caption = ""
                for l_idx, line in enumerate(lines):
                    if "Nguyễn Maily" in line and l_idx + 1 < len(lines):
                        raw_date = lines[l_idx + 1].replace(", xem bài viết", "").strip()
                        if l_idx + 3 < len(lines) and lines[l_idx + 2] in ["·", ""]:
                            caption = lines[l_idx + 3]
                        break

                parsed_date = parse_fb_date(raw_date)
                
                # Check cutoff: >= 2023-12-01
                if parsed_date and parsed_date < CUTOFF_DATE:
                    print(f"  -> Skipped: Date {parsed_date.strftime('%Y-%m-%d')} is before 01/12/2023 ('{raw_date}')")
                    skipped_older_count += 1
                    continue

                # Find highest resolution image source
                img_src = None
                imgs = page.query_selector_all('div[role="main"] img, img[data-visualcompletion="media-vc-image"], div[data-visualcompletion="media-vc-image"] img')
                for img in imgs:
                    src = img.get_attribute("src")
                    if src and "scontent" in src:
                        img_src = src
                        break

                if not img_src:
                    for img in page.query_selector_all("img"):
                        src = img.get_attribute("src")
                        if src and "scontent" in src and "t39" in src:
                            img_src = src
                            break

                if not img_src:
                    print(f"  -> Skipped: Could not find image src on page.")
                    skipped_error_count += 1
                    continue

                # Prepare filename
                date_str = parsed_date.strftime("%Y%m%d") if parsed_date else "recent"
                filename = f"fb_{date_str}_{fbid}.jpg"
                dest_paths = [os.path.join(d, filename) for d in TARGET_DIRS]

                success = download_image(img_src, dest_paths)
                if success:
                    downloaded_count += 1
                    print(f"  -> SUCCESS: Saved {filename} (Date: {raw_date})")
                    manifest.append({
                        "fbid": fbid,
                        "filename": filename,
                        "date_raw": raw_date,
                        "date_iso": parsed_date.isoformat() if parsed_date else None,
                        "caption": caption[:100],
                        "link": plink
                    })
                else:
                    skipped_error_count += 1

            except Exception as e:
                print(f"  -> Error processing {plink}: {e}")
                skipped_error_count += 1

        browser.close()

    # Save manifest
    manifest_path = r"C:\Long\Long\PersonalProject\Wedding_Decoration\images\photos_metadata.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print("\n==========================================")
    print("DOWNLOAD SUMMARY:")
    print(f"Total downloaded (>= 01/12/2023): {downloaded_count}")
    print(f"Skipped (< 01/12/2023): {skipped_older_count}")
    print(f"Skipped (errors/no img): {skipped_error_count}")
    print(f"Metadata saved to: {manifest_path}")
    print("==========================================")

if __name__ == "__main__":
    main()
