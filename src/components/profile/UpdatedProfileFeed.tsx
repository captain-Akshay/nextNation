import { db } from "@/lib/db"
import UpdatedPostPromptFeed from "../UpdatedPostPromptFeed";
interface ProfilePostFeedProps {
    id:string|null
}  
export default async function UpdatedProfileFeed({id}:ProfilePostFeedProps){
    const posts = await db.post.findMany({
        where: {
            authorId:id??undefined
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          votes: true,
          author: true,
          comments: true,
          subreddit: true,
        },
      })
      return <div>
        <UpdatedPostPromptFeed posts={posts}/>
      </div>
}
