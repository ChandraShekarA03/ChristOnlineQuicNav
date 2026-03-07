'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { getUserDocument, UserData, updateLastLogin, createUserDocument } from './firestore'
import { logOut } from './firebase-auth'

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  isSuperAdmin: boolean
  signOut: () => Promise<void>
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isAuthenticated: false,
  isAdmin: false,
  isSuperAdmin: false,
  signOut: async () => {},
  refreshUserData: async () => {}
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUserData = useCallback(async (firebaseUser: User) => {
    try {
      console.log('Fetching user data for:', firebaseUser.uid)
      const data = await getUserDocument(firebaseUser.uid)

      if (data) {
        console.log('User data found:', data.role)
        setUserData(data)
        await updateLastLogin(firebaseUser.uid)
      } else {
        // User exists in Auth but not in Firestore - create document
        console.log('User not in Firestore, creating document...')
        const newUserData: UserData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || 'User',
          department: 'General',
          role: 'FACULTY',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        await createUserDocument(firebaseUser.uid, newUserData)
        setUserData(newUserData)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setUserData(null)
    }
  }, [])

  const refreshUserData = useCallback(async () => {
    if (user) {
      await fetchUserData(user)
    }
  }, [user, fetchUserData])

  useEffect(() => {
    console.log('Setting up auth state listener...')
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', {
        email: firebaseUser?.email,
        uid: firebaseUser?.uid,
        hasUser: !!firebaseUser
      })
      
      setUser(firebaseUser)

      if (firebaseUser) {
        console.log('Fetching user data for UID:', firebaseUser.uid)
        const data = await getUserDocument(firebaseUser.uid)

        if (data) {
          console.log('User data found:', {
            name: data.name,
            role: data.role,
            department: data.department
          })
          setUserData(data)
          await updateLastLogin(firebaseUser.uid)
        } else {
          // User exists in Auth but not in Firestore - create document
          console.log('User not in Firestore, creating document...')
          const newUserData: UserData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'User',
            department: 'General',
            role: 'FACULTY',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }

          try {
            await createUserDocument(firebaseUser.uid, newUserData)
            console.log('User document created successfully')
            setUserData(newUserData)
          } catch (error) {
            console.error('Error creating user document:', error)
          }
        }
      } else {
        console.log('No user signed in')
        setUserData(null)
      }

      setLoading(false)
      console.log('Auth state updated, loading:', false)
    })

    return () => {
      console.log('Cleaning up auth listener...')
      unsubscribe()
    }
  }, [])

  const value = {
    user,
    userData,
    loading,
    isAuthenticated: !!user,
    isAdmin: userData?.role === 'ADMIN' || userData?.role === 'SUPER_ADMIN',
    isSuperAdmin: userData?.role === 'SUPER_ADMIN',
    signOut: logOut,
    refreshUserData
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
