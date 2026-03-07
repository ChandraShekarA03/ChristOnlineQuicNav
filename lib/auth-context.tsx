'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { getUserDocument, UserData, updateLastLogin, createUserDocument } from './firestore'

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isAuthenticated: false
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser?.email || 'No user')
      setUser(firebaseUser)

      if (firebaseUser) {
        try {
          // Fetch user data from Firestore
          console.log('Fetching user data for:', firebaseUser.uid)
          const data = await getUserDocument(firebaseUser.uid)
          
          if (data) {
            console.log('User data found:', data.role)
            setUserData(data)
            
            // Update last login
            await updateLastLogin(firebaseUser.uid)
          } else {
            // User exists in Auth but not in Firestore - create document
            console.log('User not in Firestore, creating document...')
            const newUserData: UserData = {
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
      } else {
        setUserData(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = {
    user,
    userData,
    loading,
    isAuthenticated: !!user
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
