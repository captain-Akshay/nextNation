import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const { userId, prompt, tag } = await req.json();

    const session = await getAuthSession()
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }
    const newPrompt=await db.prompt.create({
        data:{
            body:prompt,
            authorId:userId,
            tags:tag
        }
    })
    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not post to subreddit at this time. Please try later',
      { status: 500 }
    )
  }
}