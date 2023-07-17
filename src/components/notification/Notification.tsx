import { getAuthSession } from "@/lib/auth";
import BellNotification from "./BellNotification";
import axios from "axios";

async function Notification({}){
  const session = await getAuthSession();
  const {data}= await axios.get('http://localhost:3000/api/friendsrequestgot');
  return (<>{session&& <BellNotification data={data}/>}</>)
}

export default Notification;