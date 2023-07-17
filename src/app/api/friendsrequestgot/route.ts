import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

export async function GET(req: Request) {
    const session = await getAuthSession();
    const sessionUserId=session?.user.id
    try {
      // Get all friend requests received by the session user
      const friendRequests = await db.friendRequest.findMany({
        where: {
          receiverId: sessionUserId,
        },
      });
  
      // Create an array to store the User objects
      const users: User[] = [];
  
      // Iterate over the friend requests and fetch the sender details
      for (const request of friendRequests) {
        const sender = await db.user.findUnique({
          where: {
            id: request.senderId,
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