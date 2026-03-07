'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Sidebar } from './sidebar'
import { DashboardHeader } from './dashboard-header'
import { useAuth } from '@/lib/auth-context'
import { Loading } from '@/components/ui/loading'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const { loading } = useAuth()

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background-secondary">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-violet-500/30 animate-spin-slow">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm" />
            </div>
            <div className="absolute inset-0 w-16 h-16 rounded-2xl border-2 border-violet-300 dark:border-violet-700 animate-ping" />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-text-secondary font-body animate-pulse"
          >
            Loading dashboard...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'min-h-screen flex transition-all duration-300',
        theme === 'dark'
          ? 'dark bg-gradient-to-br from-secondary to-secondary-dark'
          : 'bg-gradient-to-br from-background to-background-secondary'
      )}
    >
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen || true ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-y-0 left-0 z-50 w-64 lg:relative lg:translate-x-0"
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onThemeToggle={toggleTheme}
          currentTheme={theme}
        />

        <main className="flex-1 px-6 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </motion.div>
  )
}
