import { db } from "@/lib/db";
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