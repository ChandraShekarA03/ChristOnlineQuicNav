import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
  UserCredential
} from 'firebase/auth'
import { auth } from './firebase'
import { getUserDocument, UserData, updateUserDocument, createUserDocument } from './firestore'

// ==================== AUTH OPERATIONS ====================

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<UserCredential> {
  try {
    console.log('Firebase signIn attempt for:', email)
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    
    console.log('Firebase signIn successful, UID:', userCredential.user.uid)

    // Update last login in Firestore or create user document
    if (userCredential.user) {
      const userDoc = await getUserDocument(userCredential.user.uid)
      if (userDoc) {
        console.log('User document found, updating last login')
        await updateUserDocument(userCredential.user.uid, {
          lastLogin: new Date().toISOString()
        })
      } else {
        // User doesn't exist in Firestore, create document
        console.log('User document not found, creating new one')
        const newUserData: UserData = {
          uid: userCredential.user.uid,
          email: userCredential.user.email || '',
          name: userCredential.user.displayName || 'User',
          department: 'General',
          role: 'FACULTY',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }
        await createUserDocument(userCredential.user.uid, newUserData)
        console.log('User document created successfully')
      }
    }

    return userCredential
  } catch (error: any) {
    console.error('Firebase signIn error:', {
      code: error.code,
      message: error.message
    })
    throw new Error(getAuthErrorMessage(error.code))
  }
}

/**
 * Sign out the current user
 */
export async function logOut(): Promise<void> {
  try {
    await signOut(auth)
  } catch (error: any) {
    console.error('Error signing out:', error)
    throw new Error(error.message || 'Failed to sign out')
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    console.error('Error resetting password:', error)
    throw new Error(error.message || 'Failed to send password reset email')
  }
}

/**
 * Get auth error message from error code
 */
export function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address'
    case 'auth/user-disabled':
      return 'This account has been disabled'
    case 'auth/user-not-found':
      return 'No account found with this email'
    case 'auth/wrong-password':
      return 'Incorrect password'
    case 'auth/email-already-in-use':
      return 'This email is already registered'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters'
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later'
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection'
    case 'auth/invalid-credential':
      return 'Invalid email or password'
    default:
      return 'An error occurred. Please try again'
  }
}

/**
 * Check if user email is verified
 */
export function isEmailVerified(user: User | null): boolean {
  return user?.emailVerified ?? false
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser
}
