#!/usr/bin/env python3
"""Extract the dominant brand colours from a logo image.

Usage:  python3 palette.py <logo.png> [--n 6]

Prints the most prominent saturated colours (hex + share + a rough role
guess), ignoring transparent pixels and near-white / near-black background.
These are the candidate brand tokens you then map into the CSS :root.
"""
import sys, colorsys
from collections import Counter
try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required:  pip install pillow")


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    path = sys.argv[1]
    n = 6
    if "--n" in sys.argv:
        n = int(sys.argv[sys.argv.index("--n") + 1])

    im = Image.open(path).convert("RGBA")
    # Downscale for speed; quantise to merge near-identical shades.
    im.thumbnail((400, 400))
    px = list(im.getdata()) if not hasattr(im, "get_flattened_data") \
        else list(im.get_flattened_data())

    buckets = Counter()
    for r, g, b, a in px:
        if a < 128:                       # skip transparent
            continue
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        if l > 0.93 or l < 0.07:          # skip near-white / near-black bg
            continue
        if s < 0.15:                      # skip greys
            continue
        # quantise to a 12-step hue / 4-step light/sat grid to merge shades
        key = (round(r / 24) * 24, round(g / 24) * 24, round(b / 24) * 24)
        buckets[key] += 1

    total = sum(buckets.values()) or 1
    print(f"# palette for {path}")
    for (r, g, b), cnt in buckets.most_common(n):
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        hue = h * 360
        role = ("red" if hue < 20 or hue >= 340 else "orange" if hue < 45 else
                "yellow" if hue < 70 else "green" if hue < 160 else
                "cyan" if hue < 200 else "blue" if hue < 255 else
                "violet" if hue < 290 else "magenta")
        print(f"#{r:02x}{g:02x}{b:02x}  {cnt/total:6.1%}  {role:<8} "
              f"(H{hue:3.0f} S{s:0.2f} L{l:0.2f})")


if __name__ == "__main__":
    main()
