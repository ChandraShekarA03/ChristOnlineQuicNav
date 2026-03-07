import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential
} from 'firebase/auth'
import { auth } from './firebase'
import { createUserDocument, getUserDocument } from './firestore'

export interface SignUpParams {
  email: string
  password: string
  name: string
  department?: string
}

export interface SignInParams {
  email: string
  password: string
}

/**
 * Sign up a new user with email and password
 */
export async function signUp({ email, password, name, department }: SignUpParams): Promise<UserCredential> {
  try {
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Update profile with display name
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name
      })
      
      // Create user document in Firestore
      await createUserDocument(userCredential.user.uid, {
        email,
        name,
        department: department || 'General',
        role: 'FACULTY',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }
    
    return userCredential
  } catch (error: any) {
    console.error('Sign up error:', error)
    throw new Error(error.message || 'Failed to sign up')
  }
}

/**
 * Sign in an existing user
 */
export async function signIn({ email, password }: SignInParams): Promise<UserCredential> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    
    // Update last login in Firestore
    if (userCredential.user) {
      const userDoc = await getUserDocument(userCredential.user.uid)
      if (userDoc) {
        // We'll update the last login time through a separate function
        // to avoid circular dependencies
      }
    }
    
    return userCredential
  } catch (error: any) {
    console.error('Sign in error:', error)
    throw new Error(error.message || 'Failed to sign in')
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth)
  } catch (error: any) {
    console.error('Sign out error:', error)
    throw new Error(error.message || 'Failed to sign out')
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    console.error('Password reset error:', error)
    throw new Error(error.message || 'Failed to send password reset email')
  }
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser
}

/**
 * Get Firebase Auth token
 */
export async function getToken(): Promise<string | null> {
  const user = auth.currentUser
  if (!user) return null
  
  try {
    return await user.getIdToken()
  } catch (error) {
    console.error('Error getting token:', error)
    return null
  }
}
