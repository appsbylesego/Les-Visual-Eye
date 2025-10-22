# Project Structure - Les Visual Eye

## 📁 Directory Overview

```
les-visual-eye/
├── public/                          # Static assets (images, videos)
│   ├── hero-background.mp4         # Hero section video
│   ├── portfolio/                  # Portfolio images folder
│   ├── about-portrait.jpg          # Your portrait for About section
│   └── contact-portrait.jpg        # Image for Contact section
│
├── src/
│   ├── components/                 # All React components
│   │   ├── Hero/
│   │   │   └── Hero.tsx           # Hero section component
│   │   ├── Portfolio/
│   │   │   └── Portfolio.tsx      # Portfolio grid with filtering
│   │   ├── Packages/
│   │   │   └── Packages.tsx       # Pricing packages section
│   │   ├── About/
│   │   │   └── About.tsx          # About Les section
│   │   ├── Contact/
│   │   │   └── Contact.tsx        # Booking form with distance logic
│   │   └── shared/
│   │       └── LoadingScreen.tsx  # Initial loading animation
│   │
│   ├── App.tsx                     # Main app component
│   ├── index.css                   # Global styles + Tailwind
│   └── main.tsx                    # App entry point
│
├── tailwind.config.js              # Tailwind configuration (colors, fonts)
├── postcss.config.js               # PostCSS configuration
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
├── README.md                       # Technical documentation
├── CUSTOMIZATION_GUIDE.md          # Step-by-step customization guide
└── PROJECT_STRUCTURE.md            # This file
```

## 🎯 Key Files to Customize

### 1. Components (src/components/)

| File | Purpose | Lines to Edit |
|------|---------|---------------|
| **Hero/Hero.tsx** | Opening section with video background | 9, 28, 38, 55 |
| **Portfolio/Portfolio.tsx** | Image gallery with categories | 5-12, 15-22 |
| **Packages/Packages.tsx** | Pricing cards | 6-51 |
| **About/About.tsx** | Your story and portrait | 32, 65-95 |
| **Contact/Contact.tsx** | Booking form, email, distance logic | 8-18, 51-63 |

### 2. Configuration Files

| File | Purpose | What to Change |
|------|---------|----------------|
| **tailwind.config.js** | Colors, fonts, design tokens | Colors (line 8-12), Fonts (line 14-17) |
| **src/index.css** | Global styles, font imports | Font URL (line 1) |
| **package.json** | Project info, dependencies | Name, version, description |

### 3. Static Assets (public/)

| Location | Purpose | Format |
|----------|---------|--------|
| **public/hero-background.mp4** | Hero video | MP4, 1920x1080+ |
| **public/portfolio/*.jpg** | Portfolio images | JPG/PNG, 1500px+ |
| **public/about-portrait.jpg** | Your portrait | JPG/PNG, 800x1200+ |
| **public/contact-portrait.jpg** | Contact section image | JPG/PNG, 800x1200+ |

## 🔧 Configuration Quick Reference

### Colors (tailwind.config.js)
```javascript
colors: {
  charcoal: '#0A0A0A',           // Dark background
  gold: '#C89B3C',               // Primary accent (golden)
  'cinematic-orange': '#FF6A00',  // Secondary accent (orange/red)
}
```

### Fonts (tailwind.config.js)
```javascript
fontFamily: {
  'display': ['Playfair Display', 'Cinzel', 'serif'],     // Headlines
  'sans': ['Inter', 'Montserrat', 'Poppins', 'sans-serif'], // Body text
}
```

### Package Pricing Structure
**File:** `src/components/Packages/Packages.tsx`

- **Cinematic Bundle:** R400 (18 photos, 1h shoot)
- **Cinematic Deluxe:** R700 (30 photos, 1.5h shoot + video)
- **Full Experience:** R1,200 (50+ photos, 2h shoot + reel)

### Distance-Based Rules
**File:** `src/components/Contact/Contact.tsx`

- **0-15km:** All packages available
- **15-50km:** Deluxe & Full only
- **50-60km:** Meet Halfway option
- **60km+:** Outside service area

## 📝 Scripts (package.json)

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (http://localhost:5173) |
| `npm run build` | Build for production → `dist/` folder |
| `npm run preview` | Preview production build locally |

## 🎨 Component Features

### Hero Component
- Full-screen video/image background
- Animated text sequence (fade-in, slide-up)
- Two CTA buttons (Book/View Portfolio)
- Scroll indicator with bounce animation

### Portfolio Component
- Category filtering (All, Cinematic Faces, etc.)
- Masonry grid layout
- Hover effects (zoom, glow, overlay)
- Lightbox modal for full-size viewing

### Packages Component
- Three animated pricing cards
- Hover effects (tilt, scale, light leak)
- Feature lists with checkmarks
- CTA buttons per package

### About Component
- Split-screen layout (portrait + text)
- Line-by-line text animation
- Parallax zoom on portrait
- Background gradient animation

### Contact Component
- Form with validation
- Distance-based package filtering
- "Meet Halfway" option checkbox
- EmailJS integration
- Service area display

## 🚀 Deployment Checklist

Before deploying:

1. ✅ Add all your images to `public/`
2. ✅ Update EmailJS credentials in `Contact.tsx`
3. ✅ Configure distance calculation for your location
4. ✅ Update all text content (hero, about, packages)
5. ✅ Test on mobile and desktop
6. ✅ Run `npm run build`
7. ✅ Deploy `dist/` folder to Vercel/Netlify

## 📚 Documentation Files

- **README.md** - Technical setup, installation, deployment
- **CUSTOMIZATION_GUIDE.md** - Step-by-step customization instructions
- **PROJECT_STRUCTURE.md** - This file (project overview)

## 🆘 Quick Troubleshooting

| Issue | Solution | File |
|-------|----------|------|
| Images not showing | Check paths, ensure in `public/` | Component files |
| Email not sending | Verify EmailJS credentials | Contact.tsx (line 51-63) |
| Colors not updating | Restart dev server | tailwind.config.js |
| Build errors | Run `npm install` again | Terminal |
| Animations laggy | Reduce simultaneous animations | Component files |

## 💡 Best Practices

1. **Image Sizes:**
   - Hero: 1920x1080px (MP4 video preferred)
   - Portfolio: 1500x2000px (3:4 aspect ratio)
   - Portraits: 800x1200px (3:4 aspect ratio)

2. **Image Optimization:**
   - Compress all images (tinypng.com)
   - Use WebP format when possible
   - Lazy load portfolio images (already implemented)

3. **Performance:**
   - Keep video files under 10MB
   - Limit portfolio to 12-20 images initially
   - Test on slower connections

4. **Customization:**
   - Make small changes and test
   - Keep backups before major edits
   - Use browser dev tools for live testing

---

**Need help?** Check the inline comments in each component file. They explain what each section does and how to customize it.

**Built with ❤️ and cinematic precision** 🎥✨
