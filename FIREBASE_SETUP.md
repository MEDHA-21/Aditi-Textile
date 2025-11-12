# Firebase Setup Instructions

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: "aditi-textile" (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Enable **Google** sign-in method
   - Add your email as support email

## 3. Create Firestore Database

1. Go to **Build** → **Firestore Database**
2. Click "Create database"
3. Select **"Start in test mode"** (for development)
4. Choose a location (closest to your users)
5. Click "Enable"

### Firestore Security Rules (Update after testing):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products collection (public read, admin write)
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Orders collection
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 4. Set up Firebase Storage (for product images)

1. Go to **Build** → **Storage**
2. Click "Get started"
3. Select **"Start in test mode"**
4. Click "Done"

### Storage Security Rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 5. Get Firebase Configuration

1. In Firebase Console, click the gear icon → **Project settings**
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`)
4. Register app with nickname: "aditi-textile-web"
5. Copy the `firebaseConfig` object

## 6. Update Your Project

Replace the placeholder values in `src/firebase/config.js` with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## 7. Firestore Collections Structure

### Users Collection (`users/{userId}`)
```json
{
  "uid": "string",
  "email": "string",
  "displayName": "string",
  "photoURL": "string (optional)",
  "createdAt": "timestamp",
  "wishlist": [],
  "cart": [],
  "orders": []
}
```

### Products Collection (`products/{productId}`)
```json
{
  "id": "string",
  "name": "string",
  "category": "string (women/men/kids/others)",
  "price": "number",
  "originalPrice": "number",
  "discount": "number",
  "description": "string",
  "images": ["array of image URLs"],
  "sizes": ["array of sizes"],
  "stock": "number",
  "inStock": "boolean",
  "material": "string",
  "care": "string",
  "features": ["array of strings"],
  "specifications": "object",
  "rating": "number",
  "reviews": "number",
  "createdAt": "timestamp"
}
```

### Orders Collection (`orders/{orderId}`)
```json
{
  "orderId": "string",
  "userId": "string",
  "items": [
    {
      "productId": "string",
      "name": "string",
      "price": "number",
      "quantity": "number",
      "image": "string"
    }
  ],
  "total": "number",
  "status": "string (pending/processing/shipped/delivered)",
  "shippingAddress": "object",
  "paymentMethod": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## 8. Testing

1. Start your development server: `npm start`
2. Try signing up with email/password
3. Try signing in with Google
4. Check Firebase Console → Authentication to see registered users
5. Check Firestore Database to see user documents

## 9. Environment Variables (Optional but Recommended)

Create a `.env` file in your project root:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

Then update `config.js`:
```javascript
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
```

## Features Implemented

✅ Email/Password Authentication
✅ Google Sign-In
✅ User Profile Creation
✅ Wishlist sync with Firestore
✅ Cart sync with Firestore
✅ Auto-login on page refresh
✅ Guest user support (localStorage fallback)

## Next Steps

- [ ] Add product management for shopkeeper dashboard
- [ ] Implement orders system
- [ ] Add image upload to Firebase Storage
- [ ] Add password reset functionality
- [ ] Add email verification
- [ ] Implement real-time updates
- [ ] Add admin role management
