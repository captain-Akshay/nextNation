
import { User } from "@prisma/client";
import FriendsProvider from "./FriendsProvider";

interface FriendComponentProps {
    data:User[] | null
}

export default function FriendComponent({data}:FriendComponentProps){
return <>
{data?.map((item)=>(<FriendsProvider key={item.id} name={item.name} image={item.image} username={item.username} />))}
</>
}