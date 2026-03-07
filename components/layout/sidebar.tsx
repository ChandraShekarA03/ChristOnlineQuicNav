'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Link as LinkIcon,
  Brain,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  FileText,
  Zap,
  LogOut,
  Sparkles,
  ChevronRight,
  Bell,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { logOut } from '@/lib/firebase-auth'
import toast from 'react-hot-toast'

interface NavigationItem {
  name: string
  href: string
  icon: any
  badge?: { count: number; variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' } | null
  adminOnly?: boolean
}

const navigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    badge: null
  },
  {
    name: 'Links',
    href: '/dashboard/links',
    icon: LinkIcon,
    badge: null
  },
  {
    name: 'LMS Modules',
    href: '/dashboard/lms',
    icon: Brain,
    badge: null
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    badge: null
  },
  {
    name: 'Users',
    href: '/dashboard/users',
    icon: Users,
    adminOnly: true,
    badge: null
  },
]

const secondaryNavigation = [
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Help & Support', href: '/dashboard/help', icon: HelpCircle },
  { name: 'Documentation', href: '/dashboard/docs', icon: FileText },
]

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()
  const { user, userData, isAdmin } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logOut()
      toast.success('Signed out successfully')
      router.push('/auth/signin')
    } catch (error) {
      toast.error('Failed to sign out')
    }
    onClose?.()
  }

  const filteredNav = navigation.filter(item => {
    if (item.adminOnly && !isAdmin) return false
    return true
  })

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex h-screen flex-col border-r border-violet-200/20 dark:border-violet-800/20 bg-gradient-to-b from-white/80 to-violet-50/50 dark:from-slate-900/80 dark:to-slate-900/50 backdrop-blur-xl w-64"
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-violet-200/20 dark:border-violet-800/20">
        <Link href="/dashboard" onClick={onClose} className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30"
          >
            <Sparkles className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <h2 className="text-sm font-bold gradient-text font-heading">
              Christ Faculty
            </h2>
            <p className="text-xs text-secondary font-body">
              Navigation Hub
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {/* Primary Navigation */}
        <div className="space-y-0.5">
          {filteredNav.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-300 font-body mb-0.5',
                    isActive
                      ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/30'
                      : 'text-secondary hover:bg-violet-100/50 dark:hover:bg-violet-900/20 hover:text-primary'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn(
                      'h-5 w-5 transition-all duration-300',
                      isActive
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400'
                    )} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge
                      variant={isActive ? 'outline' : item.badge.variant || 'default'}
                      size="sm"
                      className={cn(
                        'h-5 text-xs',
                        isActive ? 'border-white/30 text-white bg-white/20' : ''
                      )}
                    >
                      {item.badge.count}
                    </Badge>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-l-full"
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Divider */}
        <div className="my-4 px-2">
          <div className="h-px bg-gradient-to-r from-transparent via-violet-200 dark:via-violet-800 to-transparent" />
        </div>

        {/* Secondary Navigation */}
        <div className="space-y-0.5">
          {secondaryNavigation.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (filteredNav.length + index) * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-300 font-body mb-0.5',
                    isActive
                      ? 'bg-violet-100/80 dark:bg-violet-900/30 text-primary'
                      : 'text-secondary hover:bg-violet-100/50 dark:hover:bg-violet-900/20 hover:text-primary'
                  )}
                >
                  <item.icon className={cn(
                    'h-4.5 w-4.5 transition-all duration-300',
                    isActive
                      ? 'text-violet-600 dark:text-violet-400'
                      : 'text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400'
                  )} />
                  <span className="truncate">{item.name}</span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </nav>

      {/* User section */}
      <div className="border-t border-violet-200/20 dark:border-violet-800/20 p-4 space-y-3">
        {/* Pro banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 p-3 text-white"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-semibold">Pro Feature</span>
            </div>
            <p className="text-xs opacity-90">Unlock advanced analytics</p>
          </div>
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
        </motion.div>

        {/* Profile */}
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-violet-50/50 dark:bg-violet-900/20 border border-violet-200/20 dark:border-violet-800/20">
          <Avatar
            size="sm"
            fallback={(userData?.name || user?.email || 'U')[0].toUpperCase()}
            className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white ring-2 ring-white dark:ring-slate-800"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-primary truncate">
              {userData?.name || user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-secondary flex items-center gap-1">
              <Shield className="w-3 h-3" />
              {userData?.role || 'FACULTY'}
            </p>
          </div>
        </div>

        {/* Logout */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-secondary hover:text-danger hover:bg-danger/10 transition-all duration-300"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </motion.div>
  )
}
