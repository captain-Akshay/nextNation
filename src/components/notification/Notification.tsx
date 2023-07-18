import { User } from "@prisma/client";
import BellNotification from "./BellNotification";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

const Notification= async ({})=>{
  const session = await getAuthSession();
    const sessionUserId=session?.user.id
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
        }}
  return (<BellNotification data={users}/>)
}
export default Notification;