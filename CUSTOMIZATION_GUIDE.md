# Customization Guide - Les Visual Eye

This guide will help you customize your cinematic photography website to make it truly yours.

## 🎨 Quick Start Checklist

### 1. Add Your Images (Priority 1)

#### Hero Section Video/Image
**Location:** `public/hero-background.mp4` or `.jpg`
**File:** `src/components/Hero/Hero.tsx` (line 9)

```tsx
{/* Replace this line: */}
<div className="absolute inset-0 bg-[url('/hero-placeholder.jpg')]..." />

{/* With your actual video: */}
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover opacity-40"
>
  <source src="/hero-background.mp4" type="video/mp4" />
</video>
```

#### Portfolio Images
**Location:** `public/portfolio/` folder
**File:** `src/components/Portfolio/Portfolio.tsx` (lines 15-22)

1. Add your photos to `public/portfolio/` (e.g., `1.jpg`, `2.jpg`, etc.)
2. Update the portfolioItems array:

```tsx
const portfolioItems = [
  {
    id: 1,
    category: 'Cinematic Faces',
    title: 'Your Title',
    image: '/portfolio/your-image-1.jpg'
  },
  // Add more items...
];
```

#### Your Portrait (About Section)
**Location:** `public/about-portrait.jpg`
**File:** `src/components/About/About.tsx` (line 32-37)

```tsx
{/* Replace the placeholder div with: */}
<img
  src="/about-portrait.jpg"
  alt="Lesego Portrait"
  className="w-full h-full object-cover"
/>
```

#### Contact Section Portrait
**Location:** `public/contact-portrait.jpg`
**File:** `src/components/Contact/Contact.tsx` (line 220-224)

```tsx
{/* Replace placeholder with: */}
<img
  src="/contact-portrait.jpg"
  alt="Les Photography"
  className="w-full h-full object-cover"
/>
```

---

## 📧 Setting Up Email Contact

### EmailJS Setup (Free)

1. **Sign up:** Go to [emailjs.com](https://www.emailjs.com/) and create a free account

2. **Create Email Service:**
   - Dashboard → Email Services → Add New Service
   - Choose your email provider (Gmail, Outlook, etc.)
   - Connect your email account

3. **Create Email Template:**
   - Dashboard → Email Templates → Create New Template
   - Use these variables in your template:
     ```
     Name: {{from_name}}
     Email: {{from_email}}
     Location: {{location}}
     Package: {{package}}
     Meet Halfway: {{meet_halfway}}
     Preferred Location: {{preferred_location}}
     Message: {{message}}
     ```

4. **Get Your Credentials:**
   - Service ID (from Email Services page)
   - Template ID (from Email Templates page)
   - Public Key (from Account → General)

5. **Update Your Code:**
   **File:** `src/components/Contact/Contact.tsx` (lines 51-63)

```typescript
// Uncomment and update these lines:
await emailjs.send(
  'service_xxxxxxx',      // Your Service ID
  'template_xxxxxxx',     // Your Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    location: formData.location,
    package: formData.package,
    meet_halfway: formData.meetHalfway ? 'Yes' : 'No',
    preferred_location: formData.preferredLocation,
    message: formData.message
  },
  'your_public_key_here'  // Your Public Key
);
```

---

## 📍 Configuring Distance-Based Booking

**File:** `src/components/Contact/Contact.tsx` (lines 8-18)

Update with your actual locations and distances:

```typescript
const calculateDistance = (location: string): number => {
  const lowerLocation = location.toLowerCase();

  // Within 15km - All packages available
  if (lowerLocation.includes('pretoria')) return 10;
  if (lowerLocation.includes('centurion')) return 12;
  if (lowerLocation.includes('hatfield')) return 8;

  // 15-50km - Deluxe & Full Experience only
  if (lowerLocation.includes('johannesburg')) return 45;
  if (lowerLocation.includes('sandton')) return 40;
  if (lowerLocation.includes('midrand')) return 30;

  // 50-60km - Meet Halfway option
  if (lowerLocation.includes('pretoria east')) return 55;

  // Beyond 60km - Not available
  return 70;
};
```

### Distance Rules Explained:
- **0-15km:** All packages (R400, R700, R1,200)
- **15-50km:** Deluxe & Full only (R700, R1,200)
- **50-60km:** Meet Halfway with travel fee
- **60km+:** Outside service area

---

## ✏️ Updating Text Content

### Hero Section
**File:** `src/components/Hero/Hero.tsx`

```tsx
// Line 28: Small tagline
"A Story Told in Every Frame"  // Change this

// Line 38: Main title
"LESEGO PHOTOGRAPHY"  // Change this

// Line 55: Subtitle
"Cinematic Portraits. Real Emotion. Main Character Energy."  // Change this
```

### Portfolio Categories
**File:** `src/components/Portfolio/Portfolio.tsx` (lines 5-12)

```tsx
const categories = [
  'All',
  'Your Category 1',  // Customize these
  'Your Category 2',
  'Your Category 3',
  // Add or remove categories
];
```

### Package Details
**File:** `src/components/Packages/Packages.tsx` (lines 6-51)

Update package names, prices, features, and descriptions:

```tsx
{
  id: 1,
  title: 'Your Package Name',
  price: 'R400',
  tagline: 'Your tagline here',
  features: [
    'Feature 1',
    'Feature 2',
    // Add more features
  ],
  description: 'Your package description'
}
```

### About Text
**File:** `src/components/About/About.tsx` (lines 65-95)

Replace each `<motion.p>` content with your own story:

```tsx
<motion.p ...>
  Tell your story here...
</motion.p>
```

---

## 🎨 Changing Colors

**File:** `tailwind.config.js`

```javascript
colors: {
  charcoal: '#0A0A0A',         // Dark background
  gold: '#C89B3C',             // Primary accent
  'cinematic-orange': '#FF6A00', // Secondary accent
}
```

Want a different look?
- **Blue theme:** `gold: '#4A90E2'`, `cinematic-orange: '#1E5A8E'`
- **Purple theme:** `gold: '#9B59B6'`, `cinematic-orange: '#8E44AD'`
- **Green theme:** `gold: '#2ECC71'`, `cinematic-orange: '#27AE60'`

---

## 🔤 Changing Fonts

**File:** `src/index.css` (line 1)

Update the Google Fonts import:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont1&family=YourFont2&display=swap');
```

**File:** `tailwind.config.js`

```javascript
fontFamily: {
  'display': ['YourDisplayFont', 'serif'],
  'sans': ['YourBodyFont', 'sans-serif'],
}
```

---

## 🌐 Social Media Links (Optional)

To add social media links to your footer:

**File:** `src/App.tsx` (lines 36-42)

```tsx
<footer className="py-8 px-4 bg-charcoal border-t border-gold/20">
  <div className="text-center">
    <div className="flex justify-center gap-6 mb-4">
      <a href="https://instagram.com/yourhandle" target="_blank" className="text-gold hover:text-cinematic-orange">
        Instagram
      </a>
      <a href="https://tiktok.com/@yourhandle" target="_blank" className="text-gold hover:text-cinematic-orange">
        TikTok
      </a>
    </div>
    <p className="text-gray-400">
      © 2025 Les Visual Eye. Cinematic Photography by Lesego.
    </p>
  </div>
</footer>
```

---

## 🚀 Testing Your Changes

1. Make sure the dev server is running:
```bash
npm run dev
```

2. Open `http://localhost:5173` in your browser

3. The site auto-refreshes when you save changes

4. Check both desktop and mobile views

---

## 🐛 Common Issues & Fixes

### Images not showing?
- Check file paths are correct
- Make sure images are in the `public` folder
- File names are case-sensitive

### Email not working?
- Verify EmailJS credentials are correct
- Check browser console for errors
- Make sure you uncommented the emailjs.send() code

### Animations not smooth?
- Clear browser cache
- Make sure Framer Motion is installed: `npm install framer-motion`

### Colors not changing?
- After editing `tailwind.config.js`, restart dev server
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

---

## 📱 Mobile Optimization Tips

All components are already responsive, but you can adjust:

**File:** Any component file

```tsx
// Responsive text sizes
className="text-xl md:text-2xl lg:text-3xl"

// Responsive padding
className="px-4 md:px-8 lg:px-16"

// Responsive grid
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## 💡 Pro Tips

1. **Use high-quality images** (2000px width minimum for hero)
2. **Compress images** before uploading (use tinypng.com)
3. **Test on real devices** not just browser dev tools
4. **Keep animations subtle** don't overdo it
5. **Update meta tags** in `index.html` for SEO

---

## 🆘 Need More Help?

- Check the inline comments in each component file
- Review the `README.md` for technical setup
- All animation timings are adjustable in the component files

**Happy customizing! 🎥✨**
