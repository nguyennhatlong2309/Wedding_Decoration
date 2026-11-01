import sys
import os
import argparse
from rembg import remove
from PIL import Image

def process_file(input_path: str, output_path: str = None):
    if not os.path.exists(input_path):
        print(f"Error: File not found: {input_path}")
        return False
        
    if not output_path:
        base, _ = os.path.splitext(input_path)
        output_path = f"{base}_nobg.png"
        
    print(f"Processing: {input_path} -> {output_path}")
    try:
        img = Image.open(input_path)
        out = remove(img)
        os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
        out.save(output_path, "PNG")
        print(f"SUCCESS: Saved transparent PNG to {output_path} (size: {out.size})")
        return True
    except Exception as e:
        print(f"Error processing {input_path}: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Tách nền ảnh tự động (AI Background Removal)")
    parser.add_argument("input", help="Đường dẫn file ảnh hoặc thư mục cần tách nền")
    parser.add_argument("-o", "--output", help="Đường dẫn file ảnh đầu ra (.png)")
    args = parser.parse_args()
    
    if os.path.isfile(args.input):
        process_file(args.input, args.output)
    elif os.path.isdir(args.input):
        valid_exts = (".jpg", ".jpeg", ".png", ".webp")
        files = [os.path.join(args.input, f) for f in os.listdir(args.input) if f.lower().endswith(valid_exts) and "_nobg" not in f]
        print(f"Found {len(files)} images to process in {args.input}...")
        for f in files:
            process_file(f)
    else:
        print(f"Path does not exist: {args.input}")

if __name__ == "__main__":
    main()
