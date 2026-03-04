'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Link as LinkIcon, 
  Brain, 
  BarChart3, 
  Users,
  Settings,
  LogOut,
  ChevronRight,
  HelpCircle,
  FileText,
  Shield,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'

const navigation = [
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
    badge: { count: 12, variant: 'default' as const }
  },
  { 
    name: 'LMS Modules', 
    href: '/dashboard/lms', 
    icon: Brain,
    badge: { count: 3, variant: 'success' as const }
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
    badge: { count: 47, variant: 'secondary' as const }
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
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn(
      'flex h-screen flex-col border-r transition-all duration-300',
      'border-light bg-gradient-to-b from-surface to-background-secondary',
      'dark:border-medium dark:from-surface-elevated dark:to-surface',
      collapsed ? 'w-20' : 'w-64'
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-light dark:border-medium">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-primary to-primary-dark shadow-md">
                <Zap className="h-4 w-4 text-white m-1" />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-primary font-heading">
                Christ Faculty
              </h2>
              <p className="text-xs text-secondary font-body">
                Navigation Hub
              </p>
            </div>
          </div>
        )}
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            <ChevronRight className={cn(
              'h-4 w-4 transition-transform',
              collapsed && 'rotate-180'
            )} />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* Primary Navigation */}
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 font-body',
                  isActive
                    ? 'nav-item-active'
                    : 'nav-item-inactive'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn(
                    'h-5 w-5 transition-colors',
                    isActive 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                  )} />
                  {!collapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </div>
                {!collapsed && item.badge && (
                  <Badge variant={item.badge.variant} size="sm">
                    {item.badge.count}
                  </Badge>
                )}
              </Link>
            )
          })}
        </div>

        {/* Divider */}
        {!collapsed && (
          <div className="my-6">
            <div className="h-px bg-gray-200 dark:bg-gray-800" />
          </div>
        )}

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && (
                  <span className="truncate">{item.name}</span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4">
        {collapsed ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-full h-12"
            onClick={() => setCollapsed(false)}
          >
            <Avatar size="sm" fallback="CF" />
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3 px-2">
              <Avatar 
                size="sm" 
                fallback="CF"
                className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  Faculty Admin
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Online
                </p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start gap-2 text-gray-500 dark:text-gray-400"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}