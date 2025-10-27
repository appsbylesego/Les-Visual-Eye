# 📸 Profile Picture Upload Feature

## ✅ What's New:

Users can now **upload and update their profile pictures** directly from their portal!

### Features:
- **Click-to-upload** profile picture (camera icon)
- **Image validation** (file type and size)
- **Real-time upload** to Firebase Storage
- **Auto-sync** with Firebase Auth and Firestore
- **Hover effects** showing upload icon
- Profile picture displayed in:
  - Client Portal dashboard
  - Admin Dashboard header
  - Chat messages (future enhancement)

---

## 🎯 How It Works:

### For Users (Client Portal):

1. **Sign in** to your Client Portal (`/portal`)
2. Go to **Dashboard** view
3. Scroll to **"Your Profile"** section
4. **Hover** over your profile picture
5. **Click** the camera icon (bottom-right corner)
6. **Select an image** from your device
7. Image uploads automatically
8. **Page refreshes** to show new profile picture

### For Admin (Admin Dashboard):

1. **Sign in** and go to Admin Dashboard (`/admin`)
2. Your profile picture appears in the **top-right header**
3. **Hover** over it and **click camera icon**
4. **Upload** your profile picture
5. Appears everywhere (dashboard, chat, etc.)

---

## 🔧 Technical Implementation:

### 1. **Firebase Storage**
- Profile pictures stored in: `profile-pictures/{userId}`
- Each user has **one profile picture** (overwrites on upload)
- Generates a **download URL** for display

### 2. **File Validation**
- **File type**: Only images (jpg, png, gif, etc.)
- **File size**: Maximum 5MB
- Error messages displayed if validation fails

### 3. **Upload Process**
```typescript
1. User selects image file
2. Validate file type and size
3. Upload to Firebase Storage at `profile-pictures/{userId}`
4. Get download URL
5. Update Firebase Auth user.photoURL
6. Update Firestore users/{userId}.photoURL
7. Refresh page to show new photo
```

### 4. **Component Created**
- **`ProfilePictureUpload.tsx`**: Reusable upload component
  - Circular profile picture display
  - Camera icon overlay on hover
  - Upload button (bottom-right)
  - Loading spinner during upload
  - Error handling

---

## 🔒 Firebase Storage Security Rules:

Add these rules to allow profile picture uploads:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Profile pictures - users can only upload their own
    match /profile-pictures/{userId} {
      // Allow read access to all authenticated users
      allow read: if request.auth != null;

      // Allow write only to the user's own profile picture
      allow write: if request.auth != null && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024  // Max 5MB
                   && request.resource.contentType.matches('image/.*');  // Images only
    }
  }
}
```

**To add these rules:**
1. Firebase Console → **Storage**
2. Click **"Rules"** tab
3. Paste the rules above
4. Click **"Publish"**

---

## 🎨 UI/UX Details:

### Profile Picture Display:
- **Circular** with gold border (4px)
- **24px x 24px** (96px in admin header)
- Default: Gold camera icon on gold/10 background
- **Hover**: Shows upload icon overlay

### Upload Button:
- **Small circle** (bottom-right corner)
- **Gold background** with charcoal camera icon
- **Hover**: Changes to cinematic-orange
- **Click**: Opens file picker
- **Loading**: Shows spinner

### Error States:
- **File too large**: "Image size should be less than 5MB"
- **Wrong file type**: "Please select an image file"
- **Upload failed**: "Failed to upload profile picture. Please try again."

---

## 📁 Files Modified:

```
src/
├── config/
│   └── firebase.ts                 # Added Firebase Storage import
├── components/
│   └── ProfilePictureUpload.tsx   # NEW: Upload component
├── pages/
│   ├── ClientPortal.tsx            # Added ProfilePictureUpload to profile section
│   └── AdminDashboard.tsx          # Added ProfilePictureUpload to header
└── context/
    └── AuthContext.tsx             # Already handles photoURL (no changes needed)
```

---

## 🧪 Testing:

### Test Upload:

1. **Sign in** to portal
2. **Click camera icon** on profile picture
3. **Select a valid image** (< 5MB)
4. Should see "Uploading..." message
5. Page refreshes automatically
6. **New profile picture** displayed

### Test Validation:

1. Try uploading a **non-image file** (PDF, txt, etc.)
   - Should show error: "Please select an image file"

2. Try uploading a **large image** (> 5MB)
   - Should show error: "Image size should be less than 5MB"

### Test Persistence:

1. Upload a profile picture
2. **Logout** and **login again**
3. Profile picture should **persist**
4. Check in both:
   - Client Portal (`/portal`)
   - Admin Dashboard (`/admin`)

---

## 🚀 Future Enhancements (Optional):

- **Image cropping** before upload (square crop)
- **Image compression** to reduce file size
- **Multiple photo upload** for client galleries
- **Profile picture in chat messages** (sender avatars)
- **Remove profile picture** option
- **Upload progress bar** for large files

---

## 📝 Important Notes:

### Auto-Refresh:
- After upload, the page **automatically refreshes** to show the new photo
- This ensures the photo is displayed correctly everywhere
- Firebase Auth needs refresh to update `user.photoURL`

### Storage Location:
- Profile pictures are stored at: `profile-pictures/{userId}`
- Each upload **overwrites** the previous picture
- Old pictures are **automatically replaced** (no duplicates)

### Default Photo:
- If no photo uploaded, shows **gold camera icon**
- On hover, overlay suggests upload option

---

## ✅ Profile Picture Feature Complete!

Users can now:
- ✅ Upload custom profile pictures
- ✅ See profile pictures in Client Portal
- ✅ See profile pictures in Admin Dashboard
- ✅ Update profile pictures anytime
- ✅ Validated uploads (type & size)
- ✅ Secure storage with Firebase rules

**The profile picture system is fully functional!** 🎉
