"""Import the supplied GIFs as transparent WebP posters and paged frame atlases.

Run from the repository root: python scripts/import-hijab-gifs.py
Original GIFs remain untouched. Frame durations are preserved, including holds.
"""
from pathlib import Path
import hashlib
import json
import shutil
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'Maskot_GIF_Bagian_07_dari_10'
OUT = ROOT / 'public/media/hijab-portrait'
REPAIRS = OUT / 'repaired-gifs'
OUT.mkdir(parents=True, exist_ok=True)
SIZE, COLUMNS, PER_PAGE = 384, 4, 16

ACTIONS = ['yawn', 'shifty', 'gum', 'fly', 'flirt', 'roll', 'sneeze',
           'hijab', 'tug', 'cross', 'whistle', 'doze', 'cheeky', 'wow', 'sad']
GAZES = ['e', 'ene', 'ne', 'nne', 'n', 'nnw', 'nw', 'wnw',
         'w', 'wsw', 'sw', 'ssw', 's', 'sse', 'se', 'ese']
REACTIONS = {
    'cium': 'kiss', 'dapat_ide': 'raised', 'datar': 'deadpan',
    'kedip_kanan': 'winkr', 'kedip_kiri': 'winkl',
    'kesakitan_ringan': 'ouch', 'lirik_curiga': 'smug', 'marah': 'angry',
    'mual': 'sick', 'pipi_gembung': 'puff', 'pusing': 'dizzy',
    'senyum_hangat': 'grin', 'takut': 'scared', 'terkejut': 'shock',
    'tertawa': 'laugh', 'tertiup_angin': 'wind', 'wajah_mengerut': 'scrunch',
}
STILL_GAZES = dict(zip(GAZES, ['right', 'ene', 'upright', 'nne', 'up', 'nnw',
    'nw', 'wnw', 'left', 'wsw', 'downleft', 'ssw', 'down', 'sse', 'downright', 'ese']))


def import_gif(path):
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    prefix = digest[:16]
    with Image.open(path) as gif:
        frames, durations = [], []
        for index in range(gif.n_frames):
            gif.seek(index)
            frame = gif.convert('RGBA')
            frames.append(frame.copy())
            durations.append(max(10, gif.info.get('duration', 100)))
        # Middle of the clip represents the held expression; the first frame
        # is deliberately neutral in the supplied animations.
        poster = frames[len(frames) // 2].resize((640, 640), Image.Resampling.LANCZOS)
        if path.name == 'gaze_17_netral.gif':
            poster = frames[0].resize((640, 640), Image.Resampling.LANCZOS)
        poster_name = f'{prefix}-poster.webp'
        poster.save(OUT / poster_name, quality=88, method=6)
        pages = []
        for first in range(0, len(frames), PER_PAGE):
            batch = frames[first:first + PER_PAGE]
            columns = min(COLUMNS, len(batch))
            rows = (len(batch) + columns - 1) // columns
            atlas = Image.new('RGBA', (columns * SIZE, rows * SIZE))
            for index, frame in enumerate(batch):
                # No alpha mask: copying RGBA preserves soft transparent edges.
                atlas.paste(frame.resize((SIZE, SIZE), Image.Resampling.LANCZOS),
                            ((index % columns) * SIZE, (index // columns) * SIZE))
            name = f'{prefix}-{first // PER_PAGE}.webp'
            atlas.save(OUT / name, quality=84, method=4)
            pages.append({'src': f'/media/hijab-portrait/{name}', 'first': first,
                          'count': len(batch), 'columns': columns, 'rows': rows})
    return {'poster': f'/media/hijab-portrait/{poster_name}', 'pages': pages,
            'durations': durations, 'duration': sum(durations), 'cellSize': SIZE,
            'source': path.name, 'sha256': digest}


def main():
    clips, stills, provenance, by_hash = {}, {}, [], {}
    for path in sorted(SOURCE.glob('*.gif')):
        stem = path.stem
        if stem[:2].isdigit():
            key = ACTIONS[int(stem[:2]) - 1]
        elif stem.startswith('gaze_'):
            number = int(stem[5:7])
            key = f'gaze:{GAZES[number - 1]}' if number <= 16 else ['rest', 'half', 'closed'][number - 17]
        else:
            key = REACTIONS[stem.removeprefix('reaksi_')]
        # Prefer repaired GIFs, preserving the original supplied files.
        imported_path = REPAIRS / path.name
        if not imported_path.is_file():
            imported_path = path
        digest = hashlib.sha256(imported_path.read_bytes()).hexdigest()
        if digest not in by_hash:
            by_hash[digest] = import_gif(imported_path)
        clip = {**by_hash[digest], 'source': path.name}
        if imported_path != path:
            clip['repairSource'] = imported_path.relative_to(ROOT / 'public').as_posix()
            clip['originalSha256'] = hashlib.sha256(path.read_bytes()).hexdigest()
        animation_key = f'preview:{key}' if key in {'rest', 'half', 'closed'} else key
        clips[animation_key] = clip
        stills[animation_key] = clip['poster']
        stills[key] = clip['poster']
        if key.startswith('gaze:'):
            stills[STILL_GAZES[key[5:]]] = clip['poster']
        provenance.append({'key': key, 'source': path.name, 'sha256': digest})
    for key, fallback in {'tongue': 'cheeky', 'cry': 'sad', 'hearts': 'flirt',
                          'stars': 'wow', 'shy': 'smug', 'snore': 'doze',
                          'fish': 'cross'}.items():
        stills[key] = stills[fallback]
    shutil.copyfile(ROOT / 'public' / stills['rest'].lstrip('/'), OUT / 'rest.webp')
    stills['rest'] = '/media/hijab-portrait/rest.webp'
    manifest = {'stills': stills, 'animations': clips, 'rotation': ACTIONS}
    (ROOT / 'src/hijab-portrait-manifest.json').write_text(
        json.dumps(manifest, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
    duplicates = [[p['source'] for p in provenance if p['sha256'] == digest]
                  for digest in by_hash]
    report = {'sourceDirectory': SOURCE.name, 'files': provenance,
              'duplicateGroups': [group for group in duplicates if len(group) > 1],
              'sourceBytes': sum(p.stat().st_size for p in SOURCE.glob('*.gif')),
              'outputBytes': sum(p.stat().st_size for p in OUT.glob('*.webp'))}
    (OUT / 'source.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'clips': len(clips), 'uniqueClips': len(by_hash),
                      'sourceBytes': report['sourceBytes'], 'outputBytes': report['outputBytes']}))


if __name__ == '__main__':
    main()
