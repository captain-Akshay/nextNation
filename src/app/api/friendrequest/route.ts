import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { idValidator } from "@/lib/validators/subreddit";
import { z } from "zod";
import { Subreddit } from "@prisma/client";
export async function GET(req: Request) {
    try {
        // Get the 'tags' query parameter from the request
        const url = new URL(req.url)
        const tagsQuery = url.searchParams.get('q')
        let subreddits: Subreddit[] = [];

    if (tagsQuery === 'popular') {
        subreddits = await db.subreddit.findMany({
            orderBy: {
              subscribers: {
                _count: 'desc' // Order by the number of subscribers in descending order
              }
            }
          });
    } else if (tagsQuery === 'newest') {
      subreddits = await db.subreddit.findMany({
        orderBy: { createdAt: 'desc' }, // Assuming you have a field 'createdAt'
      });
    } else if (tagsQuery === 'oldest') {
      subreddits = await db.subreddit.findMany({
        orderBy: { createdAt: 'asc' },
      });
    }
    return new Response(JSON.stringify(subreddits))
    } catch (error) {
      // Handle errors
      console.error('Error retrieving friend requests:', error);
      throw new Error('Failed to retrieve friend requests');
    }
}
export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { id, receiver } = idValidator.parse(body);
    if (id !== session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const senderId = id;
    const receiverId = receiver;

    // Create the friend request
    const friendRequest = await db.friendRequest.create({
      data: {
        senderId: senderId ,
        receiverId:receiverId ,
      },
    });

    return new Response('Friend request sent', { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Could not create friend request', { status: 500 });
  }
}