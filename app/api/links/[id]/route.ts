import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const link = await prisma.link.findUnique({
      where: { id: params.id }
    })

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 })
    }

    return NextResponse.json(link)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, url, description, category, department } = body

    const link = await prisma.link.findUnique({
      where: { id: params.id }
    })

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 })
    }

    // Check if user owns the link or is admin
    if (link.userId !== session.user.id && session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updatedLink = await prisma.link.update({
      where: { id: params.id },
      data: {
        title,
        url,
        description,
        category,
        department
      }
    })

    return NextResponse.json(updatedLink)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const link = await prisma.link.findUnique({
      where: { id: params.id }
    })

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 })
    }

    // Check if user owns the link or is admin
    if (link.userId !== session.user.id && session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.link.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Link deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}