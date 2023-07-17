import {
    Card,
  } from "@/components/ui/Card"
// import FriendComponent from "./FriendComponent";
// import axios from "axios";
// import { getAuthSession } from "@/lib/auth";

async function FriendsList(){
  // const session=await getAuthSession();
  // const {data}= await axios.get(`http://localhost:3000/api/friendlist?id=${session?.user.id}`);
  return <>
    <Card className="w-[350px] h-64 overflow-y-auto">
      {/* <FriendComponent data={data}/> */}
      comming Soon!!
    </Card>
  </>
}

export default FriendsList;