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

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const department = searchParams.get('department')
    const search = searchParams.get('search')

    const where: any = {}

    if (category) where.category = category
    if (department) where.department = department
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const links = await prisma.link.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(links)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, url, description, category, department } = body

    if (!title || !url || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const link = await prisma.link.create({
      data: {
        title,
        url,
        description,
        category,
        department,
        userId: session.user.id
      }
    })

    return NextResponse.json(link, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}