"""Import the exact expression images supplied in ../promptheadline.md.

Run from any directory with Python 3; no additional dependencies required.
"""
import concurrent.futures
import json
from pathlib import Path
import re
import urllib.request

PROJECT = Path(__file__).resolve().parents[1]
PROMPT = (PROJECT.parent / 'promptheadline.md').read_text(encoding='utf-8')
IDS = json.loads(re.search(r'const IDS = (\{[^\n]+\});', PROMPT).group(1))
OUTPUT = PROJECT / 'public' / 'media' / 'living-portrait'
OUTPUT.mkdir(parents=True, exist_ok=True)
BASE = ('https://images.higgs.ai/?default=1&output=webp&url='
        'https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2F'
        'user_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_')


def download(item):
    name, image_id = item
    target = OUTPUT / f'{image_id}.webp'
    if target.exists() and target.stat().st_size > 100:
        return target.stat().st_size
    request = urllib.request.Request(
        f'{BASE}{image_id}.png&w=640&q=90', headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(request, timeout=90) as response:
        data = response.read()
    if data[:4] != b'RIFF' or data[8:12] != b'WEBP':
        raise ValueError(f'{name}: response is not a WebP image')
    temporary = target.with_suffix('.tmp')
    temporary.write_bytes(data)
    temporary.replace(target)
    return len(data)


if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        sizes = list(pool.map(download, IDS.items()))
    (OUTPUT / 'source.json').write_text(json.dumps({
        'source': '../promptheadline.md, section 6',
        'description': 'Original supplied portrait expressions, locally cached at 640px.',
        'images': IDS,
    }, indent=2) + '\n', encoding='utf-8')
    print(f'Imported {len(sizes)} expressions, {sum(sizes) / 1024 / 1024:.2f} MiB')
