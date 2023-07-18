import BellNotification from "./BellNotification";
import axios from "axios";

const Notification= async ({})=>{
  const {data}= await axios.get('http://localhost:3000/api/friendsrequestgot');
  return (<BellNotification data={data}/>)
}
export default Notification;