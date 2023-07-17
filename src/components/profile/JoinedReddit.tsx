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
  <Card className="w-[350px] h-64 overflow-y-auto">
    {/* @ts-expect-error react component */}
    {subscriptions?.map((item,index)=>(<RedditComp key={index} subredditId={item.subredditId} />))}
  </Card>)
}

export default JoinedReddit