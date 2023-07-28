"use client"
import { User,Post,Subscription,Subreddit } from "@prisma/client"
import type { Session } from 'next-auth'
interface ProfileInfoProps {
  Profile: (User & {
    Post: Post[];
    subscriptions: Subscription[];
    createdSubreddits: Subreddit[];
}) | null
session?:Session |null
}
// Type 'User & { Post: Post[]; subscriptions: Subscription[]; createdSubreddits: Subreddit[]; }' 

import * as React from "react"
import { Icons } from "../Icon";
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/Card"
import { useTheme } from "next-themes";
import Image from "next/image";
import noImg from "@/styles/nopic.jpg";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";

import { useCustomToasts } from '@/hooks/use-custom-toasts'
import { useRouter } from "next/navigation";

export function ProfileInfo({Profile,session}:ProfileInfoProps){
  const { theme,setTheme } = useTheme();
  if (typeof window !== 'undefined') {
    setTheme(window.localStorage.getItem("theme")??"light");
  }
  const router = useRouter();
  const { loginToast } = useCustomToasts()
  const [sendIcon,setSendIcon]=React.useState(Icons.friendRequestSend)
  const textColorClass = theme === 'dark' ? 'text-white' : 'text-black';
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const { mutate: sendFriendRequest} = useMutation({
    mutationFn: async () => {
      setSendIcon(Icons.friendRequestSent);
      const payload: {id:string|undefined,receiver:string|undefined} = {
        id:session?.user.id,
        receiver:Profile?.id
      }
      const { data } = await axios.post('/api/friendrequest', payload)
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'already Sent the Request.',
            description: 'May be you got ghosted.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid User',
            description: 'noob',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        title: 'There was an error.',
        description: 'Could not sent Request.',
        variant: 'destructive',
      })
      setSendIcon(Icons.friendRequestSend);
    },
    onSuccess: (data) => {
      toast({
        title: 'friend request sent',
        description: 'Now wait for it!',
        variant: "default",
      })
    },
  })

  return<>
    <div className={`mx-auto flex w-96 flex-col justify-center ${bgColor} rounded-2xl shadow-xl shadow-slate-300/60`}>
    <Image className="aspect-video w-70 rounded-t-2xl object-cover object-center" src={Profile?.image??noImg} alt="profile pic" width={1000} height={1000}/>
    <CardTitle className={` pt-4 pr-4 pl-4 ${textColorClass}`}>{Profile?.name}</CardTitle>
        <p className={`text-sm font-light pl-6 pb-4 ${textColorClass}`}>u/{Profile?.username}</p>
        <CardDescription className={`pl-4 ${textColorClass}`}>URverse user available to Connect!</CardDescription>
      <CardFooter className="flex justify-between">
       {session&&session.user?.username!==Profile?.username&&
      <Button
      className={`rounded-full p-2  ${theme === 'dark' ? 'fill-white hover:bg-slate-700' : 'fill-black hover:bg-gray-200'}`}
      onClick={()=>sendFriendRequest()}
    >
        {sendIcon}
</Button>}
      </CardFooter>
    </div>
  </>
}

export default ProfileInfo