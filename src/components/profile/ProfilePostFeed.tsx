import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { db } from "@/lib/db"
import PostFeed from "../PostFeed"

interface ProfilePostFeedProps {
  id:string|null
}

async function ProfilePostFeed({id}:ProfilePostFeedProps){

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
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  })

  return <PostFeed initialPosts={posts} />
}

export default ProfilePostFeed