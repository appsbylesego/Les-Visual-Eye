# Firebase Setup Guide for Client Portal

## Phase 1 - Authentication Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `les-visual-eye` (or your preferred name)
4. Click Continue and follow the setup steps
5. Enable Google Analytics (optional)

### Step 2: Add Web App to Firebase Project

1. In your Firebase project dashboard, click the **Web icon** (`</>`) to add a web app
2. Register your app:
   - App nickname: `Les Visual Eye Website`
   - Check "Also set up Firebase Hosting" (optional)
3. Click "Register app"

### Step 3: Copy Firebase Configuration

After registering, you'll see your Firebase configuration. Copy the config object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "les-visual-eye.firebaseapp.com",
  projectId: "les-visual-eye",
  storageBucket: "les-visual-eye.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### Step 4: Update Your Code

1. Open `src/config/firebase.ts`
2. Replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 5: Enable Google Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Google** provider
3. Toggle "Enable"
4. Enter your project support email
5. Click **Save**

### Step 6: Set up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Select **Start in test mode** (for now - we'll add security rules later)
4. Choose your Cloud Firestore location (closest to your users)
5. Click **Enable**

### Step 7: Configure Authorized Domains

1. In Firebase Console, go to **Authentication** → **Settings** → **Authorized domains**
2. Add your development domain: `localhost`
3. Later, add your production domain (e.g., `lesvisualeye.com`)

### Step 8: Test the Setup

1. Save all files and restart your dev server:
   ```bash
   npm run dev
   ```

2. Navigate to your site and click **"Client Portal"** button
3. Try signing in with Google
4. You should be redirected to the Client Portal dashboard

### Step 9: Make Yourself an Admin (Optional)

To access admin features later:

1. Sign in to your portal at least once
2. Go to Firebase Console → **Firestore Database**
3. Find the `users` collection
4. Find your user document (by your email)
5. Edit the document and change `role` from `"client"` to `"admin"`
6. Save

Now when you sign in, you'll have admin access!

---

## Security Notes

⚠️ **IMPORTANT**:
- Never commit your `firebase.ts` file with real credentials to public repositories
- Add `src/config/firebase.ts` to `.gitignore` if needed
- Use environment variables for production

---

## What's Next?

### Phase 2 (Coming Soon):
- Booking form with distance calculation
- Queue management
- Client can view their bookings

### Phase 3 (Future):
- Real-time chat system
- Admin dashboard
- Notifications

---

## Troubleshooting

**"Firebase: Error (auth/configuration-not-found)"**
- You haven't replaced the placeholder config in `firebase.ts`

**"Firebase: Error (auth/unauthorized-domain)"**
- Add your domain to Authorized domains in Firebase Console

**"Can't sign in with Google"**
- Make sure Google provider is enabled in Firebase Authentication

**"User document not created"**
- Check Firestore rules allow writes
- Check browser console for errors

---

## File Structure

```
src/
├── config/
│   └── firebase.ts          # Firebase configuration
├── context/
│   └── AuthContext.tsx      # Authentication context provider
├── components/
│   └── ProtectedRoute.tsx   # Route protection wrapper
├── pages/
│   ├── Login.tsx           # Login page with Google Sign-in
│   └── ClientPortal.tsx    # Client dashboard (Phase 1 basic)
```

---

**Your Phase 1 Client Portal is ready! 🎬✨**

Users can now sign in with Google and access their personal dashboard. The foundation is set for Phase 2 (booking system) and Phase 3 (chat system).
