# 🎯 Create Admin User - Step by Step

## ✅ Quick Setup (5 Minutes)

Follow these exact steps to create your super admin account:

---

## Step 1: Create User in Firebase Authentication

1. **Open Firebase Console**
   - Go to: https://console.firebase.google.com/project/classroom-engagement-christ/authentication/users

2. **Add First User**
   - Click the **"Add user"** button (top right)
   - Fill in:
     ```
     Email: admin@christuniversity.in
     Password: Admin@123
     ```
   - Click **"Add user"**

3. **Copy the User UID**
   - You'll see the user in the list
   - Click on the user row
   - A panel opens on the right
   - **Copy the "User UID"** (it looks like: `abc123xyz456...`)
   - Keep this UID handy for the next step

---

## Step 2: Create User Document in Firestore

1. **Go to Firestore Database**
   - Navigate to: https://console.firebase.google.com/project/classroom-engagement-christ/firestore

2. **Create Collection**
   - Click **"Start collection"**
   - Collection ID: `users`
   - Click **"Next"**

3. **Create Document**
   - Document ID: **(Paste the User UID you copied)**
   - ⚠️ **IMPORTANT**: The Document ID MUST match the User UID from Authentication
   - Click **"Save"**

4. **Add Fields**
   Click **"Add field"** 6 times and add these fields:

   | Field Name | Type | Value |
   |------------|------|-------|
   | `email` | string | `admin@christuniversity.in` |
   | `name` | string | `Admin User` |
   | `department` | string | `Administration` |
   | `role` | string | `SUPER_ADMIN` |
   | `createdAt` | string | `2025-03-06T00:00:00.000Z` |
   | `updatedAt` | string | `2025-03-06T00:00:00.000Z` |

   **Field-by-field instructions:**
   
   **Field 1:**
   - Field: `email`
   - Type: `string`
   - Value: `admin@christuniversity.in`
   - Click "Save"

   **Field 2:**
   - Field: `name`
   - Type: `string`
   - Value: `Admin User`
   - Click "Save"

   **Field 3:**
   - Field: `department`
   - Type: `string`
   - Value: `Administration`
   - Click "Save"

   **Field 4:**
   - Field: `role`
   - Type: `string`
   - Value: `SUPER_ADMIN`
   - Click "Save"

   **Field 5:**
   - Field: `createdAt`
   - Type: `string`
   - Value: `2025-03-06T00:00:00.000Z`
   - Click "Save"

   **Field 6:**
   - Field: `updatedAt`
   - Type: `string`
   - Value: `2025-03-06T00:00:00.000Z`
   - Click "Save"

5. **Verify**
   - Your Firestore should now show:
     ```
     users (collection)
       └── [User UID] (document)
           ├── email: admin@christuniversity.in
           ├── name: Admin User
           ├── department: Administration
           ├── role: SUPER_ADMIN
           ├── createdAt: 2025-03-06T00:00:00.000Z
           └── updatedAt: 2025-03-06T00:00:00.000Z
     ```

---

## Step 3: Test Login

1. **Open the App**
   - Go to: http://localhost:3000/auth/signin

2. **Sign In**
   ```
   Email: admin@christuniversity.in
   Password: Admin@123
   ```

3. **Success!**
   - You should be redirected to the dashboard
   - You'll see "Admin User" in the top right
   - Role should show as "SUPER_ADMIN"

---

## Step 4: Create More Users

Now you can create more users from the dashboard:

1. **Navigate to Users Page**
   - Click **"Users"** in the sidebar
   - Or go to: http://localhost:3000/dashboard/users

2. **Click "Add New User"**

3. **Fill the Form**
   - Full Name: e.g., "John Doe"
   - Email: institutional email
   - Password: temporary password
   - Department: e.g., "Computer Science"
   - Role: FACULTY (default)

4. **User Can Sign In Immediately**
   - They can log in with the credentials you created

---

## 🐛 Troubleshooting

### Dashboard Still Loading?

**Check Browser Console (F12):**
1. Look for error messages
2. Check if you see:
   - "Auth state changed: admin@christuniversity.in" ✅
   - "User data found: SUPER_ADMIN" ✅

**If you see "User not in Firestore, creating document...":**
- This is OK! It means the user exists in Auth but not Firestore
- The app will auto-create the document with FACULTY role
- You need to manually update the role to SUPER_ADMIN in Firestore

**If you see errors about Firestore:**
- Make sure Firestore database is created
- Check if you're in test mode or have proper security rules

### "Permission Denied" Error?

1. **Check Firestore Security Rules:**
   - Go to: Firebase Console → Firestore Database → Rules
   - For development, use:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.time < timestamp.date(2025, 12, 31);
       }
     }
   }
   ```

2. **Publish the Rules**
   - Click "Publish"

### Can't See Users Page?

- Only SUPER_ADMIN and ADMIN can access
- Check your role in Firestore:
  - Go to Firestore → users → [your UID]
  - Verify `role` field is `SUPER_ADMIN`

---

## 📋 Quick Reference

### Firebase Console Links:
- **Authentication:** https://console.firebase.google.com/project/classroom-engagement-christ/authentication/users
- **Firestore:** https://console.firebase.google.com/project/classroom-engagement-christ/firestore
- **Rules:** https://console.firebase.google.com/project/classroom-engagement-christ/firestore/rules

### Admin Credentials:
```
Email: admin@christuniversity.in
Password: Admin@123
```

### Required Firestore Structure:
```
users (collection)
  └── [UID] (document - must match Auth UID)
      ├── email (string)
      ├── name (string)
      ├── department (string)
      ├── role (string) - FACULTY | ADMIN | SUPER_ADMIN
      ├── createdAt (string)
      └── updatedAt (string)
```

---

## 🎯 What's Fixed

✅ **Dashboard Loading Issue Fixed:**
- Added better auth state handling
- Auto-creates Firestore document if missing
- Added console logging for debugging
- Improved loading states

✅ **Auto User Creation:**
- If user exists in Auth but not Firestore, app creates document automatically
- Default role: FACULTY
- You can then upgrade to SUPER_ADMIN manually

---

## 🆘 Still Having Issues?

1. **Open Browser Console (F12)**
2. **Try to sign in**
3. **Look for these logs:**
   ```
   Auth state changed: admin@christuniversity.in
   Fetching user data for: [UID]
   User data found: SUPER_ADMIN
   ```
4. **Share the console output** if you need help

---

**Good luck! 🚀**
