# Firebase Setup Guide

## Firebase Configuration Required

To use this application, you need to set up a Firebase project and configure the following:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter your project name (e.g., "Christ Faculty Hub")
4. Follow the setup wizard
5. Enable Google Analytics (optional)

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Click **Save**

### 3. Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development) or **Production mode** (for production)
4. Select a location closest to your users
5. Click **Enable**

### 4. Register Web App

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the **Web** icon (`</>`)
4. Register your app with a nickname (e.g., "Christ Faculty Hub Web")
5. Copy the `firebaseConfig` object

### 5. Update Environment Variables

Update `.env.local` with your Firebase configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abc123"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX"
```

### 6. Firestore Security Rules

For **production**, update your Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if user is admin
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'ADMIN';
    }
    
    function isSuperAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'SUPER_ADMIN';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated() && (request.auth.uid == userId || isAdmin() || isSuperAdmin());
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isAuthenticated() && (request.auth.uid == userId || isAdmin() || isSuperAdmin());
      allow delete: if isSuperAdmin();
    }
    
    // Links collection
    match /links/{linkId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && (resource.data.userId == request.auth.uid || isAdmin() || isSuperAdmin());
      allow delete: if isAuthenticated() && (resource.data.userId == request.auth.uid || isAdmin() || isSuperAdmin());
    }
    
    // LMS Modules collection
    match /lms-modules/{moduleId} {
      allow read: if isAuthenticated();
      allow create: if isAdmin() || isSuperAdmin();
      allow update: if isAdmin() || isSuperAdmin();
      allow delete: if isAdmin() || isSuperAdmin();
    }
    
    // LMS Logs collection
    match /lms-logs/{logId} {
      allow read: if isAuthenticated() && (resource.data.userId == request.auth.uid || isAdmin() || isSuperAdmin());
      allow create: if isAuthenticated();
      allow update: if false;
      allow delete: if isSuperAdmin();
    }
  }
}
```

### 7. Firestore Indexes

Create the following indexes in Firebase Console → **Firestore Database** → **Indexes**:

```
Collection: links
Fields: userId (Ascending), createdAt (Descending)

Collection: links
Fields: category (Ascending)

Collection: links
Fields: department (Ascending)

Collection: lms-logs
Fields: userId (Ascending), createdAt (Descending)
```

### 8. Firebase Collections Structure

The application uses the following Firestore collections:

#### `users`
```typescript
{
  email: string
  name: string
  department: string
  role: 'FACULTY' | 'ADMIN' | 'SUPER_ADMIN'
  createdAt: string (ISO date)
  updatedAt: string (ISO date)
  lastLogin?: string (ISO date)
  image?: string (URL)
}
```

#### `links`
```typescript
{
  title: string
  url: string
  description?: string
  category: string
  department?: string
  userId: string
  createdAt: string (ISO date)
  updatedAt: string (ISO date)
}
```

#### `lms-modules`
```typescript
{
  name: string
  description?: string
  promptTemplate: string
  model: string
  createdAt: string (ISO date)
  updatedAt: string (ISO date)
}
```

#### `lms-logs`
```typescript
{
  userId: string
  moduleId: string
  tokensUsed: number
  prompt: string
  response?: string
  createdAt: string (ISO date)
}
```

### 9. Create First Admin User

After setting up Firebase:

1. Run the app: `npm run dev`
2. Sign up with your admin email
3. Go to Firebase Console → **Firestore Database**
4. Find your user document in the `users` collection
5. Update the `role` field to `SUPER_ADMIN`

### 10. Testing

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Sign in with your Firebase credentials
4. You should be redirected to the dashboard

## Troubleshooting

### Authentication Errors
- Ensure Email/Password authentication is enabled in Firebase
- Check that your `.env.local` file has the correct Firebase credentials
- Clear browser cache and cookies

### Firestore Errors
- Verify Firestore database is created
- Check security rules allow read/write operations
- Ensure all required indexes are created

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check that all environment variables are set correctly

## Production Deployment

For production deployment:

1. Update Firebase security rules to production mode
2. Set up environment variables in your hosting platform
3. Enable Firebase App Check for additional security
4. Configure CORS if needed
5. Set up Firebase Hosting (optional)

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
