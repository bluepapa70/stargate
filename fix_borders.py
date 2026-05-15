from PIL import Image
import numpy as np
import os

folder = "public/constellations"
gradient_pct = 0.12  # 가장자리에서 12% 구간을 검정으로 페이드

for filename in sorted(os.listdir(folder)):
    if not filename.endswith('.png'):
        continue
    path = os.path.join(folder, filename)
    img = Image.open(path).convert("RGB")
    w, h = img.size
    arr = np.array(img, dtype=np.float32)

    gx_size = int(w * gradient_pct)
    gy_size = int(h * gradient_pct)

    def make_gradient(length, grad_size):
        g = np.ones(length, dtype=np.float32)
        for i in range(grad_size):
            val = i / grad_size
            g[i] = min(g[i], val)
            g[length - 1 - i] = min(g[length - 1 - i], val)
        return g

    mask = np.outer(make_gradient(h, gy_size), make_gradient(w, gx_size))

    for c in range(3):
        arr[:, :, c] *= mask

    result = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    result.save(path)
    print(f"  {filename} ({w}x{h}) gradient {gx_size}x{gy_size}px")

print("Done!")
