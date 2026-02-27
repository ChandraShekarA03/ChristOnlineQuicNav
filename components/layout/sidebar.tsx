'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Link as LinkIcon, 
  Brain, 
  BarChart3, 
  Users,
  LogOut 
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Links', href: '/dashboard/links', icon: LinkIcon },
  { name: 'LLM Modules', href: '/dashboard/llm', icon: Brain },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Users', href: '/dashboard/users', icon: Users, adminOnly: true },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="glass-panel w-64 h-full p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-christ-gold">Christ Faculty Hub</h1>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 rounded-xl transition-all duration-200',
                'hover:bg-white/10 hover:shadow-lg hover:shadow-christ-gold/20',
                isActive && 'bg-christ-blue/20 border border-christ-gold/50 shadow-lg shadow-christ-blue/20'
              )}
            >
              <item.icon className="w-5 h-5 mr-3 text-christ-gold" />
              <span className="text-white/90">{item.name}</span>
            </Link>
          )
        })}
      </nav>
      
      <div className="mt-auto">
        <button className="flex items-center w-full px-4 py-3 rounded-xl hover:bg-white/10 transition-colors">
          <LogOut className="w-5 h-5 mr-3 text-christ-gold" />
          <span className="text-white/90">Logout</span>
        </button>
      </div>
    </div>
  )
}