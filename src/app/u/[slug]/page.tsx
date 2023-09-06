import ProfileInfo from "@/components/profile/ProfileInfo"
import { db } from '@/lib/db'
import { getAuthSession } from "@/lib/auth"
import type { Session } from 'next-auth'
import FriendsList from "@/components/profile/FriendsList"
import JoinedReddit from "@/components/profile/JoinedReddit"
import { notFound } from "next/navigation"
import CustomFeed from "@/components/homepage/CustomFeed"
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
      Post:true,
      subscriptions:true,
      createdSubreddits:true,
    },
  })
  const Friends=await db.friends.findMany({
    where:{
      friend:session?.user.id
    }
  });
  if (!Person) return notFound();
  return (
<div className="py-14 flex flex-col lg:flex-row">
  <div className="w-full lg:w-1/4">
  <div className="ml-0 lg:ml-[-120px]"> 
<ProfileInfo Profile={Person} session={session} friends={Friends}/>
</div>
</div>
<div className="w-full lg:w-2/4 lg:mx-auto">
{/* @ts-ignore */}
<CustomFeed />
{/* <ProfilePostFeed id={Person?.id} /> */}
</div>
<div className="w-full lg:w-1/4 lg:ml-4 mt-8 lg:mt-0 flex flex-col space-y-8"> 
<JoinedReddit subscriptions={Person?.subscriptions} />
{/* @ts-ignore */}
<FriendsList data={Friends} isMyProfile={Person.id===session?.user.id} />
  </div>
</div>
  );
}

export default page;

