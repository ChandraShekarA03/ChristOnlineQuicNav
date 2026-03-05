'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Sidebar } from './sidebar'
import { DashboardHeader } from './dashboard-header'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={cn(
      'min-h-screen transition-all duration-500',
      theme === 'dark' ? 'dark' : ''
    )}>
      {/* Clean background */}
      <div className="fixed inset-0 -z-10">
        <div className={cn(
          'absolute inset-0 transition-colors duration-500',
          theme === 'dark' 
            ? 'bg-[#0f1129]' 
            : 'bg-gradient-to-b from-[#fafbff] to-[#f0f2ff]'
        )} />
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#7C83FF 1px, transparent 1px), linear-gradient(90deg, #7C83FF 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Corner accents */}
        <div className={cn(
          'absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500',
          theme === 'dark' ? 'bg-primary-600/5' : 'bg-primary-400/10'
        )} />
        <div className={cn(
          'absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl transition-opacity duration-500',
          theme === 'dark' ? 'bg-primary-700/5' : 'bg-primary-300/10'
        )} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 transform transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0',
        sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      )}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen">
        <DashboardHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onThemeToggle={toggleTheme}
          currentTheme={theme}
        />
        
        <main className={cn(
          'p-4 sm:p-6 lg:p-8 transition-opacity duration-500',
          mounted ? 'opacity-100' : 'opacity-0'
        )}>
          <div className="mx-auto max-w-7xl animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}