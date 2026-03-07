'use client'

import { useState, useEffect } from 'react'
import {
  getAllLinks,
  getAllUsers,
  getAllLMSLogs,
  getTotalTokens,
  LinkData,
  UserData,
  LMSLogData
} from '@/lib/firestore'
import { useAuth } from '@/lib/auth-context'

interface DashboardOverview {
  totalLinks: number
  totalUsers: number
  totalLMSLogs: number
  totalTokens: number
}

interface DashboardActivity {
  links: number
  logs: number
}

interface DashboardData {
  overview: DashboardOverview
  recentActivity: DashboardActivity
  recentLinks: LinkData[]
  recentLogs: LMSLogData[]
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all data in parallel
      const [links, users, logs, totalTokens] = await Promise.all([
        getAllLinks(),
        getAllUsers(),
        getAllLMSLogs(),
        getTotalTokens()
      ])

      // Calculate recent activity (last 7 days)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const recentLinks = links.filter(link => 
        new Date(link.createdAt || '') > sevenDaysAgo
      )

      const recentLogs = logs.filter(log =>
        new Date(log.createdAt || '') > sevenDaysAgo
      )

      setData({
        overview: {
          totalLinks: links.length,
          totalUsers: users.length,
          totalLMSLogs: logs.length,
          totalTokens: totalTokens
        },
        recentActivity: {
          links: recentLinks.length,
          logs: recentLogs.length
        },
        recentLinks: links.slice(0, 5),
        recentLogs: logs.slice(0, 5)
      })
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err)
      setError(err.message || 'Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  return {
    data,
    loading,
    error,
    refresh: fetchDashboardData
  }
}
