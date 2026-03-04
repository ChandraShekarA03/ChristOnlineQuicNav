'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Sidebar } from './sidebar'
import { DashboardHeader } from './dashboard-header'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={cn(
      'min-h-screen transition-all duration-300',
      theme === 'dark' 
        ? 'dark bg-gradient-to-br from-secondary to-secondary-dark' 
        : 'bg-gradient-to-br from-background to-background-secondary',
      theme === 'dark' && 'dark'
    )}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        <DashboardHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onThemeToggle={toggleTheme}
          currentTheme={theme}
        />
        
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}