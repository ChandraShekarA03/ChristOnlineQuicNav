'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { BarChart3, TrendingUp, Users, Link, Brain, Activity } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

interface AnalyticsData {
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

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics')
      if (response.ok) {
        const analyticsData = await response.json()
        setData(analyticsData)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading analytics...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Failed to load analytics</div>
      </div>
    )
  }

  const COLORS = ['#1F3C88', '#C9A227', '#3B82F6', '#10B981', '#F59E0B']

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-white/70">Comprehensive insights into system usage and performance</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Links</p>
              <p className="text-2xl font-bold text-white">{data.overview.totalLinks}</p>
            </div>
            <Link className="w-8 h-8 text-christ-blue" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-white">{data.overview.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-christ-gold" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">LLM Requests</p>
              <p className="text-2xl font-bold text-white">{data.overview.totalLLMLogs}</p>
            </div>
            <Brain className="w-8 h-8 text-christ-blue" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Tokens</p>
              <p className="text-2xl font-bold text-white">{data.overview.totalTokens.toLocaleString()}</p>
            </div>
            <Activity className="w-8 h-8 text-christ-gold" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Usage Over Time */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Token Usage (Last 30 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.tokenUsageByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(201, 162, 39, 0.3)',
                    borderRadius: '8px'
                  }}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Line
                  type="monotone"
                  dataKey="tokens"
                  stroke="#C9A227"
                  strokeWidth={2}
                  dot={{ fill: '#C9A227' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Modules */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Most Used LLM Modules</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topModules}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="name"
                  stroke="#9CA3AF"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(201, 162, 39, 0.3)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="usage" fill="#1F3C88" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activity (Last 7 Days)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-christ-blue mb-2">{data.recentActivity.links}</div>
            <div className="text-white/70">New Links Added</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-christ-gold mb-2">{data.recentActivity.logs}</div>
            <div className="text-white/70">LLM Requests Made</div>
          </div>
        </div>
      </Card>
    </div>
  )
}