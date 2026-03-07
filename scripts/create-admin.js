/**
 * Script to create default admin user in Firebase
 * Run this with: node scripts/create-admin.js
 * 
 * This script creates the admin user directly in your Firebase project
 */

const admin = require('firebase-admin');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
// You'll need to download a service account key from Firebase Console
async function createAdminUser() {
  console.log('🔧 Setting up Admin User Creator...\n');

  // Check if service account key exists
  const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
  
  if (!fs.existsSync(serviceAccountPath)) {
    console.log('❌ Service account key not found!');
    console.log('\n📋 To get your service account key:');
    console.log('1. Go to Firebase Console: https://console.firebase.google.com/project/classroom-engagement-christ/settings/serviceaccounts/adminsdk');
    console.log('2. Click "Generate new private key"');
    console.log('3. Save the downloaded JSON file as "serviceAccountKey.json" in the "scripts" folder');
    console.log('\n💡 Alternative: Use the Firebase Console method below\n');
    
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📝 MANUAL METHOD - Create Admin via Firebase Console:');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('Step 1: Create User in Firebase Authentication');
    console.log('  1. Go to: https://console.firebase.google.com/project/classroom-engagement-christ/authentication/users');
    console.log('  2. Click "Add user"');
    console.log('  3. Email: admin@christuniversity.in');
    console.log('  4. Password: Admin@123');
    console.log('  5. Click "Add user"\n');
    
    console.log('Step 2: Copy the User UID');
    console.log('  - After creating, click on the user');
    console.log('  - Copy the "User UID" (looks like: abc123xyz456...)\n');
    
    console.log('Step 3: Create User Document in Firestore');
    console.log('  1. Go to: https://console.firebase.google.com/project/classroom-engagement-christ/firestore');
    console.log('  2. Click "Start collection"');
    console.log('  3. Collection ID: users');
    console.log('  4. Document ID: (paste the User UID you copied)');
    console.log('  5. Add these fields:');
    console.log('     - email: admin@christuniversity.in (string)');
    console.log('     - name: Admin User (string)');
    console.log('     - department: Administration (string)');
    console.log('     - role: SUPER_ADMIN (string)');
    console.log('     - createdAt: (current date in ISO format) (string)');
    console.log('     - updatedAt: (current date in ISO format) (string)');
    console.log('  6. Click "Save"\n');
    
    console.log('Step 4: Test Login');
    console.log('  1. Go to: http://localhost:3000/auth/signin');
    console.log('  2. Email: admin@christuniversity.in');
    console.log('  3. Password: Admin@123');
    console.log('  4. You should now be able to access the dashboard!\n');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    return;
  }

  try {
    // Initialize admin SDK
    const serviceAccount = require('./serviceAccountKey.json');
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore();
    const auth = admin.auth();

    console.log('✅ Firebase Admin initialized\n');

    // Create user
    const userRecord = await auth.createUser({
      email: 'admin@christuniversity.in',
      password: 'Admin@123',
      displayName: 'Admin User',
      emailVerified: false,
    });

    console.log('✅ User created in Firebase Authentication');
    console.log(`   UID: ${userRecord.uid}`);
    console.log(`   Email: ${userRecord.email}\n`);

    // Create Firestore document
    const userData = {
      email: 'admin@christuniversity.in',
      name: 'Admin User',
      department: 'Administration',
      role: 'SUPER_ADMIN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null,
    };

    await db.collection('users').doc(userRecord.uid).set(userData);

    console.log('✅ User document created in Firestore');
    console.log('   Role: SUPER_ADMIN');
    console.log('   Department: Administration\n');

    console.log('═══════════════════════════════════════════════════════════');
    console.log('🎉 SUCCESS! Admin user created!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('\n📝 Login Credentials:');
    console.log('   Email: admin@christuniversity.in');
    console.log('   Password: Admin@123\n');
    console.log('🌐 Login URL: http://localhost:3000/auth/signin\n');
    console.log('💡 This user has SUPER_ADMIN access and can create other users!');
    console.log('═══════════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    console.log('\n💡 Try the manual method described above.\n');
  }
}

createAdminUser();
