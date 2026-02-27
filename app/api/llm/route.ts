import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { LLMProviderFactory } from '@/lib/llm-strategy'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const modules = await prisma.lLMModule.findMany({
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

    const llmModule = await prisma.lLMModule.create({
      data: {
        name,
        description,
        promptTemplate,
        model
      }
    })

    return NextResponse.json(llmModule, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}