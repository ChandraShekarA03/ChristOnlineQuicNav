import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get total statistics
    const [totalLinks, totalUsers, totalLLMLogs, totalTokens] = await Promise.all([
      prisma.link.count(),
      prisma.user.count(),
      prisma.lLMLog.count(),
      prisma.lLMLog.aggregate({
        _sum: { tokensUsed: true }
      })
    ])

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentLinks = await prisma.link.count({
      where: { createdAt: { gte: sevenDaysAgo } }
    })

    const recentLogs = await prisma.lLMLog.count({
      where: { createdAt: { gte: sevenDaysAgo } }
    })

    // Get most used LLM modules
    const moduleUsage = await prisma.lLMLog.groupBy({
      by: ['moduleId'],
      _count: { moduleId: true },
      _sum: { tokensUsed: true },
      orderBy: { _count: { moduleId: 'desc' } },
      take: 5
    })

    // Get module names
    const moduleIds = moduleUsage.map(m => m.moduleId)
    const modules = await prisma.lLMModule.findMany({
      where: { id: { in: moduleIds } },
      select: { id: true, name: true }
    })

    const moduleMap = modules.reduce((acc, mod) => {
      acc[mod.id] = mod.name
      return acc
    }, {} as Record<string, string>)

    const topModules = moduleUsage.map(m => ({
      name: moduleMap[m.moduleId] || 'Unknown',
      usage: m._count.moduleId,
      tokens: m._sum.tokensUsed || 0
    }))

    // Get daily token usage for the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const dailyUsage = await prisma.lLMLog.groupBy({
      by: ['createdAt'],
      _sum: { tokensUsed: true },
      where: { createdAt: { gte: thirtyDaysAgo } },
      orderBy: { createdAt: 'asc' }
    })

    const tokenUsageByDay = dailyUsage.map(day => ({
      date: day.createdAt.toISOString().split('T')[0],
      tokens: day._sum.tokensUsed || 0
    }))

    return NextResponse.json({
      overview: {
        totalLinks,
        totalUsers,
        totalLLMLogs,
        totalTokens: totalTokens._sum.tokensUsed || 0
      },
      recentActivity: {
        links: recentLinks,
        logs: recentLogs
      },
      topModules,
      tokenUsageByDay
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}