#!/usr/bin/env python3
"""WCAG contrast helper for theming.

Usage:
  python3 ink.py contrast <fg> <bg>          # ratio between two hex colours
  python3 ink.py ink <color> [--bg #ffffff] [--ratio 4.5]
                                             # darken (or lighten) a brand colour
                                             # the minimum amount needed to hit a
                                             # target contrast against bg, keeping
                                             # its hue/saturation -> an "ink" token

Targets: 4.5 = AA body text, 3.0 = AA large text / UI components.
"""
import sys, colorsys


def _lin(c):
    c /= 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def lum(hexs):
    h = hexs.lstrip("#")
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return 0.2126 * _lin(r) + 0.7152 * _lin(g) + 0.0722 * _lin(b)


def cr(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def ink(hexs, bg="#ffffff", ratio=4.5):
    h = hexs.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    hh, l, s = colorsys.rgb_to_hls(r, g, b)
    bg_is_light = lum(bg) > 0.5
    # Search lightness toward the contrasting end (down on light bg, up on dark).
    lo, hi = (0.0, l) if bg_is_light else (l, 1.0)
    best = hexs
    for _ in range(40):
        mid = (lo + hi) / 2
        rr, gg, bb = colorsys.hls_to_rgb(hh, mid, s)
        cand = "#%02x%02x%02x" % (round(rr * 255), round(gg * 255), round(bb * 255))
        if cr(cand, bg) >= ratio:
            best = cand
            lo, hi = (mid, hi) if bg_is_light else (lo, mid)
        else:
            lo, hi = (lo, mid) if bg_is_light else (mid, hi)
    return best


def main():
    a = sys.argv[1:]
    if not a:
        sys.exit(__doc__)
    if a[0] == "contrast" and len(a) == 3:
        print(f"{cr(a[1], a[2]):.2f}")
    elif a[0] == "ink":
        color = a[1]
        bg = a[a.index("--bg") + 1] if "--bg" in a else "#ffffff"
        ratio = float(a[a.index("--ratio") + 1]) if "--ratio" in a else 4.5
        out = ink(color, bg, ratio)
        print(f"{color} -> {out}   (contrast {cr(out, bg):.2f} on {bg}, "
              f"original {cr(color, bg):.2f})")
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()
