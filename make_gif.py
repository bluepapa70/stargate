from PIL import Image
import os

folder = r"public/constellations"
output = r"public/zodiac.gif"
bg_color = (8, 12, 26)
size = (400, 400)
duration = 3000  # 3 seconds per frame

order = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

frames = []
for name in order:
    path = os.path.join(folder, f"{name}.png")
    src = Image.open(path).convert("RGBA")
    src.thumbnail(size, Image.LANCZOS)
    bg = Image.new("RGBA", size, bg_color + (255,))
    x = (size[0] - src.width) // 2
    y = (size[1] - src.height) // 2
    bg.paste(src, (x, y), src)
    frames.append(bg.convert("P", palette=Image.ADAPTIVE, colors=256))

frames[0].save(
    output,
    save_all=True,
    append_images=frames[1:],
    loop=0,
    duration=duration,
    optimize=False,
)
print(f"GIF saved: {output} ({len(frames)} frames, {duration}ms each)")
