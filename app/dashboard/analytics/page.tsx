'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MetricCard } from '@/components/ui/metric-card'
import { Loading } from '@/components/ui/loading'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Link, 
  Brain, 
  Activity, 
  Download,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Clock,
  Zap
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts'

interface AnalyticsData {
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
  topModules: Array<{
    name: string
    usage: number
    tokens: number
  }>
  tokenUsageByDay: Array<{
    date: string
    tokens: number
  }>
}

// Enhanced mock data
const enhancedTokenUsage = [
  { date: 'Mon', tokens: 2400, sessions: 24, users: 12 },
  { date: 'Tue', tokens: 1398, sessions: 20, users: 15 },
  { date: 'Wed', tokens: 9800, sessions: 45, users: 28 },
  { date: 'Thu', tokens: 3908, sessions: 32, users: 22 },
  { date: 'Fri', tokens: 4800, sessions: 38, users: 31 },
  { date: 'Sat', tokens: 3800, sessions: 25, users: 18 },
  { date: 'Sun', tokens: 4300, sessions: 29, users: 20 }
]

const modulePerformance = [
  { name: 'Text Generation', usage: 85, tokens: 45000, color: '#6366f1' },
  { name: 'Code Analysis', usage: 72, tokens: 32000, color: '#8b5cf6' },
  { name: 'Data Processing', usage: 68, tokens: 28000, color: '#06b6d4' },
  { name: 'Research Assistant', usage: 91, tokens: 52000, color: '#10b981' },
  { name: 'Language Translation', usage: 57, tokens: 18000, color: '#f59e0b' }
]

const timeRanges = [
  { label: 'Last 7 days', value: '7d', active: true },
  { label: 'Last 30 days', value: '30d', active: false },
  { label: 'Last 90 days', value: '90d', active: false },
  { label: 'Custom', value: 'custom', active: false }
]

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedRange, setSelectedRange] = useState('7d')

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000))
      setData({
        overview: {
          totalLinks: 156,
          totalUsers: 847,
          totalLMSLogs: 2431,
          totalTokens: 187650
        },
        recentActivity: {
          links: 23,
          logs: 156
        },
        topModules: modulePerformance,
        tokenUsageByDay: enhancedTokenUsage
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const metrics = [
    {
      title: 'Total Sessions',
      value: data?.overview.totalLMSLogs || 0,
      change: '+18.2% from last week',
      changeType: 'positive' as const,
      icon: Activity,
      trend: [45, 52, 38, 65, 59, 80, 81]
    },
    {
      title: 'Token Consumption',
      value: `${((data?.overview.totalTokens || 0) / 1000).toFixed(1)}K`,
      change: '+7.4% efficiency gain',
      changeType: 'positive' as const,
      icon: Zap,
      trend: [28, 48, 40, 19, 86, 27, 90]
    },
    {
      title: 'Active Modules',
      value: 5,
      change: '2 new this month',
      changeType: 'positive' as const,
      icon: Brain,
      trend: [20, 30, 40, 35, 50, 49, 60]
    },
    {
      title: 'Avg Response Time',
      value: '1.2s',
      change: '-0.3s improvement',
      changeType: 'positive' as const,
      icon: Clock,
      trend: [80, 75, 70, 65, 60, 58, 55]
    }
  ]

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Analytics
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Detailed insights into your LMS usage and performance
            </p>
          </div>
          <Loading size="lg" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Comprehensive insights into LMS usage, performance, and trends
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={selectedRange === range.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
              Filter
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            trend={metric.trend}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Token Usage Trend */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              Token Usage Trend
            </CardTitle>
            <CardDescription>
              Daily token consumption and session activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={enhancedTokenUsage}>
                <defs>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="tokens" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorTokens)"
                  name="Tokens"
                />
                <Area 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorSessions)"
                  name="Sessions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Module Performance */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary-600" />
              Module Performance
            </CardTitle>
            <CardDescription>
              Usage efficiency and token consumption by module
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={modulePerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" className="text-xs" />
                <YAxis dataKey="name" type="category" className="text-xs" width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar 
                  dataKey="usage" 
                  fill="#6366f1"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Performing Modules */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary-600" />
              Top Modules
            </CardTitle>
            <CardDescription>
              Best performing modules by efficiency
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {modulePerformance
              .sort((a, b) => b.usage - a.usage)
              .slice(0, 5)
              .map((module, index) => (
              <div key={module.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: module.color }}
                  />
                  <div>
                    <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      {module.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {module.tokens.toLocaleString()} tokens
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {module.usage}%
                  </p>
                  <Badge 
                    variant={module.usage > 80 ? 'success' : module.usage > 60 ? 'warning' : 'secondary'}
                    size="sm"
                  >
                    {module.usage > 80 ? 'Excellent' : module.usage > 60 ? 'Good' : 'Fair'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-600" />
              Usage Statistics
            </CardTitle>
            <CardDescription>
              Key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Peak Usage Hours</span>
                  <span className="font-medium">10:00 - 16:00</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Error Rate</span>
                  <span className="font-medium text-green-600">2.1%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '97.9%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Cache Hit Ratio</span>
                  <span className="font-medium text-blue-600">87.3%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87.3%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Insights */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary-600" />
              Recent Insights
            </CardTitle>
            <CardDescription>
              AI-powered analytics insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <ArrowUpRight className="w-4 h-4 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Peak Performance
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Research Assistant module shows 23% increase in usage efficiency
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-4 h-4 text-green-600 mt-1" />
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    Cost Optimization
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Token usage optimized, saving ~15% in operational costs
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-yellow-600 mt-1" />
                <div>
                  <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                    Response Time
                  </p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    Average response time improved by 300ms this week
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
