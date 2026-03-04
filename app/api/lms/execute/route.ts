import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { LMSProviderFactory } from '@/lib/lms-strategy'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { moduleId, userInput } = body

    if (!moduleId || !userInput) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get the LMS module
    const lmsModule = await prisma.lMSModule.findUnique({
      where: { id: moduleId }
    })

    if (!lmsModule) {
      return NextResponse.json({ error: 'LMS module not found' }, { status: 404 })
    }

    // Create the full prompt
    const fullPrompt = lmsModule.promptTemplate.replace('{input}', userInput)

    // Get LMS provider (for demo, using OpenAI)
    const provider = LMSProviderFactory.createProvider('openai')

    // Execute the LMS request
    const response = await provider.generateResponse(fullPrompt, lmsModule.model)
    const tokensUsed = provider.getTokenUsage()

    // Log the usage
    await prisma.lMSLog.create({
      data: {
        userId: session.user.id,
        moduleId: lmsModule.id,
        tokensUsed,
        prompt: fullPrompt,
        response
      }
    })

    return NextResponse.json({
      response,
      tokensUsed,
      module: lmsModule.name
    })
  } catch (error) {
    console.error('LMS execution error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}