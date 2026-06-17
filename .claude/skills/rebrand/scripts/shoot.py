#!/usr/bin/env python3
"""Headless-Chromium screenshot helper for visual rebrand review.

Usage:
  python3 shoot.py <url> <out.png> [--w 420] [--h 9000] [--slices N]

Finds a usable Chromium/Chrome binary, captures a tall screenshot, and
(optionally) writes N vertical slices next to it (out.1.png, out.2.png …)
so each fits in a single image-read for assessment.

Start a static server first, e.g.:  npx http-server . -p 4173 -c-1
"""
import os, sys, glob, shutil, subprocess


def find_chrome():
    for c in ("chromium", "chromium-browser", "google-chrome", "google-chrome-stable"):
        p = shutil.which(c)
        if p:
            return p
    # Playwright's bundled builds
    for pat in ("/opt/pw-browsers/chromium-*/chrome-linux/chrome",
                os.path.expanduser("~/.cache/ms-playwright/chromium-*/chrome-linux/chrome")):
        hits = sorted(glob.glob(pat))
        if hits:
            return hits[-1]
    sys.exit("No Chromium/Chrome binary found.")


def main():
    a = sys.argv[1:]
    if len(a) < 2:
        sys.exit(__doc__)
    url, out = a[0], a[1]
    w = int(a[a.index("--w") + 1]) if "--w" in a else 420
    h = int(a[a.index("--h") + 1]) if "--h" in a else 9000
    slices = int(a[a.index("--slices") + 1]) if "--slices" in a else 0

    chrome = find_chrome()
    subprocess.run([chrome, "--headless=new", "--no-sandbox", "--disable-gpu",
                    "--hide-scrollbars", f"--window-size={w},{h}",
                    f"--screenshot={out}", url],
                   stderr=subprocess.DEVNULL, check=True)
    print(f"wrote {out} ({w}x{h}) via {chrome}")

    if slices > 0:
        from PIL import Image
        im = Image.open(out)
        W, H = im.size
        step = H // slices
        for i in range(slices):
            y0 = i * step
            y1 = H if i == slices - 1 else (i + 1) * step
            name = out.rsplit(".", 1)[0] + f".{i+1}.png"
            im.crop((0, y0, W, y1)).save(name)
            print(f"  slice {name}  y={y0}-{y1}")


if __name__ == "__main__":
    main()
