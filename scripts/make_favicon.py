"""Rasterize the on-theme sudoku favicon (blue gradient tile, white 3x3 grid,
center cell left open as the 'to-fill' slot) to PNG + multi-size ICO."""
from PIL import Image, ImageDraw
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "public")
SIZE = 512  # hi-res render, downsampled for crisp edges


def lerp(a, b, t):
    return tuple(int(round(a[c] + (b[c] - a[c]) * t)) for c in range(3))


# Brand gradient: primary -> primaryDark
TOP = (47, 124, 240)     # #2f7cf0
BOT = (26, 72, 164)      # #1a48a4
WHITE = (255, 255, 255)

RADIUS = 112  # rounded tile radius (14/64 * 512)

# 3x3 grid geometry (replicates the SVG in 64-space, scaled to 512)
PAD = 72
CELL = 112
GAP = 16
XS = [PAD, PAD + CELL + GAP, PAD + 2 * (CELL + GAP)]  # 72, 200, 328


def build_base():
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    px = img.load()
    # vertical gradient across the rounded tile
    for y in range(SIZE):
        t = y / (SIZE - 1)
        col = lerp(TOP, BOT, t) + (255,)
        for x in range(SIZE):
            px[x, y] = col

    d = ImageDraw.Draw(img)
    # rounded-corner mask (transparent corners)
    mask = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, SIZE - 1, SIZE - 1], radius=RADIUS, fill=255)
    transp = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    transp.paste(img, (0, 0), mask)
    img = transp

    d = ImageDraw.Draw(img)
    # white filled cells, all except the center (idx 4)
    idx = 0
    for gy in XS:
        for gx in XS:
            if idx != 4:
                d.rounded_rectangle([gx, gy, gx + CELL, gy + CELL], radius=24, fill=WHITE)
            idx += 1

    # center "slot" ring (subtle, semi-transparent white) — mirrors the SVG ring in the empty cell
    d.rounded_rectangle([224, 224, 288, 288], radius=12, outline=(255, 255, 255, 191), width=8)

    return img


def main():
    base = build_base()

    # preview for human review
    base.resize((128, 128), Image.LANCZOS).save(os.path.join(OUT, "_preview.png"))

    # primary web icon
    base.resize((512, 512), Image.LANCZOS).save(os.path.join(OUT, "favicon.png"))

    # multi-resolution ICO (16/32/48)
    ico = base.resize((256, 256), Image.LANCZOS)
    ico.save(
        os.path.join(OUT, "favicon.ico"),
        sizes=[(16, 16), (32, 32), (48, 48), (256, 256)],
    )
    print("wrote favicon.png, favicon.ico, _preview.png")


if __name__ == "__main__":
    main()
