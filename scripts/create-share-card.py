"""Render the original, code-drawn social preview. No external artwork is used."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FONT_DIR = Path('C:/Windows/Fonts')


def font(size, bold=False):
    return ImageFont.truetype(str(FONT_DIR / ('arialbd.ttf' if bold else 'arial.ttf')), size)


def main():
    image = Image.new('RGB', (1200, 630), '#0c0c0c')
    draw = ImageDraw.Draw(image)
    draw.line((54, 104, 1146, 104), fill='#3c3c42')
    draw.text((54, 49), 'LOSTA MASTA', font=font(24, True), fill='#d7e2ea')
    draw.text((813, 56), 'WEB DESIGN & DEVELOPMENT', font=font(15), fill='#a0a8af')
    draw.text((54, 143), 'WEBSITE DENGAN', font=font(73, True), fill='#8b96a2')
    draw.text((51, 224), 'KARAKTER.', font=font(112, True), fill='#d7e2ea')
    draw.text((57, 374), 'Desain berkarakter. Interaksi terarah.', font=font(27), fill='#aeb9c3')
    draw.rounded_rectangle((55, 462, 417, 520), radius=29, fill='#75126f', outline='#d7e2ea', width=2)
    draw.text((85, 482), 'DISKUSI VIA WHATSAPP', font=font(18, True), fill='#ffffff')
    draw.line((54, 566, 1146, 566), fill='#3c3c42')
    draw.text((57, 588), 'DESIGN CONCEPTS / RESPONSIVE WEBSITES', font=font(13), fill='#909ba5')
    draw.text((885, 588), '+62 831-2286-6975', font=font(15), fill='#b8c4ce')
    # A graphic echo of the stacked project cards used on the website.
    for x, y, border in [(858, 165, '#4c3454'), (884, 192, '#76617d'), (910, 219, '#bca3c7')]:
        draw.rounded_rectangle((x, y, x + 198, y + 280), radius=28, fill='#141116', outline=border, width=2)
    draw.ellipse((937, 272, 1080, 415), fill='#42244f', outline='#ba87cf', width=2)
    draw.arc((929, 304, 1090, 376), start=0, end=350, fill='#ded0e9', width=2)
    draw.line((936, 460, 1080, 460), fill='#6c5775', width=2)
    draw.line((936, 474, 1027, 474), fill='#6c5775', width=2)
    image.save(ROOT / 'public/media/losta-masta-share.jpg', quality=92, optimize=True)


if __name__ == '__main__':
    main()
