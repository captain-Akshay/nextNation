import ProfileInfo from "@/components/profile/ProfileInfo"
import { db } from '@/lib/db'
import { getAuthSession } from "@/lib/auth"
import type { Session } from 'next-auth'
import FriendsList from "@/components/profile/FriendsList"
import JoinedReddit from "@/components/profile/JoinedReddit"
import ProfilePostFeed from "@/components/profile/ProfilePostFeed"
import { notFound } from "next/navigation"
interface ProfileProps {
    params:{
        slug:string
    }
}

async function page({params}:ProfileProps){
  const session:Session |null = await getAuthSession();
  const Person=await db.user.findFirst({
    where: {
      username: params.slug,
    },
    include: {
      posts:true,
      subscriptions:true,
      createdSubreddits:true,
    },
  })
  if (!Person) return notFound();
  return (
<div className="py-14 flex flex-col lg:flex-row">
  <div className="w-full lg:w-1/4">
  <div className="ml-0 lg:ml-[-120px]"> 
<ProfileInfo Profile={Person} session={session} />
</div>
</div>
<div className="w-full lg:w-2/4 lg:mx-auto">
{/* @ts-ignore */}
<ProfilePostFeed id={Person?.id} />
</div>
<div className="w-full lg:w-1/4 lg:ml-4 mt-8 lg:mt-0 flex flex-col space-y-8"> 
<JoinedReddit subscriptions={Person?.subscriptions} />
{/* @ts-ignore */}
<FriendsList />
  </div>
</div>
  );
}

export default page;

