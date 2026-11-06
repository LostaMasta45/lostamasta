"""Encode ImageGen-repaired GIF hold frames, then refresh only their atlases.

Inputs are held frames extracted from the supplied GIFs and repaired with the
built-in ImageGen tool. Website assets remain GIF-derived; no older PNG set is
used. PNG files in artifacts are temporary media-processing intermediates.
"""
from pathlib import Path
import importlib.util
import json
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'artifacts/mascot-import/gaze-repair'
OUT = ROOT / 'public/media/hijab-portrait/repaired-gifs'
OUT.mkdir(parents=True, exist_ok=True)
FFMPEG = shutil.which('ffmpeg')
FEATHER = "format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='255*clip(min(min(X,W-1-X),min(Y,H-1-Y))/4,0,1)'"


def ffmpeg(*args):
    subprocess.run([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error', *map(str, args)], check=True)


def encode(name, frames, milliseconds):
    playlist = WORK / f'{name}.ffconcat'
    lines = ['ffconcat version 1.0']
    for path, duration in zip(frames, milliseconds):
        lines.extend([f"file '{path.as_posix()}'", f'duration {duration / 1000:.3f}'])
    playlist.write_text('\n'.join(lines) + '\n', encoding='utf-8')
    target = OUT / f'{name}.gif'
    # Native GIF timing and disposal; no dissolve or blended pupil positions.
    ffmpeg('-f', 'concat', '-safe', '0', '-i', playlist,
           '-filter_complex', '[0:v]split[a][b];[a]palettegen=reserve_transparent=1[p];[b][p]paletteuse=dither=sierra2_4a:alpha_threshold=128',
           '-fps_mode', 'vfr', '-loop', '0', '-final_delay', milliseconds[-1] // 10, target)
    return target


def main():
    config = json.loads((WORK / 'generated-frames.json').read_text(encoding='utf-8'))
    frames = {}
    neutral = WORK / 'neutral-from-gif.png'
    for key, generated in config['frames'].items():
        destination = WORK / f'clean-{key}.png'
        # Keep project-bound generated originals, independently of Codex cache.
        original = WORK / f'generated-{key}.png'
        if not original.exists():
            shutil.copyfile(generated, original)
        # Use only repaired eye openings. Everything else remains the exact
        # supplied GIF neutral frame, avoiding face/hijab drift between poses.
        ffmpeg('-i', neutral, '-i', original, '-filter_complex',
               f'[1:v]scale=768:768,split[l][r];[l]crop=79:43:275:296,{FEATHER}[le];[r]crop=82:43:416:296,{FEATHER}[re];'
               '[0:v][le]overlay=275:296:format=auto[tmp];[tmp][re]overlay=416:296:format=auto[frame]',
               '-map', '[frame]', '-frames:v', '1', destination)
        frames[key] = destination
    repaired = []
    for key, held in frames.items():
        repaired.append(encode(f'gaze_{key}', [neutral, held, neutral], [400, 1600, 1000]))
    repaired.append(encode('02_lirik_kanan_kiri', [neutral, frames['09_kiri'], frames['01_kanan'], frames['09_kiri'], neutral],
                           [400, 920, 1000, 880, 800]))
    order = ['09_kiri', '08_kiri_sedikit_atas', '07_kiri_atas', '06_atas_sedikit_kiri', '05_atas',
             '04_atas_sedikit_kanan', '03_kanan_atas', '02_kanan_sedikit_atas', '01_kanan']
    repaired.append(encode('06_memutar_mata', [neutral] + [frames[k] for k in order] + [neutral],
                           [400] + [240] * len(order) + [1440]))
    # Hovering either eye must not reintroduce the old double-exposure wink.
    for side, x, width in [('kiri', 275, 79), ('kanan', 416, 82)]:
        wink = WORK / f'clean-wink-{side}.png'
        ffmpeg('-i', neutral, '-i', frames['19_mata_tertutup'], '-filter_complex',
               f'[1:v]crop={width}:43:{x}:296,{FEATHER}[eye];[0:v][eye]overlay={x}:296:format=auto[frame]',
               '-map', '[frame]', '-frames:v', '1', wink)
        repaired.append(encode(f'reaksi_kedip_{side}', [neutral, wink, neutral], [120, 240, 240]))
    repaired.append(encode('reaksi_lirik_curiga', [neutral, frames['09_kiri'], neutral], [400, 1600, 1500]))

    spec = importlib.util.spec_from_file_location('gif_importer', ROOT / 'scripts/import-hijab-gifs.py')
    importer = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(importer)
    manifest_path = ROOT / 'src/hijab-portrait-manifest.json'
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    repairs = []
    for path in repaired:
        key, previous = next((key, clip) for key, clip in manifest['animations'].items() if clip['source'] == path.name)
        clip = importer.import_gif(path)
        clip['repairSource'] = path.relative_to(ROOT / 'public').as_posix()
        clip['originalSha256'] = previous.get('originalSha256', previous['sha256'])
        manifest['animations'][key] = clip
        for name, poster in manifest['stills'].items():
            if poster == previous['poster']:
                manifest['stills'][name] = clip['poster']
        repairs.append({'key': key, 'source': path.name, 'gif': clip['repairSource'], 'sha256': clip['sha256']})
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
    (OUT / 'repairs.json').write_text(json.dumps({'method': 'Built-in ImageGen eye repair + FFmpeg GIF encoding',
        'source': 'Maskot_GIF_Bagian_07_dari_10', 'prompts': config['prompts'], 'repairs': repairs}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'repairedGifs': len(repaired), 'gifBytes': sum(path.stat().st_size for path in repaired),
                      'manifestClips': len(manifest['animations'])}))


if __name__ == '__main__':
    main()
