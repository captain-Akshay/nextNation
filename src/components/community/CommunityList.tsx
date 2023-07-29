import { Subreddit } from '@prisma/client'
import CommunityCard from './CommunityCard'

interface CommunityListProps {
  data:Subreddit[]
}

function CommunityList({data}:CommunityListProps){
  return <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
    {data.map((item)=><CommunityCard itemname={item.name} created={item.createdAt} creator={item.creatorId} key={item.id} id={item.id}/>)}
    </div>
}

export default CommunityList