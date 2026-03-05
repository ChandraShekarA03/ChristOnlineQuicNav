'use client'

import { Bell, Menu, Search, Settings, Sun, Moon, User, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface DashboardHeaderProps {
  onMenuClick: () => void
  onThemeToggle: () => void
  currentTheme: 'light' | 'dark'
}

export function DashboardHeader({ onMenuClick, onThemeToggle, currentTheme }: DashboardHeaderProps) {
  return (
    <header className="bg-white/80 dark:bg-[#12152e]/90 backdrop-blur-xl border-b border-primary-100 dark:border-primary-900/50 sticky top-0 z-40 animate-fade-in-down">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:rotate-180 transition-transform duration-500"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden sm:flex items-center gap-2 animate-fade-in-left">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30 animate-pulse-glow">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold gradient-text font-heading">
              Christ Faculty Hub
            </h1>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4 animate-fade-in">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-xl bg-surface/80 backdrop-blur border border-medium pl-10 pr-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 font-body placeholder:text-gray-400 hover:border-primary-300 hover:shadow-md"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded hidden sm:inline-block">⌘K</kbd>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 animate-fade-in-right">
          {/* Theme toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onThemeToggle}
            className="relative overflow-hidden group"
          >
            <div className="transition-all duration-500 group-hover:rotate-180">
              {currentTheme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-500" />
              )}
            </div>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative group">
            <Bell className="h-5 w-5 transition-transform group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <Badge 
                variant="danger" 
                size="sm" 
                className="relative w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white rounded-full"
              >
                3
              </Badge>
            </span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="group">
            <Settings className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
          </Button>

          {/* Divider */}
          <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-700 to-transparent mx-2" />

          {/* Profile */}
          <div className="flex items-center gap-3 pl-2 group cursor-pointer hover:bg-surface-hover rounded-xl p-2 transition-all duration-300">
            <div className="relative">
              <Avatar 
                size="sm" 
                fallback="CF"
                className="bg-gradient-to-br from-primary-400 to-primary-600 text-white ring-2 ring-white dark:ring-gray-800 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                Faculty Admin
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                admin@christuniversity.in
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}