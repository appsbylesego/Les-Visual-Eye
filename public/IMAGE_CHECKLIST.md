# Image Checklist - Les Visual Eye

Add these images to make your website complete:

## 📸 Required Images

### 1. Hero Section Background
**Filename:** `hero-background.mp4` OR `hero-background.jpg`
**Location:** `/public/`
**Size:** 1920x1080px or higher
**Format:** MP4 (video) or JPG (image)
**Notes:**
- Video is recommended for cinematic effect
- Keep video under 10MB
- Should be slow-motion or cinematic footage
- Golden hour lighting works best

---

### 2. Portfolio Images
**Filename:** `1.jpg`, `2.jpg`, `3.jpg`, etc.
**Location:** `/public/portfolio/`
**Size:** 1500x2000px (3:4 aspect ratio)
**Format:** JPG or PNG
**Quantity:** 8-20 images recommended
**Notes:**
- Your best cinematic portraits
- Mix of different categories:
  - Cinematic Faces (close-ups)
  - Golden Hour shots
  - Urban Vibes
  - The Look Back (over-shoulder)
  - Motion Frames
- Compress images before uploading

---

### 3. About Section Portrait
**Filename:** `about-portrait.jpg`
**Location:** `/public/`
**Size:** 800x1200px (3:4 aspect ratio)
**Format:** JPG or PNG
**Notes:**
- Professional portrait of yourself
- Cinematic style with golden highlights
- Slightly desaturated works well
- Should match your brand aesthetic

---

### 4. Contact Section Portrait
**Filename:** `contact-portrait.jpg`
**Location:** `/public/`
**Size:** 800x1200px (3:4 aspect ratio)
**Format:** JPG or PNG
**Notes:**
- Can be action shot of you photographing
- Or another cinematic portrait
- Should convey professionalism

---

## 🗂️ Folder Structure

```
public/
├── hero-background.mp4          ← Your hero video
├── about-portrait.jpg           ← Your portrait
├── contact-portrait.jpg         ← Contact section image
└── portfolio/                   ← Portfolio folder
    ├── 1.jpg                    ← Portfolio image 1
    ├── 2.jpg                    ← Portfolio image 2
    ├── 3.jpg                    ← Portfolio image 3
    └── ...                      ← More images
```

---

## 🎨 Image Guidelines

### Quality Standards
- **Resolution:** High resolution (1500px+ width minimum)
- **Compression:** Use TinyPNG.com before uploading
- **Format:** JPG for photos, PNG for graphics
- **Color:** Cinematic grading preferred
- **Lighting:** Moody, golden hour, or dramatic

### Aspect Ratios
- **Hero:** 16:9 (horizontal)
- **Portraits:** 3:4 (vertical)
- **Portfolio:** 3:4 (vertical) recommended

### File Sizes (After Compression)
- **Hero Video:** < 10MB
- **Hero Image:** < 500KB
- **Portfolio Images:** < 300KB each
- **Portraits:** < 400KB

---

## 🔧 How to Add Images

### Step 1: Prepare Your Images
1. Select your best cinematic shots
2. Resize to recommended dimensions
3. Compress at TinyPNG.com
4. Rename files appropriately

### Step 2: Add to Public Folder
1. Copy images to `/public/` or `/public/portfolio/`
2. Make sure filenames match exactly:
   - `hero-background.mp4` (or .jpg)
   - `about-portrait.jpg`
   - `contact-portrait.jpg`
   - Portfolio: `1.jpg`, `2.jpg`, etc.

### Step 3: Update Code (If Needed)
If you use different filenames, update these files:

**Hero Section:** `src/components/Hero/Hero.tsx` line 9
```tsx
<video src="/your-video-name.mp4">
```

**Portfolio:** `src/components/Portfolio/Portfolio.tsx` lines 15-22
```tsx
image: '/portfolio/your-image-name.jpg'
```

**About:** `src/components/About/About.tsx` line 32
```tsx
<img src="/your-portrait-name.jpg" />
```

**Contact:** `src/components/Contact/Contact.tsx` line 220
```tsx
<img src="/your-contact-image.jpg" />
```

---

## 📱 Testing Your Images

After adding images:

1. **Refresh browser** (Ctrl+R or Cmd+R)
2. **Check all sections:**
   - Hero loads and looks cinematic
   - Portfolio grid displays properly
   - About portrait shows correctly
   - Contact image appears
3. **Test mobile view** (responsive design)
4. **Check loading speed** (should be fast)

---

## 💡 Image Tips

### Hero Section
- Use video if possible (more cinematic)
- Slow-motion works best
- Golden hour or moody lighting
- Subject in motion or posing

### Portfolio
- Showcase variety of styles
- Mix close-ups and full shots
- Consistent color grading
- Your absolute best work

### Portraits
- Professional and authentic
- Match your brand personality
- Good lighting and composition
- Show you in your element

---

## 🎬 Optional Enhancements

### Logo (Optional)
**Filename:** `logo.png`
**Location:** `/public/`
**Size:** 200x200px
**Notes:** Can add to navbar if you want

### Favicon (Optional)
**Filename:** `favicon.ico`
**Location:** `/public/`
**Size:** 32x32px
**Notes:** Shows in browser tab

### Background Patterns (Optional)
**Location:** `/public/patterns/`
**Notes:** For additional texture overlays

---

## ✅ Quick Checklist

Before going live, verify:

- [ ] Hero video/image added and working
- [ ] 8-20 portfolio images uploaded
- [ ] About portrait looks professional
- [ ] Contact image displays correctly
- [ ] All images compressed (fast loading)
- [ ] Mobile view looks good
- [ ] Images match brand aesthetic
- [ ] No placeholder images visible

---

## 🆘 Troubleshooting

**Images not showing?**
- Check filenames match exactly (case-sensitive)
- Verify images are in `/public/` folder
- Hard refresh browser (Ctrl+Shift+R)
- Check browser console for errors

**Images load slow?**
- Compress images more
- Reduce file sizes
- Use JPG instead of PNG
- Check image dimensions aren't too large

**Images look pixelated?**
- Use higher resolution source images
- Don't upscale small images
- Export at 2x size for retina displays

---

**Once all images are added, your cinematic portfolio will come to life!** 🎥✨

**Estimated time:** 30-60 minutes to select, prepare, and upload all images.
