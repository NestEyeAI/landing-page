from PIL import Image, ImageDraw, ImageFont

img = Image.new("RGB", (1200, 630), "#1B4332")
draw = ImageDraw.Draw(img)
draw.ellipse([500, 180, 700, 380], outline="#6B8F71", width=4)
draw.ellipse([580, 260, 620, 300], fill="#6B8F71")

try:
    font_lg = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 56)
    font_sm = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 28)
except OSError:
    font_lg = ImageFont.load_default()
    font_sm = ImageFont.load_default()

draw.text((600, 420), "nesteye.ai", fill="#FAF7F2", anchor="mm", font=font_lg)
draw.text((600, 490), "AI + Hardware for Smarter Poultry Health", fill="#6B8F71", anchor="mm", font=font_sm)
img.save("public/og-image.png")
print("Created public/og-image.png")
