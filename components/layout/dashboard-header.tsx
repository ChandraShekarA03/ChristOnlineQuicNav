'use client'

import { Bell, Menu, Search, Settings, Sun, Moon, User } from 'lucide-react'
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
    <header className="bg-glass border-b border-light dark:border-medium backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold text-primary font-heading">
              Christ Faculty Hub
            </h1>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg bg-surface border border-medium pl-10 pr-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-body"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onThemeToggle}
            className="relative"
          >
            {currentTheme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="danger" 
              size="sm" 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white"
            >
              3
            </Badge>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-2">
            <Avatar 
              size="sm" 
              fallback="CF"
              className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
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