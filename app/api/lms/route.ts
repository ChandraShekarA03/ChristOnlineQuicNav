import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { LMSProviderFactory } from '@/lib/lms-strategy'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const modules = await prisma.lMSModule.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(modules)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { name, description, promptTemplate, model } = body

    if (!name || !promptTemplate || !model) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const lmsModule = await prisma.lMSModule.create({
      data: {
        name,
        description,
        promptTemplate,
        model
      }
    })

    return NextResponse.json(lmsModule, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}