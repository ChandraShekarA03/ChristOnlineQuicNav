'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, Link, Brain, Users, TrendingUp, Activity, UserPlus, Settings, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DashboardData {
  overview: {
    totalLinks: number
    totalUsers: number
    totalLLMLogs: number
    totalTokens: number
  }
  recentActivity: {
    links: number
    logs: number
  }
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/analytics')
      if (response.ok) {
        const analyticsData = await response.json()
        setData({
          overview: analyticsData.overview,
          recentActivity: analyticsData.recentActivity
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    {
      title: 'Total Links',
      value: data?.overview.totalLinks || 0,
      icon: Link,
      color: 'text-christ-blue',
      change: `+${data?.recentActivity.links || 0} this week`,
      bgColor: 'bg-christ-blue/10'
    },
    {
      title: 'LLM Modules',
      value: data?.overview.totalLLMLogs || 0,
      icon: Brain,
      color: 'text-christ-blue',
      change: `+${data?.recentActivity.logs || 0} this week`,
      bgColor: 'bg-christ-blue/10'
    },
    {
      title: 'Token Usage',
      value: `${(data?.overview.totalTokens || 0).toLocaleString()}`,
      icon: Activity,
      color: 'text-christ-blue',
      change: 'Total consumed',
      bgColor: 'bg-christ-blue/10'
    },
    {
      title: 'Active Users',
      value: data?.overview.totalUsers || 0,
      icon: Users,
      color: 'text-christ-blue',
      change: 'Registered users',
      bgColor: 'bg-christ-blue/10'
    },
  ]

  const quickActions = [
    {
      title: 'Manage Links',
      description: 'Add, edit, and organize important links',
      icon: Link,
      path: '/dashboard/links',
      color: 'text-christ-blue',
      bgColor: 'bg-christ-blue/10 hover:bg-christ-blue/20'
    },
    {
      title: 'LLM Modules',
      description: 'Configure and manage AI modules',
      icon: Brain,
      path: '/dashboard/llm',
      color: 'text-christ-blue',
      bgColor: 'bg-christ-blue/10 hover:bg-christ-blue/20'
    },
    {
      title: 'View Analytics',
      description: 'Detailed usage statistics and reports',
      icon: BarChart3,
      path: '/dashboard/analytics',
      color: 'text-christ-blue',
      bgColor: 'bg-christ-blue/10 hover:bg-christ-blue/20'
    },
    {
      title: 'Manage Users',
      description: 'User accounts and permissions',
      icon: Users,
      path: '/dashboard/users',
      color: 'text-christ-blue',
      bgColor: 'bg-christ-blue/10 hover:bg-christ-blue/20'
    },
    {
      title: 'Add New User',
      description: 'Create faculty or admin accounts',
      icon: UserPlus,
      path: '/dashboard/users/new',
      color: 'text-christ-gold',
      bgColor: 'bg-christ-gold/10 hover:bg-christ-gold/20'
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: Settings,
      path: '/dashboard/settings',
      color: 'text-christ-blue',
      bgColor: 'bg-christ-blue/10 hover:bg-christ-blue/20'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-christ-blue-dark">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-christ-blue-dark mb-2">Christ Faculty Hub</h1>
        <p className="text-christ-blue text-lg">Centralized Management System for Academic Resources</p>
        <div className="w-24 h-1 bg-christ-gold mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-professional p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-christ-blue-dark/70 text-sm font-medium mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-christ-blue-dark mb-1">{stat.value}</p>
                <p className="text-christ-gold text-xs font-medium">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="card-professional p-6">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-5 h-5 text-christ-gold mr-2" />
            <h3 className="text-xl font-semibold text-christ-blue-dark">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-christ-gold rounded-full"></div>
              <div>
                <p className="text-christ-blue-dark text-sm font-medium">
                  {data?.recentActivity.links || 0} new links added
                </p>
                <p className="text-christ-blue-dark/60 text-xs">This week</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-christ-blue rounded-full"></div>
              <div>
                <p className="text-christ-blue-dark text-sm font-medium">
                  {data?.recentActivity.logs || 0} LLM requests processed
                </p>
                <p className="text-christ-blue-dark/60 text-xs">This week</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-christ-blue-dark text-sm font-medium">
                  {data?.overview.totalTokens || 0} tokens consumed
                </p>
                <p className="text-christ-blue-dark/60 text-xs">Total usage</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="card-professional p-6 lg:col-span-2">
          <div className="flex items-center mb-6">
            <Shield className="w-5 h-5 text-christ-gold mr-2" />
            <h3 className="text-xl font-semibold text-christ-blue-dark">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                onClick={() => router.push(action.path)}
                className={`h-auto p-4 justify-start transition-all duration-300 ${action.bgColor} border-2 border-transparent hover:border-christ-gold`}
                variant="outline"
              >
                <div className={`p-2 rounded-lg mr-3 ${action.bgColor}`}>
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-christ-blue-dark">{action.title}</div>
                  <div className="text-xs text-christ-blue-dark/70">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* System Status */}
      <Card className="card-professional p-6">
        <div className="flex items-center mb-6">
          <Activity className="w-5 h-5 text-christ-gold mr-2" />
          <h3 className="text-xl font-semibold text-christ-blue-dark">System Status</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 status-online rounded-full"></div>
            <div>
              <div className="text-christ-blue-dark font-semibold">Database</div>
              <div className="text-christ-blue-dark/60 text-sm">SQLite - Connected</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 status-online rounded-full"></div>
            <div>
              <div className="text-christ-blue-dark font-semibold">API Routes</div>
              <div className="text-christ-blue-dark/60 text-sm">All endpoints active</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 status-warning rounded-full"></div>
            <div>
              <div className="text-christ-blue-dark font-semibold">LLM Providers</div>
              <div className="text-christ-blue-dark/60 text-sm">Mock implementation</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}