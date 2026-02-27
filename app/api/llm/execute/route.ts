import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { LLMProviderFactory } from '@/lib/llm-strategy'

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

    // Get the LLM module
    const llmModule = await prisma.lLMModule.findUnique({
      where: { id: moduleId }
    })

    if (!llmModule) {
      return NextResponse.json({ error: 'LLM module not found' }, { status: 404 })
    }

    // Create the full prompt
    const fullPrompt = llmModule.promptTemplate.replace('{input}', userInput)

    // Get LLM provider (for demo, using OpenAI)
    const provider = LLMProviderFactory.createProvider('openai')

    // Execute the LLM request
    const response = await provider.generateResponse(fullPrompt, llmModule.model)
    const tokensUsed = provider.getTokenUsage()

    // Log the usage
    await prisma.lLMLog.create({
      data: {
        userId: session.user.id,
        moduleId: llmModule.id,
        tokensUsed,
        prompt: fullPrompt,
        response
      }
    })

    return NextResponse.json({
      response,
      tokensUsed,
      module: llmModule.name
    })
  } catch (error) {
    console.error('LLM execution error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}