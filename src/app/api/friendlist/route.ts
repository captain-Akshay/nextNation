import { db } from "@/lib/db";
import { User } from "@prisma/client";

export async function GET(req: Request) {
  const url = new URL(req.url)
  const sessionUserId = url.searchParams.get('id')
    try {
      // Get all friend requests received by the session user
      const friendsListId = await db.friends.findMany({
        where: {
          friend: sessionUserId??"",
        },
      });
  
      // Create an array to store the User objects
      const users: User[] = [];
  
      // Iterate over the friend requests and fetch the sender details
      for (const request of friendsListId) {
      console.log(sessionUserId);
        const sender = await db.user.findUnique({
          where: {
            id: request.friendOf,
          },
        });
  
        if (sender) {
          users.push(sender);
        }
      }
      return new Response(JSON.stringify(users))
    } catch (error) {
      // Handle errors
      console.error('Error retrieving friend requests:', error);
      throw new Error('Failed to retrieve friend requests');
    }
  }