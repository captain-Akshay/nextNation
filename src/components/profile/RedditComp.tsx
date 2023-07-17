
interface RedditCompProps {
    subredditId:string
}
import { db } from '@/lib/db'
import RedditSub from './RedditSub';
// import Image from 'next/image';
async function RedditComp({subredditId}:RedditCompProps){
    const data=await db.subreddit.findFirst({
        where:{
            id:subredditId
        }
    });
  return(< RedditSub name={data?.name} id={data?.id}/>)
}

export default RedditComp;