"""Remove near-white and near-black backgrounds from logo PNGs."""
from pathlib import Path

from PIL import Image

LOGOS_DIR = Path(__file__).resolve().parent.parent / "public" / "logos"
THRESHOLD = 28


def color_distance(c1, c2):
    return sum(abs(a - b) for a, b in zip(c1, c2))


def make_transparent(path: Path) -> None:
    img = Image.open(path).convert("RGBA")
    pixels = img.load()
    w, h = img.size

    # Sample corners to guess background color
    corners = [
        pixels[0, 0][:3],
        pixels[w - 1, 0][:3],
        pixels[0, h - 1][:3],
        pixels[w - 1, h - 1][:3],
    ]
    bg = max(set(corners), key=corners.count)

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            rgb = (r, g, b)
            if color_distance(rgb, bg) <= THRESHOLD:
                pixels[x, y] = (r, g, b, 0)
            elif max(rgb) > 245 and min(rgb) > 235:
                pixels[x, y] = (r, g, b, 0)
            elif max(rgb) < 20:
                pixels[x, y] = (r, g, b, 0)

    img.save(path, "PNG")
    print(f"processed {path.name}")


if __name__ == "__main__":
    for png in sorted(LOGOS_DIR.glob("*.png")):
        make_transparent(png)
