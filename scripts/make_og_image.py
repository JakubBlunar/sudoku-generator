"""Render the Open Graph / social share card (1200x630) in the brand look:
blue gradient tile + white 3x3 grid on the left, headline + subline on the
right. Writes public/og-image.png (referenced as /og-image.png in _app.tsx)."""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "og-image.png")
W, H = 1200, 630

# Brand gradient (matches make_favicon.py / the app theme)
TOP = (47, 124, 240)     # #2f7cf0
BOT = (26, 72, 164)      # #1a48a4
WHITE = (255, 255, 255)


def lerp(a, b, t):
    return tuple(int(round(a[c] + (b[c] - a[c]) * t)) for c in range(3))


def load_font(size, bold=False):
    """Figtree isn't available system-wide; pick the best C:\Windows\Fonts
    fallback (Segoe UI, same humanist family)."""
    candidates = [
        "C:/Windows/Fonts/segoeui{}.ttf".format("b" if bold else ""),
        "C:/Windows/Fonts/arial{}.ttf".format("bd" if bold else ""),
    ]
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def main():
    img = Image.new("RGB", (W, H), BOT)
    px = img.load()
    for y in range(H):
        t = y / (H - 1)
        col = lerp(TOP, BOT, t)
        for x in range(W):
            px[x, y] = col

    d = ImageDraw.Draw(img)

    # --- left: the brand tile (rounded, white grid, open center cell) -----
    tile = 420
    tx, ty = 120, (H - tile) // 2 + 12
    radius = 92
    # white tile body
    d.rounded_rectangle([tx, ty, tx + tile, ty + tile], radius=radius, fill=WHITE)
    # 3x3 grid in brand blue, center cell left open
    pad = 52
    cell = 96
    gap = 18
    xs = [tx + pad, tx + pad + cell + gap, tx + pad + 2 * (cell + gap)]
    idx = 0
    for gy in xs:
        for gx in xs:
            if idx != 4:
                d.rounded_rectangle([gx, gy, gx + cell, gy + cell], radius=20, fill=(47, 124, 240))
            idx += 1
    # center slot ring (same cell footprint, inset)
    cx, cy = xs[1] + cell // 2, xs[1] + cell // 2
    d.rounded_rectangle([cx - 36, cy - 36, cx + 36, cy + 36], radius=14, outline=(47, 124, 240, 200), width=8)

    # --- right: headline + subline (vertically centred against the tile) --
    head_font = load_font(68, bold=True)
    sub_font = load_font(30, bold=False)
    d.text((600, 172), "Sudoku, online\nand printable.", font=head_font, fill=WHITE, spacing=8)
    d.text((602, 386), "Play in the browser or generate\ncrisp A4 sheets. Free, no sign-up.", font=sub_font, fill=(219, 231, 252), spacing=12)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    img.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} ({img.size[0]}x{img.size[1]})")


if __name__ == "__main__":
    main()
