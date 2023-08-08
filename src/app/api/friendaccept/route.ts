import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { FriendAcceptValidator } from "@/lib/validators/comment";
import { z } from "zod";
export async function POST(req: Request) {
    try {
      const session = await getAuthSession();
      const body = await req.json();
      const { id: senderId } = FriendAcceptValidator.parse(body);
      if (!session?.user) {
        return new Response('Unauthorized', { status: 401 });
      }

      const friendRequest = await db.friendRequest.findFirst({
        where: {
          senderId,
          receiverId: session.user.id,
        },
      });
      if (!friendRequest) {
        return new Response('No friend request was made', { status: 404 });
      }
        await db.friends.create({
            data:{
                friend:senderId,
                friendOf:session.user.id
            }
        })
        await db.friends.create({
            data:{
                friend:session.user.id,
                friendOf:senderId
            }
        })
      await db.friendRequest.deleteMany({
        where: {
          OR: [
            { senderId, receiverId: session.user.id },
            { senderId: session.user.id, receiverId: senderId },
          ],
        },
      });

      return new Response('Friend request accepted', { status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(error.message, { status: 422 });
      }
  
      return new Response('Could not accept friend request', { status: 500 });
    }
  }
  