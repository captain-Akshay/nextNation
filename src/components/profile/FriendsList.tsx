import {
    Card,
  } from "@/components/ui/Card"
import { Friends } from "@prisma/client";
import ProfileFriendComp from "./ProfileFriendComp";

async function FriendsList({data,isMyProfile}:{data:Friends[],isMyProfile:boolean}){
  console.log(isMyProfile);
  return <>
    <Card className="w-[350px] h-80 overflow-y-auto">
    <div className="px-4 py-2 text-lg font-bold text-gray-500 text-center">
        Friends
      </div>
      {/*@ts-expect-error server component */}

      {data.map((item,index)=>(<ProfileFriendComp key={index} id={isMyProfile?item.friendOf:item.friend} />))}
    </Card>
  </>
}

export default FriendsList;