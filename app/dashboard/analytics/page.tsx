'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity, 
  Zap, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
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

const usageData = [
  { name: 'Mon', prompts: 120, tokens: 24000, users: 45 },
  { name: 'Tue', prompts: 132, tokens: 28000, users: 52 },
  { name: 'Wed', prompts: 101, tokens: 21000, users: 38 },
  { name: 'Thu', prompts: 134, tokens: 29000, users: 56 },
  { name: 'Fri', prompts: 90, tokens: 18000, users: 32 },
  { name: 'Sat', prompts: 230, tokens: 48000, users: 78 },
  { name: 'Sun', prompts: 210, tokens: 42000, users: 65 },
]

const moduleUsage = [
  { name: 'Content Generator', value: 35, color: '#6366f1' },
  { name: 'Quiz Builder', value: 25, color: '#8b5cf6' },
  { name: 'Feedback Analyzer', value: 20, color: '#f97316' },
  { name: 'Assignment Grader', value: 15, color: '#10b981' },
  { name: 'Other', value: 5, color: '#64748b' },
]

const departmentData = [
  { name: 'Computer Science', prompts: 450, tokens: 95000 },
  { name: 'Mathematics', prompts: 380, tokens: 78000 },
  { name: 'Physics', prompts: 320, tokens: 67000 },
  { name: 'Chemistry', prompts: 280, tokens: 58000 },
  { name: 'Biology', prompts: 250, tokens: 52000 },
  { name: 'English', prompts: 220, tokens: 45000 },
]

export default function AnalyticsPage() {
  const metrics = [
    {
      title: 'Total Prompts',
      value: '1,003',
      change: '+12.5%',
      changeType: 'positive',
      icon: Activity,
      color: 'from-violet-500 to-purple-500'
    },
    {
      title: 'Tokens Used',
      value: '385.2K',
      change: '+28.3%',
      changeType: 'positive',
      icon: Zap,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Active Users',
      value: '234',
      change: '+5.2%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Avg. Response Time',
      value: '1.2s',
      change: '-0.3s',
      changeType: 'positive',
      icon: Clock,
      color: 'from-green-500 to-emerald-500'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text font-heading">Analytics</h1>
          <p className="text-secondary font-body mt-1">
            Comprehensive insights and usage statistics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-violet-200 dark:border-violet-800 hover:bg-violet-100/50 dark:hover:bg-violet-900/20">
            <Calendar className="w-4 h-4 mr-2" />
            Last 7 days
          </Button>
          <Button className="bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-lg shadow-violet-500/30">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-violet-200/20 dark:border-violet-800/20 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary mb-1">{metric.title}</p>
                    <h3 className="text-2xl font-bold gradient-text">{metric.value}</h3>
                    <div className="flex items-center gap-1 mt-2">
                      {metric.changeType === 'positive' ? (
                        <ArrowUpRight className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-danger" />
                      )}
                      <span className={`text-xs font-medium ${metric.changeType === 'positive' ? 'text-success' : 'text-danger'}`}>
                        {metric.change}
                      </span>
                      <span className="text-xs text-secondary">vs last week</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} shadow-lg`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trend */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-violet-200/20 dark:border-violet-800/20 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-violet-600" />
                Usage Trend
              </CardTitle>
              <CardDescription className="mt-1">
                Daily prompts and token consumption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient id="colorPrompts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="#6366f1" />
                  <XAxis dataKey="name" className="text-xs" stroke="#94a3b8" />
                  <YAxis className="text-xs" stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid #e0e7ff',
                      borderRadius: '12px',
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="prompts"
                    stroke="#6366f1"
                    fillOpacity={1}
                    fill="url(#colorPrompts)"
                    name="Prompts"
                  />
                  <Area
                    type="monotone"
                    dataKey="tokens"
                    stroke="#f97316"
                    fillOpacity={1}
                    fill="url(#colorTokens)"
                    name="Tokens"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Module Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-violet-200/20 dark:border-violet-800/20 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-violet-600" />
                Module Distribution
              </CardTitle>
              <CardDescription className="mt-1">
                Usage by module type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={moduleUsage}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {moduleUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid #e0e7ff',
                      borderRadius: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Department Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-violet-200/20 dark:border-violet-800/20 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-violet-600" />
              Department Statistics
            </CardTitle>
            <CardDescription className="mt-1">
              Usage breakdown by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" stroke="#6366f1" />
                <XAxis dataKey="name" className="text-xs" stroke="#94a3b8" angle={-45} textAnchor="end" height={80} />
                <YAxis className="text-xs" stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid #e0e7ff',
                    borderRadius: '12px',
                  }}
                />
                <Legend />
                <Bar dataKey="prompts" fill="#6366f1" radius={[6, 6, 0, 0]} name="Prompts" />
                <Bar dataKey="tokens" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Tokens (K)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
