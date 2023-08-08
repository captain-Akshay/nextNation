import { db } from '@/lib/db'
import ProfileFriendSub from './ProfileFriendSub';
// import Image from 'next/image';
async function ProfileFriendComp({id}:{id:string}){
    const data=await db.user.findFirst({
        where:{
            id:id
        }
    });
  return(< ProfileFriendSub name={data?.name} image={data?.image} username={data?.username}/>)
}

export default ProfileFriendComp;