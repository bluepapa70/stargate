from PIL import Image, ImageDraw, ImageFilter
import math

def star_polygon(cx, cy, r_outer, r_inner, points=5):
    coords = []
    for i in range(points * 2):
        angle = math.pi * i / points - math.pi / 2
        r = r_outer if i % 2 == 0 else r_inner
        coords.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    return coords

def make_icon(size):
    img = Image.new("RGBA", (size, size), (8, 12, 26, 255))

    # glow layer
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    m = size * 0.08
    cx, cy = size / 2, size / 2
    ro = size / 2 - m
    ri = ro * 0.42
    gd.polygon(star_polygon(cx, cy, ro * 1.25, ri * 1.25), fill=(160, 100, 240, 60))
    glow = glow.filter(ImageFilter.GaussianBlur(radius=size * 0.12))
    img = Image.alpha_composite(img, glow)

    # star
    draw = ImageDraw.Draw(img)
    draw.polygon(star_polygon(cx, cy, ro, ri), fill=(196, 160, 245, 255))

    return img

# ICO (16, 32, 48)
icons = [make_icon(s) for s in [256, 128, 64, 48, 32, 16]]
icons[0].save(
    "src/app/favicon.ico",
    format="ICO",
    sizes=[(256,256),(128,128),(64,64),(48,48),(32,32),(16,16)],
    append_images=icons[1:],
)
print("favicon.ico saved")

# PNG for Apple touch icon / og image
make_icon(512).save("public/icon-512.png")
print("icon-512.png saved")
