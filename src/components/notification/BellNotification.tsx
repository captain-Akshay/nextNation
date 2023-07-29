"use client"
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
      <div className=" mt-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {data?.length===0?<Bell />:<BellRing />}
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-80">
          <DropdownMenuLabel>Friends Request</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <FriendRequestList data={data}>
            </FriendRequestList>
          </DropdownMenuContent>
      </DropdownMenu>
      </div>
    )
}

export default BellNotification