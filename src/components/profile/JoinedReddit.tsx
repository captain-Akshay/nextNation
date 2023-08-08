import {
    Card,
  } from "@/components/ui/Card"
import { Subscription } from "@prisma/client"
import RedditComp from "./RedditComp"
interface JoinedRedditProps {
    subscriptions:Subscription[] | undefined
}

function JoinedReddit({subscriptions}:JoinedRedditProps){
  return(    
  <Card className="w-[350px] h-80 overflow-y-auto">
      <div className="px-4 py-2 text-lg font-bold text-gray-500 text-center">
        Community Joined
      </div>
    {/* @ts-expect-error react component */}
    {subscriptions?.map((item,index)=>(<RedditComp key={index} subredditId={item.subredditId} />))}
  </Card>)
}

export default JoinedReddit