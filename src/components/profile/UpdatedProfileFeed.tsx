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
      const prompts=await db.prompt.findMany({
        where:{
            authorId:id??undefined
        }
      });
      return <div>
        <UpdatedPostPromptFeed posts={posts} prompts={prompts}/>
      </div>
}
