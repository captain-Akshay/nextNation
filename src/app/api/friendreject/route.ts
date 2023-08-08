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

      await db.friendRequest.deleteMany({
        where:{
          senderId
        }
      });
      return new Response('Friend request Rejected!', { status: 201 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(error.message, { status: 422 });
      }
    }
}
  