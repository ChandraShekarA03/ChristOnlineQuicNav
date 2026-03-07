# 👥 User Management Guide

## 📍 Where Are Users Stored?

Users are stored in **TWO locations** in Firebase:

### 1. 🔐 Firebase Authentication
**Purpose:** Handles secure login credentials and authentication tokens

**Location in Firebase Console:**
```
Firebase Console → Authentication → Users
```

**Stored Data:**
- UID (unique identifier)
- Email address
- Password (hashed & secured by Firebase)
- Email verification status
- Provider information
- Last sign-in time

**Security:**
- Passwords are automatically hashed by Firebase
- Cannot be viewed (only reset)
- Managed entirely by Firebase Auth service

---

### 2. 📄 Firestore Database
**Purpose:** Stores user profile data and application-specific information

**Location in Firebase Console:**
```
Firebase Console → Firestore Database → users collection
```

**Stored Data:**
```typescript
{
  uid: "user123",              // Unique user ID
  email: "john@christ.edu",     // Email address
  name: "John Doe",            // Full name
  department: "Computer Science", // Department
  role: "FACULTY",             // Role (FACULTY/ADMIN/SUPER_ADMIN)
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
  lastLogin: "2024-01-15T00:00:00Z",
  image?: "https://..."        // Profile picture URL (optional)
}
```

---

## 🛡️ User Roles

### FACULTY (Default)
- View and manage their own links
- Access LMS modules
- View personal analytics
- Cannot manage other users

### ADMIN
- All FACULTY permissions
- Create new users
- Edit user information
- Update user roles
- Manage all links and modules
- Cannot delete users (requires SUPER_ADMIN)

### SUPER_ADMIN
- All ADMIN permissions
- Delete users
- Access system settings
- Full system control

---

## 👨‍💼 Admin User Creation

### Method 1: Using the Dashboard UI (Recommended)

**Access:** `http://localhost:3000/dashboard/users`

**Steps:**
1. Navigate to **Users** in the dashboard sidebar
2. Click **"Add New User"** button
3. Fill in the form:
   - Full Name
   - Email (must be unique)
   - Password (min 6 characters)
   - Department (optional)
   - Role (FACULTY, ADMIN, or SUPER_ADMIN)
4. Click **"Create User"**

**What Happens:**
1. User is created in **Firebase Authentication** with email/password
2. User profile is created in **Firestore Database**
3. User can immediately sign in with the provided credentials

---

### Method 2: Firebase Console (Manual)

**For First Admin Account:**

1. Go to [Firebase Console](https://console.firebase.google.com/project/classroom-engagement-christ)
2. Navigate to **Authentication** → **Users**
3. Click **"Add user"**
4. Enter:
   - Email address
   - Password
5. Click **"Add user"**
6. Now go to **Firestore Database** → `users` collection
7. Click **"Add document"**
8. Set document ID to the user's UID (from Authentication)
9. Add fields:
   ```
   email: "your@email.com"
   name: "Your Name"
   department: "Your Department"
   role: "SUPER_ADMIN"
   createdAt: (current timestamp)
   updatedAt: (current timestamp)
   ```

---

## 📋 User Management Features

### ✅ What Admins Can Do:

1. **View All Users**
   - See complete user list
   - Search by name, email, or department
   - View user roles and last login

2. **Create Users**
   - Add new faculty members
   - Set initial role and department
   - Assign temporary passwords

3. **Edit Users**
   - Update name
   - Change department
   - Modify role (FACULTY ↔️ ADMIN ↔️ SUPER_ADMIN)
   - Email cannot be changed (Firebase limitation)

4. **View Statistics**
   - Total users count
   - Faculty members count
   - Admins count

### ❌ What Requires Firebase Console:

1. **Delete Users**
   - Client-side deletion is restricted for security
   - Must delete from Firebase Console → Authentication
   - Or implement server-side deletion with Admin SDK

2. **Reset Passwords**
   - Users can use "Forgot Password" feature
   - Or reset from Firebase Console

3. **Change Email**
   - Must be done in Firebase Console
   - Or implement server-side update with Admin SDK

---

## 🔒 Security Features

### Authentication Security
- Passwords hashed automatically by Firebase
- Email verification available (optional)
- Session management handled by Firebase
- Automatic token refresh

### Firestore Security Rules (Production)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Users can read their own data
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Admins can read all users
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['ADMIN', 'SUPER_ADMIN'];
      
      // Users can update their own profile (limited fields)
      allow update: if request.auth != null && request.auth.uid == userId;
      
      // Only admins can create users
      allow create: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['ADMIN', 'SUPER_ADMIN'];
      
      // Only super admins can delete users
      allow delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'SUPER_ADMIN';
    }
  }
}
```

---

## 📊 User Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                   User Creation Flow                    │
└─────────────────────────────────────────────────────────┘

1. Admin fills "Create User" form in Dashboard
         │
         ▼
2. Firebase Auth creates account
   - Stores: UID, email, password (hashed)
         │
         ▼
3. Firestore creates user document
   - Stores: profile data, role, department
         │
         ▼
4. User receives credentials
         │
         ▼
5. User can sign in immediately
```

---

## 🔄 Syncing Between Auth and Firestore

The app automatically keeps Auth and Firestore in sync:

### On Sign Up:
1. Create Auth account
2. Create Firestore document
3. Update display name in Auth

### On Sign In:
1. Authenticate with Firebase Auth
2. Fetch user data from Firestore
3. Update last login timestamp

### On Update:
1. Update Firestore document
2. Auth data remains unchanged (unless password change)

---

## 🛠️ Common Tasks

### How to Create a User Programmatically

```typescript
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { createUserDocument } from '@/lib/firestore'
import { auth } from '@/lib/firebase'

async function createUser(name: string, email: string, password: string, department: string, role: string) {
  // 1. Create in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  
  // 2. Update display name
  await updateProfile(userCredential.user, { displayName: name })
  
  // 3. Create in Firestore
  await createUserDocument(userCredential.user.uid, {
    email,
    name,
    department,
    role,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}
```

### How to Get All Users

```typescript
import { getAllUsers } from '@/lib/firestore'

const users = await getAllUsers()
console.log(users) // Array of all user documents
```

### How to Update User Role

```typescript
import { updateUserDocument } from '@/lib/firestore'

await updateUserDocument('user-uid', {
  role: 'ADMIN' // or 'SUPER_ADMIN'
})
```

---

## 🐛 Troubleshooting

### "User already exists"
- Email must be unique in Firebase Auth
- Check if user exists in Authentication → Users

### "Cannot create user in Firestore"
- Ensure Firestore database is created
- Check security rules allow writes
- Verify user UID matches between Auth and Firestore

### "User can't sign in after creation"
- Verify email and password are correct
- Check if user exists in BOTH Auth and Firestore
- Ensure email is not verified (if verification is required)

### "Can't see Users page"
- Only ADMIN and SUPER_ADMIN roles can access
- Check user's role in Firestore
- May need to manually update role in Firestore

---

## 📝 Best Practices

1. **Initial Setup**
   - Create SUPER_ADMIN manually in Firebase Console
   - Use strong passwords for admin accounts
   - Document admin credentials securely

2. **User Creation**
   - Use institutional email addresses
   - Set appropriate departments
   - Start with FACULTY role, promote as needed

3. **Role Management**
   - Limit SUPER_ADMIN to 1-2 people
   - Use ADMIN for department heads
   - FACULTY for regular users

4. **Security**
   - Enable email verification in production
   - Use strong Firestore security rules
   - Regular audit of user roles

5. **Maintenance**
   - Regular review of user list
   - Remove inactive users
   - Update departments as needed

---

## 🎯 Quick Reference

| Task | Where | Who Can Do |
|------|-------|------------|
| Create User | Dashboard UI | ADMIN, SUPER_ADMIN |
| Edit User | Dashboard UI | ADMIN, SUPER_ADMIN |
| Delete User | Firebase Console | SUPER_ADMIN only |
| Reset Password | Firebase Console | Any user (own), ADMIN (others) |
| Change Email | Firebase Console | User (own), ADMIN (others) |
| View Users | Dashboard UI | ADMIN, SUPER_ADMIN |
| Update Role | Dashboard UI / Firestore | ADMIN, SUPER_ADMIN |

---

## 📞 Need Help?

1. Check Firebase Console for user status
2. Review browser console for errors
3. Verify Firestore security rules
4. Ensure user exists in both Auth and Firestore

**Firebase Console:** https://console.firebase.google.com/project/classroom-engagement-christ
