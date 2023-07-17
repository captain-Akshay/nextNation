import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { idValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

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