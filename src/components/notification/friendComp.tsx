"use client"
import Image from "next/image"
import { Avatar } from "../ui/Avatar"
import { DropdownMenuItem } from "../ui/DropDownMenu"
import { Check, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { Button } from "../ui/Button"
import { useState } from "react"
interface friendCompProps {
  id:string,
  username:string | null,
  name:string|null,
  image:string|null,
}

function DropdownMenuItemWithIcons({id, image, name,username }:friendCompProps) {
  const router=useRouter();
  const [isSubmitted,setSubmitted]=useState(false);
  const userLink=`/u/${username}`
  const { mutate: acceptRequest, isLoading } = useMutation({
    mutationFn: async () => {
      setSubmitted(true);
      const payload={
        id:id
      };
      const { data } = await axios.post(
        `/api/friendaccept`,
        payload
      );
      return data;
    },

    onError: () => {
      setSubmitted(false);
      return toast({
        title: 'Something went wrong.',
        description: "Friend Request Stuck",
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
    },
  });
  const { mutate: rejectRequest } = useMutation({
    mutationFn: async () => {
      setSubmitted(true);
      const payload={
        id:id
      };
      await axios.post(
        `/api/friendreject`,
        payload
      );
    },
    onError: () => {
      setSubmitted(false);
      return toast({
        title: 'Something went wrong.',
        description: "Friend Request Stuck",
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
    },
  });
  if (isSubmitted) {
    return null; 
  }
  return (
<DropdownMenuItem className={`${isSubmitted?" hidden":""}`}>
  <div onClick={() => router.push(userLink)}>
    <div className="flex items-center">
      <Avatar className="">
        {image && (
          <div className={`relative aspect-square h-full w-full`}>
            <Image
              fill
              src={image}
              alt='profile picture'
              referrerPolicy='no-referrer'
            />
          </div>
        )}
      </Avatar>
      <p className="pl-4">{name}</p>
    </div>
  </div>
  <div >
    <Button isLoading={isLoading} className="hover:bg-green-500 hover:rounded-full"  onClick={()=>(acceptRequest())}>
    <Check />
    </Button>
  </div>
  <Button isLoading={isLoading} className="hover:bg-red-600 hover:rounded-full"  onClick={()=>(rejectRequest())}>
    <XCircle />
  </Button>
</DropdownMenuItem>

  );
}

export default DropdownMenuItemWithIcons;