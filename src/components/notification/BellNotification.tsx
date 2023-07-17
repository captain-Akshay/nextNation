import { Bell,BellRing } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu"
 
import * as React from "react"
import { User } from "@prisma/client"
import FriendRequestList from "./FriendRequestList"
interface BellNotificationProps {
  data:User[] | null
}

function BellNotification({data}:BellNotificationProps){
    return (
      <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {data?<BellRing />:<Bell/>}
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-80">
          <DropdownMenuLabel>Friends Request</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <FriendRequestList data={data}>
            </FriendRequestList>
          </DropdownMenuContent>
      </DropdownMenu>
      </>
    )
}

export default BellNotification