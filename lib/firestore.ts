import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore'
import { db } from './firebase'

// Collection references
const USERS_COLLECTION = collection(db, 'users')
const LINKS_COLLECTION = collection(db, 'links')
const LMS_MODULES_COLLECTION = collection(db, 'lms-modules')
const LMS_LOGS_COLLECTION = collection(db, 'lms-logs')

// Types
export interface UserData {
  uid?: string
  email: string
  name: string
  department: string
  role: 'FACULTY' | 'ADMIN' | 'SUPER_ADMIN'
  createdAt: string
  updatedAt: string
  lastLogin?: string
  image?: string
}

export interface LinkData {
  id?: string
  title: string
  url: string
  description?: string
  category: string
  department?: string
  userId: string
  createdAt?: string
  updatedAt?: string
}

export interface LMSModuleData {
  id?: string
  name: string
  description?: string
  promptTemplate: string
  model: string
  createdAt?: string
  updatedAt?: string
}

export interface LMSLogData {
  id?: string
  userId: string
  moduleId: string
  tokensUsed: number
  prompt: string
  response?: string
  createdAt?: string
}

// ==================== USER OPERATIONS ====================

/**
 * Create a new user document
 */
export async function createUserDocument(uid: string, data: UserData): Promise<void> {
  try {
    await setDoc(doc(USERS_COLLECTION, uid), {
      ...data,
      updatedAt: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error creating user document:', error)
    throw new Error(error.message || 'Failed to create user document')
  }
}

/**
 * Get a user document by UID
 */
export async function getUserDocument(uid: string): Promise<UserData | null> {
  try {
    const docRef = doc(USERS_COLLECTION, uid)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { uid: docSnap.id, ...docSnap.data() } as UserData
    }
    
    return null
  } catch (error: any) {
    console.error('Error getting user document:', error)
    return null
  }
}

/**
 * Update a user document
 */
export async function updateUserDocument(uid: string, data: Partial<UserData>): Promise<void> {
  try {
    const docRef = doc(USERS_COLLECTION, uid)
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error updating user document:', error)
    throw new Error(error.message || 'Failed to update user document')
  }
}

/**
 * Get all users
 */
export async function getAllUsers(): Promise<UserData[]> {
  try {
    const querySnapshot = await getDocs(USERS_COLLECTION)
    return querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }) as UserData)
  } catch (error: any) {
    console.error('Error getting all users:', error)
    return []
  }
}

/**
 * Get users by department
 */
export async function getUsersByDepartment(department: string): Promise<UserData[]> {
  try {
    const q = query(USERS_COLLECTION, where('department', '==', department))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }) as UserData)
  } catch (error: any) {
    console.error('Error getting users by department:', error)
    return []
  }
}

/**
 * Update user's last login
 */
export async function updateLastLogin(uid: string): Promise<void> {
  try {
    const docRef = doc(USERS_COLLECTION, uid)
    await updateDoc(docRef, {
      lastLogin: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error updating last login:', error)
  }
}

// ==================== LINK OPERATIONS ====================

/**
 * Create a new link
 */
export async function createLink(data: LinkData): Promise<string> {
  try {
    const docRef = doc(LINKS_COLLECTION)
    const linkData: Omit<LinkData, 'id'> = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    await setDoc(docRef, linkData)
    return docRef.id
  } catch (error: any) {
    console.error('Error creating link:', error)
    throw new Error(error.message || 'Failed to create link')
  }
}

/**
 * Get a link by ID
 */
export async function getLink(id: string): Promise<LinkData | null> {
  try {
    const docRef = doc(LINKS_COLLECTION, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as LinkData
    }
    
    return null
  } catch (error: any) {
    console.error('Error getting link:', error)
    return null
  }
}

/**
 * Get all links
 */
export async function getAllLinks(): Promise<LinkData[]> {
  try {
    const q = query(LINKS_COLLECTION, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as LinkData)
  } catch (error: any) {
    console.error('Error getting all links:', error)
    return []
  }
}

/**
 * Get links by user ID
 */
export async function getLinksByUser(userId: string): Promise<LinkData[]> {
  try {
    const q = query(LINKS_COLLECTION, where('userId', '==', userId), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as LinkData)
  } catch (error: any) {
    console.error('Error getting links by user:', error)
    return []
  }
}

/**
 * Get links by category
 */
export async function getLinksByCategory(category: string): Promise<LinkData[]> {
  try {
    const q = query(LINKS_COLLECTION, where('category', '==', category))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as LinkData)
  } catch (error: any) {
    console.error('Error getting links by category:', error)
    return []
  }
}

/**
 * Get links by department
 */
export async function getLinksByDepartment(department: string): Promise<LinkData[]> {
  try {
    const q = query(LINKS_COLLECTION, where('department', '==', department))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as LinkData)
  } catch (error: any) {
    console.error('Error getting links by department:', error)
    return []
  }
}

/**
 * Update a link
 */
export async function updateLink(id: string, data: Partial<LinkData>): Promise<void> {
  try {
    const docRef = doc(LINKS_COLLECTION, id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error updating link:', error)
    throw new Error(error.message || 'Failed to update link')
  }
}

/**
 * Delete a link
 */
export async function deleteLink(id: string): Promise<void> {
  try {
    await deleteDoc(doc(LINKS_COLLECTION, id))
  } catch (error: any) {
    console.error('Error deleting link:', error)
    throw new Error(error.message || 'Failed to delete link')
  }
}

/**
 * Search links by title
 */
export async function searchLinks(queryString: string): Promise<LinkData[]> {
  try {
    // Note: For production, consider using Algolia or Elasticsearch for better search
    const allLinks = await getAllLinks()
    return allLinks.filter(link => 
      link.title.toLowerCase().includes(queryString.toLowerCase()) ||
      (link.description && link.description.toLowerCase().includes(queryString.toLowerCase()))
    )
  } catch (error: any) {
    console.error('Error searching links:', error)
    return []
  }
}

// ==================== LMS MODULE OPERATIONS ====================

/**
 * Create a new LMS module
 */
export async function createLMSModule(data: LMSModuleData): Promise<string> {
  try {
    const docRef = doc(LMS_MODULES_COLLECTION)
    const moduleData: Omit<LMSModuleData, 'id'> = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    await setDoc(docRef, moduleData)
    return docRef.id
  } catch (error: any) {
    console.error('Error creating LMS module:', error)
    throw new Error(error.message || 'Failed to create LMS module')
  }
}

/**
 * Get all LMS modules
 */
export async function getAllLMSModules(): Promise<LMSModuleData[]> {
  try {
    const querySnapshot = await getDocs(LMS_MODULES_COLLECTION)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as LMSModuleData)
  } catch (error: any) {
    console.error('Error getting LMS modules:', error)
    return []
  }
}

/**
 * Update an LMS module
 */
export async function updateLMSModule(id: string, data: Partial<LMSModuleData>): Promise<void> {
  try {
    const docRef = doc(LMS_MODULES_COLLECTION, id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Error updating LMS module:', error)
    throw new Error(error.message || 'Failed to update LMS module')
  }
}

/**
 * Delete an LMS module
 */
export async function deleteLMSModule(id: string): Promise<void> {
  try {
    await deleteDoc(doc(LMS_MODULES_COLLECTION, id))
  } catch (error: any) {
    console.error('Error deleting LMS module:', error)
    throw new Error(error.message || 'Failed to delete LMS module')
  }
}

// ==================== LMS LOG OPERATIONS ====================

/**
 * Create a new LMS log
 */
export async function createLMSLog(data: LMSLogData): Promise<string> {
  try {
    const docRef = doc(LMS_LOGS_COLLECTION)
    const logData: Omit<LMSLogData, 'id'> = {
      ...data,
      createdAt: new Date().toISOString()
    }
    await setDoc(docRef, logData)
    return docRef.id
  } catch (error: any) {
    console.error('Error creating LMS log:', error)
    throw new Error(error.message || 'Failed to create LMS log')
  }
}

/**
 * Get LMS logs by user ID
 */
export async function getLMSLogsByUser(userId: string): Promise<LMSLogData[]> {
  try {
    const q = query(LMS_LOGS_COLLECTION, where('userId', '==', userId), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as LMSLogData)
  } catch (error: any) {
    console.error('Error getting LMS logs by user:', error)
    return []
  }
}

/**
 * Get all LMS logs
 */
export async function getAllLMSLogs(): Promise<LMSLogData[]> {
  try {
    const q = query(LMS_LOGS_COLLECTION, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as LMSLogData)
  } catch (error: any) {
    console.error('Error getting all LMS logs:', error)
    return []
  }
}

/**
 * Get total tokens used by user
 */
export async function getTotalTokensByUser(userId: string): Promise<number> {
  try {
    const logs = await getLMSLogsByUser(userId)
    return logs.reduce((total, log) => total + log.tokensUsed, 0)
  } catch (error: any) {
    console.error('Error getting total tokens:', error)
    return 0
  }
}

/**
 * Get total tokens used by all users
 */
export async function getTotalTokens(): Promise<number> {
  try {
    const logs = await getAllLMSLogs()
    return logs.reduce((total, log) => total + log.tokensUsed, 0)
  } catch (error: any) {
    console.error('Error getting total tokens:', error)
    return 0
  }
}
