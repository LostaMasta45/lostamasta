"""Cache original media, generate local WebP/MP4 variants, and keep URL provenance."""
from concurrent.futures import ThreadPoolExecutor, as_completed
from io import BytesIO
from pathlib import Path
import hashlib
import json
import re
import shutil
import subprocess
import time

import requests
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / '.sites-runtime' / 'original-media'
OUT = ROOT / 'public' / 'media'
CACHE.mkdir(parents=True, exist_ok=True)
OUT.mkdir(parents=True, exist_ok=True)
SOURCE = (ROOT / 'losta_masta_spesialis_pembuatan_website.tsx').read_text(encoding='utf-8')
URLS = list(dict.fromkeys(re.findall(r'https://[^\s\'"<>`]+', SOURCE)))
URLS = [u for u in URLS if any(h in u for h in ['motionsites.ai/assets/', 'images.higgs.ai/', '.figma.site/_components/'])]
FFMPEG = shutil.which('ffmpeg')
MANIFEST = ROOT / 'src' / 'media-manifest.json'
EXISTING = {asset['source']: asset for asset in json.loads(MANIFEST.read_text(encoding='utf-8'))} if MANIFEST.exists() else {}


def download(url):
    suffix = '.gif' if '.gif' in url else '.image'
    target = CACHE / (hashlib.sha256(url.encode()).hexdigest()[:20] + suffix)
    if target.exists():
        return target
    for attempt in range(2):
        try:
            started = time.monotonic()
            with requests.get(url, stream=True, timeout=(12, 35)) as response:
                response.raise_for_status()
                chunks = []
                size = 0
                for chunk in response.iter_content(256 * 1024):
                    chunks.append(chunk)
                    size += len(chunk)
                    if size > 50 * 1024 * 1024 or time.monotonic() - started > 100:
                        raise RuntimeError('Media exceeds download budget')
                data = b''.join(chunks)
            with Image.open(BytesIO(data)) as image:
                image.verify()
            target.write_bytes(data)
            return target
        except Exception:
            if attempt:
                raise


def webp(image, name, width, quality=80):
    converted = ImageOps.exif_transpose(image).convert('RGBA' if 'A' in image.getbands() else 'RGB')
    converted.thumbnail((width, 4000), Image.Resampling.LANCZOS)
    path = OUT / name
    converted.save(path, 'WEBP', quality=quality, method=6)
    return {'url': '/media/' + name, 'width': converted.width, 'height': converted.height, 'bytes': path.stat().st_size}


def process(job):
    index, url = job
    existing = EXISTING.get(url)
    if existing:
        paths = [v['url'] for v in existing.get('variants', [])]
        if existing.get('video'):
            paths.extend([existing['video'], existing['poster']['url']])
        if paths and all((ROOT / 'public' / p.lstrip('/')).is_file() for p in paths):
            return existing
    original = download(url)
    with Image.open(original) as image:
        size = [image.width, image.height]
        if '.gif' in url:
            name = f'gallery-{index:02d}'
            poster = webp(image, name + '.webp', 640, 78)
            video = OUT / (name + '.mp4')
            if not video.exists():
                result = subprocess.run([
                    FFMPEG, '-y', '-hide_banner', '-loglevel', 'error', '-i', str(original),
                    '-map', '0:v:0', '-an', '-vf', 'fps=15,scale=640:-2,setsar=1',
                    '-c:v', 'libx264', '-crf', '26', '-preset', 'medium', '-threads', '2',
                    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(video),
                ], capture_output=True, text=True, timeout=120)
                if result.returncode:
                    raise RuntimeError(result.stderr[-500:])
            return {'source': url, 'kind': 'gallery', 'originalBytes': original.stat().st_size, 'originalSize': size,
                    'poster': poster, 'video': '/media/' + video.name, 'videoBytes': video.stat().st_size}
        if 'Rectangle_40443' in url:
            name, widths, kind = 'hero', [480, 800], 'hero'
        elif 'images.higgs.ai' in url:
            name, widths, kind = f'project-{index:02d}', [480, 960], 'project'
        else:
            name, widths, kind = f'decoration-{index:02d}', [360], 'decoration'
        variants = [webp(image, f'{name}-{w}.webp', w) for w in widths]
        return {'source': url, 'kind': kind, 'originalBytes': original.stat().st_size,
                'originalSize': size, 'variants': variants}


def fonts():
    license_url = 'https://raw.githubusercontent.com/google/fonts/main/ofl/kanit/OFL.txt'
    license_response = requests.get(license_url, timeout=30)
    license_response.raise_for_status()
    if 'SIL OPEN FONT LICENSE' not in license_response.text:
        raise RuntimeError('Font license could not be verified')
    (OUT / 'Kanit-OFL.txt').write_text(license_response.text, encoding='utf-8')
    url = 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap'
    css = requests.get(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'}, timeout=30)
    css.raise_for_status()
    rules = []
    for block in css.text.split('/* latin */')[1:]:
        rule = block.split('}')[0] + '}'
        match = re.search(r'url\((https://[^)]+)\)', rule)
        weight = re.search(r'font-weight:\s*(\d+)', rule)
        if not match or not weight:
            continue
        filename = f'kanit-latin-{weight.group(1)}.woff2'
        target = OUT / filename
        if not target.exists():
            response = requests.get(match.group(1), timeout=30)
            response.raise_for_status()
            target.write_bytes(response.content)
        rules.append(rule.replace(match.group(1), '/media/' + filename))
    if len(rules) != 7:
        raise RuntimeError(f'Expected 7 Latin font weights, received {len(rules)}')
    (ROOT / 'src' / 'fonts.css').write_text('\n'.join(rules) + '\n', encoding='utf-8')
    return {'fonts': len(rules), 'fontBytes': sum(p.stat().st_size for p in OUT.glob('*.woff2'))}


if __name__ == '__main__':
    results = []
    errors = []
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(process, job): job for job in enumerate(URLS, 1)}
        font_task = pool.submit(fonts)
        for future in as_completed(futures):
            index, url = futures[future]
            try:
                results.append(future.result())
            except Exception as error:
                errors.append({'asset': index, 'host': requests.utils.urlparse(url).hostname, 'error': str(error)[:300]})
            if (len(results) + len(errors)) % 5 == 0:
                print(json.dumps({'completed': len(results), 'errors': len(errors), 'total': len(URLS)}), flush=True)
        try:
            font_result = font_task.result()
        except Exception as error:
            errors.append({'asset': 'fonts', 'error': str(error)[:300]})
            font_result = {}
    results.sort(key=lambda a: URLS.index(a['source']))
    (ROOT / 'src' / 'media-manifest.json').write_text(json.dumps(results, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'success': len(results), 'originalBytes': sum(r['originalBytes'] for r in results),
                      'outputBytes': sum(p.stat().st_size for p in OUT.iterdir()), **font_result, 'errors': errors}), flush=True)
    if errors:
        raise SystemExit(1)
