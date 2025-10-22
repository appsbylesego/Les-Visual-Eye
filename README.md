# Les Visual Eye - Cinematic Photography Portfolio

A stunning, cinematic photography portfolio website for Lesego (Les), featuring smooth animations, parallax effects, and an immersive movie-like experience.

## 🎬 Features

- **Cinematic Hero Section** - Full-screen video background with animated text sequences
- **Portfolio Grid** - Masonry-style gallery with category filtering and lightbox viewer
- **Interactive Package Cards** - Animated pricing cards with hover effects and light leaks
- **About Section** - Split-screen layout with line-by-line text animation
- **Smart Booking System** - Distance-based package availability with email-only contact
- **Micro-Interactions** - Glow effects, parallax scrolling, and smooth transitions throughout
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Loading Animation** - Cinematic intro with logo reveal

## 🎨 Design Theme

- **Colors:**
  - Primary: Deep Charcoal (#0A0A0A)
  - Secondary: Warm Gold (#C89B3C)
  - Accent: Cinematic Orange (#FF6A00)

- **Typography:**
  - Headlines: Playfair Display / Cinzel (bold, cinematic)
  - Body: Inter / Montserrat / Poppins (clean sans-serif)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project folder:
```bash
cd les-visual-eye
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## 📝 Configuration

### Adding Your Images

Replace the placeholder images in the following locations:

1. **Hero Section** - Add your hero video/image:
   - `public/hero-video.mp4` or `hero-placeholder.jpg`
   - Update `src/components/Hero/Hero.tsx` line 8-9

2. **Portfolio** - Add portfolio images:
   - Place images in `public/portfolio/`
   - Update `src/components/Portfolio/Portfolio.tsx` lines 13-20 with your actual images

3. **About Section** - Add your portrait:
   - Add your portrait to `public/about-portrait.jpg`
   - Update `src/components/About/About.tsx` line 32

4. **Contact Section** - Add contact portrait:
   - Add image to `public/contact-portrait.jpg`
   - Update `src/components/Contact/Contact.tsx` line 220

### Setting Up Email Contact (EmailJS)

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)

2. Create an email service and template

3. Get your credentials:
   - Service ID
   - Template ID
   - Public Key

4. Update `src/components/Contact/Contact.tsx` lines 51-63:
```typescript
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  {
    from_name: formData.name,
    from_email: formData.email,
    location: formData.location,
    package: formData.package,
    meet_halfway: formData.meetHalfway ? 'Yes' : 'No',
    preferred_location: formData.preferredLocation,
    message: formData.message
  },
  'YOUR_PUBLIC_KEY'
);
```

### Configuring Distance-Based Booking

Update the distance calculation in `src/components/Contact/Contact.tsx` lines 8-18:

```typescript
const calculateDistance = (location: string): number => {
  // Add your location keywords and distances
  const lowerLocation = location.toLowerCase();

  if (lowerLocation.includes('your-city')) return 10;
  if (lowerLocation.includes('nearby-city')) return 45;
  // Add more locations as needed

  return 70; // Default: far away
};
```

### Distance Rules

- **0-15km:** All packages available (R400-R1,200)
- **15-50km:** Deluxe & Full Experience only (R700-R1,200)
- **50-60km:** Meet Me Halfway option (Travel fee applies)
- **Beyond 60km:** Currently unavailable

## 🎭 Customization

### Updating Text Content

1. **Hero Section** - `src/components/Hero/Hero.tsx`
   - Tagline (line 28)
   - Main title (line 38)
   - Subtitle (line 55)

2. **Portfolio Categories** - `src/components/Portfolio/Portfolio.tsx`
   - Category names (lines 5-12)
   - Portfolio items (lines 15-22)

3. **Package Pricing** - `src/components/Packages/Packages.tsx`
   - Package details (lines 6-51)

4. **About Text** - `src/components/About/About.tsx`
   - Personal bio (lines 62-90)

5. **Contact Info** - `src/components/Contact/Contact.tsx`
   - Service area details (lines 227-233)

### Changing Colors

Update `tailwind.config.js`:
```javascript
colors: {
  charcoal: '#YOUR_DARK_COLOR',
  gold: '#YOUR_GOLD_COLOR',
  'cinematic-orange': '#YOUR_ACCENT_COLOR',
}
```

## 📦 Building for Production

1. Build the project:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

3. The `dist` folder contains your production-ready files

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd les-visual-eye
vercel
```

3. Follow the prompts to link your project

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Manual Deployment

Upload the contents of the `dist` folder to any static hosting service:
- GitHub Pages
- Cloudflare Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 🎬 Animation Features

- **Scroll-triggered animations** - Elements fade in as you scroll
- **Parallax effects** - Background layers move at different speeds
- **Hover interactions** - Glow effects, zoom, and scale on hover
- **Light leaks** - Cinematic light streak animations on package cards
- **Smooth transitions** - All section transitions feel like movie cuts

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

All components automatically adjust layout and functionality for different screen sizes.

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **EmailJS** - Email integration
- **React Icons** - Icon library

## 📄 License

© 2025 Les Visual Eye. All rights reserved.

## 💬 Support

For questions or customization help:
- Check the inline code comments
- Review the project context files in `../project_context/`
- All components are fully documented

---

**Built with cinematic precision. Every frame tells a story.** 🎥✨
