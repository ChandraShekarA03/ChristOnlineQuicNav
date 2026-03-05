'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MetricCard } from '@/components/ui/metric-card'
import { Loading } from '@/components/ui/loading'
import { 
  BarChart3, 
  Link, 
  Brain, 
  Users, 
  TrendingUp, 
  Activity, 
  UserPlus, 
  Settings, 
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  Globe,
  Zap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface DashboardData {
  overview: {
    totalLinks: number
    totalUsers: number
    totalLMSLogs: number
    totalTokens: number
  }
  recentActivity: {
    links: number
    logs: number
  }
}

// Mock data for charts
const monthlyData = [
  { name: 'Jan', users: 400, links: 240, tokens: 2400 },
  { name: 'Feb', users: 300, links: 139, tokens: 2210 },
  { name: 'Mar', users: 200, links: 980, tokens: 2290 },
  { name: 'Apr', users: 278, links: 390, tokens: 2000 },
  { name: 'May', users: 189, links: 480, tokens: 2181 },
  { name: 'Jun', users: 239, links: 380, tokens: 2500 },
]

const pieData = [
  { name: 'Active Users', value: 400, color: '#6366f1' },
  { name: 'Inactive Users', value: 300, color: '#8b5cf6' },
  { name: 'Pending Users', value: 100, color: '#06b6d4' },
]

const weeklyActivity = [
  { day: 'Mon', value: 120 },
  { day: 'Tue', value: 132 },
  { day: 'Wed', value: 101 },
  { day: 'Thu', value: 134 },
  { day: 'Fri', value: 90 },
  { day: 'Sat', value: 230 },
  { day: 'Sun', value: 210 },
]

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setData({
        overview: {
          totalLinks: 156,
          totalUsers: 847,
          totalLMSLogs: 1234,
          totalTokens: 98765
        },
        recentActivity: {
          links: 12,
          logs: 34
        }
      })
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
      change: `+${data?.recentActivity.links || 0} this week`,
      changeType: 'positive' as const,
      trend: [65, 59, 80, 81, 56, 55, 82]
    },
    {
      title: 'Active Users',
      value: data?.overview.totalUsers || 0,
      icon: Users,
      change: '+12% from last month',
      changeType: 'positive' as const,
      trend: [28, 48, 40, 19, 86, 27, 90]
    },
    {
      title: 'LMS Sessions',
      value: data?.overview.totalLMSLogs || 0,
      icon: Brain,
      change: `+${data?.recentActivity.logs || 0} today`,
      changeType: 'positive' as const,
      trend: [45, 52, 38, 65, 59, 80, 81]
    },
    {
      title: 'Token Usage',
      value: `${(data?.overview.totalTokens || 0).toLocaleString()}`,
      icon: Activity,
      change: '2.4K used today',
      changeType: 'neutral' as const,
      trend: [20, 30, 40, 35, 50, 49, 60]
    },
  ]

  const quickActions = [
    {
      title: 'Manage Links',
      description: 'Add, edit, and organize important links',
      icon: Link,
      path: '/dashboard/links',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30'
    },
    {
      title: 'LMS Console',
      description: 'Configure and monitor AI modules',
      icon: Brain,
      path: '/dashboard/lms',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: UserPlus,
      path: '/dashboard/users',
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30'
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: Settings,
      path: '/dashboard/settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: 'New user registered',
      user: 'Dr. Sarah Johnson',
      time: '2 minutes ago',
      icon: UserPlus,
      color: 'text-green-600 bg-green-50 dark:bg-green-900/20'
    },
    {
      id: 2,
      action: 'Link created',
      user: 'Prof. Michael Chen',
      time: '5 minutes ago',
      icon: Link,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
    },
    {
      id: 3,
      action: 'LMS session started',
      user: 'Dr. Anna Martinez',
      time: '12 minutes ago',
      icon: Brain,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20'
    },
    {
      id: 4,
      action: 'Analytics viewed',
      user: 'Prof. David Wilson',
      time: '1 hour ago',
      icon: BarChart3,
      color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
    },
  ]

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <div className="h-8 w-48 shimmer rounded-lg mb-2" />
            <div className="h-5 w-80 shimmer rounded-lg" />
          </div>
          <Loading size="lg" variant="dots" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card 
              key={i} 
              className="overflow-hidden"
              style={{ 
                opacity: 0,
                animation: `fadeInUp 0.5s ease-out ${i * 100}ms forwards`
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-24 shimmer rounded" />
                    <div className="h-8 w-20 shimmer rounded" />
                    <div className="h-3 w-28 shimmer rounded" />
                  </div>
                  <div className="h-12 w-12 shimmer rounded-xl" />
                </div>
                <div className="mt-4 h-12 w-full shimmer rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="h-6 w-40 shimmer rounded mb-4" />
              <div className="h-[300px] shimmer rounded-xl" />
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-6">
              <div className="h-6 w-40 shimmer rounded mb-4" />
              <div className="h-[300px] shimmer rounded-xl" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-down">
        <div>
          <h1 className="text-3xl font-bold gradient-text font-heading">
            Dashboard
          </h1>
          <p className="text-secondary mt-1">
            Welcome back! Here&apos;s what&apos;s happening in your faculty hub.
          </p>
        </div>
        <div className="flex items-center gap-3 animate-fade-in-right">
          <Badge variant="success" className="gap-2 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Online
          </Badge>
          <Button variant="outline" leftIcon={<Calendar className="w-4 h-4" />} className="hover-lift">
            Last 7 days
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <MetricCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            trend={stat.trend}
            animationDelay={index * 100}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Overview */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              Monthly Overview
            </CardTitle>
            <CardDescription>
              User activity, links, and token usage over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorLinks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorUsers)"
                  name="Users"
                />
                <Area 
                  type="monotone" 
                  dataKey="links" 
                  stroke="#f97316" 
                  fillOpacity={1} 
                  fill="url(#colorLinks)"
                  name="Links"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" />
              User Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of user status and engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Activity */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-600" />
              Weekly Activity
            </CardTitle>
            <CardDescription>
              User activity throughout the week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Frequently used actions and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.title}
                onClick={() => router.push(action.path)}
                className={cn(
                  'flex items-center w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200',
                  action.bgColor
                )}
              >
                <div className={cn('p-2 rounded-md mr-3', action.color)}>
                  <action.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                    {action.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest actions from faculty members
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={cn('p-2 rounded-lg', activity.color)}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    by {activity.user}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}