'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { signOut } from '@/lib/firebase-auth'

export function useAuthRedirect() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (!loading && !isAuthenticated && !isRedirecting) {
      setIsRedirecting(true)
      router.push('/auth/signin')
    }
  }, [isAuthenticated, loading, router, isRedirecting])

  return { isAuthenticated, loading, isRedirecting }
}

export async function handleSignOut() {
  try {
    await signOut()
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
