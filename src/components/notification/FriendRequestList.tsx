import { User } from "@prisma/client"
import FriendComp from "./friendComp";
interface FriendRequestListProps {
    data:User[]|null,
    children:React.ReactNode
}

function FriendRequestList({ data }: FriendRequestListProps) {
  if (!data) {
    return <div>No Request</div>; // Return null or a loading indicator if data is not available yet
  }

  return (
    <>
      {data.map((item) => (
        <FriendComp name={item.name} image={item.image} key={item.id} id={item.id} username={item.username} />
      ))}
    </>
  );
}
export default FriendRequestList