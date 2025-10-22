# Client Gallery System - User Guide

## 🎬 Overview

Your website now has a complete **Client Gallery System** where visitors can:
1. Click "Explore More" from the Portfolio section
2. See all your client sessions in a grid
3. Click on a client to view their full 18-photo cinematic session
4. View photos in categories (Face Close-ups, Walking Shots, etc.)
5. Click any photo to view full-screen with zoom in/out

---

## 📸 Photo Structure (18 Photos Per Client)

Each client session follows this exact structure:

1. **Face Close-ups** (2 Photos) - Eyes, emotion, and energy
2. **Head & Shoulders Portrait** (2 Photos) - Timeless and cinematic
3. **Half-Body Shot** (2 Photos) - Attitude, confidence, and movement
4. **Full-Body Portrait** (2 Photos) - Outfit, stance, and personality
5. **Walking / Motion Shot** (2 Photos) - Natural movement and energy
6. **Looking Away Shot** (1 Photo) - Reflective, cinematic moment
7. **Seated Pose** (1 Photo) - Relaxed and grounded
8. **Over-the-Shoulder Look Back** (1 Photo) - Mystery and intrigue
9. **Expression Series** (3 Photos) - Smile, serious, confident
10. **Dramatic Lighting Portrait** (2 Photos) - Light and shadow finale

**Total: 18 Photos**

---

## 📁 How to Add a New Client Gallery

### Step 1: Create Client Folder

Create a folder structure in `public/clients/`:

```
public/clients/
├── client-1/
│   ├── cover.jpg                  ← Cover image for gallery grid
│   ├── face-1.jpg                 ← Face close-up 1
│   ├── face-2.jpg                 ← Face close-up 2
│   ├── head-1.jpg                 ← Head & shoulders 1
│   ├── head-2.jpg                 ← Head & shoulders 2
│   ├── half-1.jpg                 ← Half-body 1
│   ├── half-2.jpg                 ← Half-body 2
│   ├── full-1.jpg                 ← Full-body 1
│   ├── full-2.jpg                 ← Full-body 2
│   ├── walking-1.jpg              ← Walking/motion 1
│   ├── walking-2.jpg              ← Walking/motion 2
│   ├── looking-away.jpg           ← Looking away shot
│   ├── seated.jpg                 ← Seated pose
│   ├── over-shoulder.jpg          ← Over-the-shoulder
│   ├── expression-1.jpg           ← Expression 1 (smile)
│   ├── expression-2.jpg           ← Expression 2 (serious)
│   ├── expression-3.jpg           ← Expression 3 (confident)
│   ├── dramatic-1.jpg             ← Dramatic lighting 1
│   └── dramatic-2.jpg             ← Dramatic lighting 2
```

### Step 2: Update Gallery Data

**File:** `src/pages/Gallery.tsx` (lines 6-27)

Add your client to the `clients` array:

```typescript
const clients = [
  {
    id: 'client-1',                  // Unique ID (matches folder name)
    name: 'John Doe',                // Client name
    coverImage: '/clients/client-1/cover.jpg',  // Cover image path
    date: 'January 2025',            // Session date
    location: 'Pretoria'             // Location
  },
  {
    id: 'client-2',
    name: 'Jane Smith',
    coverImage: '/clients/client-2/cover.jpg',
    date: 'February 2025',
    location: 'Johannesburg'
  },
  // Add more clients...
];
```

### Step 3: Add Client Photo Data

**File:** `src/pages/ClientPortfolio.tsx` (lines 22-42)

Add client photos to `clientData`:

```typescript
const clientData: any = {
  'client-1': {
    name: 'John Doe',
    date: 'January 2025',
    location: 'Pretoria',
    photos: {
      'face-closeups': [
        '/clients/client-1/face-1.jpg',
        '/clients/client-1/face-2.jpg',
      ],
      'head-shoulders': [
        '/clients/client-1/head-1.jpg',
        '/clients/client-1/head-2.jpg',
      ],
      'half-body': [
        '/clients/client-1/half-1.jpg',
        '/clients/client-1/half-2.jpg',
      ],
      'full-body': [
        '/clients/client-1/full-1.jpg',
        '/clients/client-1/full-2.jpg',
      ],
      'walking-motion': [
        '/clients/client-1/walking-1.jpg',
        '/clients/client-1/walking-2.jpg',
      ],
      'looking-away': [
        '/clients/client-1/looking-away.jpg',
      ],
      'seated-pose': [
        '/clients/client-1/seated.jpg',
      ],
      'over-shoulder': [
        '/clients/client-1/over-shoulder.jpg',
      ],
      'expression-series': [
        '/clients/client-1/expression-1.jpg',
        '/clients/client-1/expression-2.jpg',
        '/clients/client-1/expression-3.jpg',
      ],
      'dramatic-lighting': [
        '/clients/client-1/dramatic-1.jpg',
        '/clients/client-1/dramatic-2.jpg',
      ],
    }
  },
  // Add more clients...
};
```

---

## 🎨 Image Requirements

### Cover Image (Gallery Grid)
- **Aspect Ratio:** 3:4 (portrait)
- **Size:** 800x1200px minimum
- **Format:** JPG
- **Compression:** Under 400KB
- **Style:** Your best shot from that session

### Individual Photos
- **Aspect Ratio:** 3:4 (portrait) recommended
- **Size:** 1500x2000px minimum
- **Format:** JPG
- **Compression:** Under 500KB each
- **Quality:** High resolution, cinematic grading

---

## 🌟 Features Included

### Client Selection Grid
- Cinematic hover effects
- Light leak animations
- Client name, date, location display
- Smooth transitions

### Client Portfolio Page
- 10 organized photo categories
- Category descriptions
- Responsive grid layouts
- Sequential fade-in animations
- Hover glow effects

### Full-Screen Viewer
- Click any photo to view full-screen
- Zoom in/out controls (up to 300%)
- Zoom level indicator
- Click outside to close
- Smooth transitions
- High-quality viewing experience

---

## 🎬 User Flow

1. **Home Page** → Click "Explore More" button in Portfolio section
2. **Gallery Page** → See grid of all client sessions
3. **Click Client Card** → Navigate to that client's portfolio
4. **View Photos** → Organized in 10 categories with descriptions
5. **Click Photo** → Full-screen viewer with zoom
6. **Back Navigation** → Return to gallery or home

---

## 🔧 Customization Tips

### Change Category Names

**File:** `src/pages/ClientPortfolio.tsx` (lines 8-19)

Edit the `photoCategories` array to change titles or descriptions.

### Add More Photos to a Category

Increase the `count` value in the category and add more photos to the data.

### Change Grid Layout

In `ClientPortfolio.tsx` (lines 147-152), modify the grid classes:
- 1 photo: `max-w-2xl mx-auto`
- 2 photos: `grid-cols-1 md:grid-cols-2`
- 3+ photos: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

---

## 💡 Quick Tips

1. **File Naming:** Use consistent naming (face-1.jpg, face-2.jpg, etc.)
2. **Compress Images:** Use tinypng.com before uploading
3. **Test on Mobile:** Verify all photos display correctly
4. **Aspect Ratio:** Keep 3:4 for consistency
5. **Cover Image:** Choose your most striking photo from each session

---

## 📱 Responsive Design

All gallery pages are fully responsive:

- **Desktop:** Full grid with hover effects
- **Tablet:** 2-column grids, touch-friendly
- **Mobile:** Single column, optimized for viewing

---

## 🎯 Example: Adding Your First Client

1. **Create folder:**
   ```
   public/clients/john-doe/
   ```

2. **Add 19 photos:**
   - cover.jpg (for grid)
   - 18 session photos (as listed above)

3. **Update Gallery.tsx:**
   ```typescript
   {
     id: 'john-doe',
     name: 'John Doe',
     coverImage: '/clients/john-doe/cover.jpg',
     date: 'January 2025',
     location: 'Pretoria'
   }
   ```

4. **Update ClientPortfolio.tsx:**
   Add complete photo paths for all categories

5. **Test:**
   - Visit http://localhost:5175/gallery
   - Click on John Doe
   - Verify all 18 photos display correctly

---

## ✅ Gallery Checklist

Before publishing a client gallery:

- [ ] All 18 photos added (correct categories)
- [ ] Cover image is your best shot
- [ ] All images compressed (< 500KB each)
- [ ] Client info updated (name, date, location)
- [ ] Tested on desktop and mobile
- [ ] Full-screen viewer works for all photos
- [ ] Zoom in/out functions properly
- [ ] Navigation back to gallery works

---

## 🆘 Troubleshooting

**Images not showing?**
- Check file paths match exactly (case-sensitive)
- Verify images are in `public/clients/` folder
- Hard refresh browser (Ctrl+Shift+R)

**Gallery page blank?**
- Make sure you added client data in both files
- Check console for errors
- Verify client ID matches folder name

**Zoom not working?**
- Click zoom buttons, don't scroll
- Maximum zoom is 300%
- Minimum zoom is 100%

---

**Your cinematic client gallery system is ready!** 🎥✨

Add your first client session and watch the magic happen!
