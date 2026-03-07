'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loading } from '@/components/ui/loading'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/signin')
    }
  }, [isAuthenticated, loading, router])

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/30 animate-spin-slow">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm" />
            </div>
            <div className="absolute inset-0 w-20 h-20 rounded-2xl border-4 border-violet-300 dark:border-violet-700 animate-ping" />
          </div>
          <p className="text-lg font-medium text-slate-600 dark:text-slate-300 font-heading animate-pulse">
            Loading dashboard...
          </p>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null
  }

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}