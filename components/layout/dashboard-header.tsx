'use client'

import { motion } from 'framer-motion'
import { Bell, Menu, Search, Settings, Sun, Moon, User, Sparkles, BellRing } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/auth-context'

interface DashboardHeaderProps {
  onMenuClick: () => void
  onThemeToggle: () => void
  currentTheme: 'light' | 'dark'
}

export function DashboardHeader({ onMenuClick, onThemeToggle, currentTheme }: DashboardHeaderProps) {
  const { userData } = useAuth()

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-violet-200/20 dark:border-violet-800/20 sticky top-0 z-40 shadow-lg shadow-violet-500/5"
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-violet-100/50 dark:hover:bg-violet-900/20 transition-colors"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            className="hidden sm:flex items-center gap-2.5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30"
            >
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </motion.div>
            <div>
              <h1 className="text-lg font-bold gradient-text font-heading">
                Christ Faculty Hub
              </h1>
              <p className="text-xs text-secondary -mt-0.5">
                Welcome back, {userData?.name?.split(' ')[0] || 'Faculty'}!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Center - Search */}
        <motion.div
          className="flex-1 max-w-md mx-4 hidden sm:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-violet-500" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur border-2 border-violet-100 dark:border-violet-800 pl-11 pr-12 py-2.5 text-sm focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 font-body placeholder:text-gray-400 hover:border-violet-300 dark:hover:border-violet-700 shadow-sm"
            />
            <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-gray-600 hidden sm:inline-block">
              ⌘K
            </kbd>
          </div>
        </motion.div>

        {/* Right section */}
        <motion.div
          className="flex items-center gap-1.5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Mobile search toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden hover:bg-violet-100/50 dark:hover:bg-violet-900/20"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme toggle */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="relative overflow-hidden hover:bg-violet-100/50 dark:hover:bg-violet-900/20 transition-colors"
            >
              <motion.div
                initial={false}
                animate={{ rotate: currentTheme === 'light' ? 0 : 180 }}
                transition={{ duration: 0.5 }}
              >
                {currentTheme === 'light' ? (
                  <Moon className="h-5 w-5 text-slate-600" />
                ) : (
                  <Sun className="h-5 w-5 text-yellow-500" />
                )}
              </motion.div>
            </Button>
          </motion.div>

          {/* Notifications */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-violet-100/50 dark:hover:bg-violet-900/20 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <Badge
                  variant="danger"
                  size="sm"
                  className="relative w-2.5 h-2.5 p-0 flex items-center justify-center text-xs bg-red-500 text-white rounded-full"
                />
              </span>
            </Button>
          </motion.div>

          {/* Settings */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-violet-100/50 dark:hover:bg-violet-900/20 transition-colors"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </motion.div>

          {/* Divider */}
          <div className="h-6 w-px bg-gradient-to-b from-transparent via-violet-200 dark:via-violet-800 to-transparent mx-2" />

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2.5 pl-2 pr-1 py-1.5 rounded-xl hover:bg-violet-100/50 dark:hover:bg-violet-900/20 transition-all duration-300 cursor-pointer"
          >
            <div className="relative">
              <Avatar
                size="sm"
                fallback={(userData?.name || 'U')[0].toUpperCase()}
                className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white ring-2 ring-white dark:ring-slate-800 shadow-lg shadow-violet-500/30"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-white dark:border-slate-800 rounded-full animate-pulse" />
            </div>
            <div className="hidden lg:block min-w-0">
              <p className="text-sm font-semibold text-primary truncate">
                {userData?.name || 'Faculty Admin'}
              </p>
              <p className="text-xs text-secondary truncate">
                {userData?.email || 'admin@christuniversity.in'}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  )
}
