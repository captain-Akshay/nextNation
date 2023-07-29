"use client"
import SubscribeLeaveToggle from "../SubscribeLeaveToggle";
import Link from "next/link";
import { format } from 'date-fns';
import { buttonVariants } from "./Button";
import ToFeedButton from "../ToFeedButton";
import { useTheme } from "next-themes";
export default function RProvider({subreddit,memberCount,slug,children,session,isSubscribed}: {
    subreddit:any,
    memberCount:number,
    slug:string,
    children:React.ReactNode,
    isSubscribed:boolean,
    session:any,
  }){
    const { theme,setTheme } = useTheme();
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }else{
      setTheme("light")
    }
    // Set colors based on the current theme
    const textColor = theme === 'dark' ? 'text-white' : 'text-black';
    const bgColor = theme === 'dark' ? 'bg-black' : 'bg-white';
    const borderColor = theme === 'dark' ? 'border-white' : 'border-black';

    return(<div className={`sm:container max-w-7xl mx-auto h-full pt-12 ${bgColor}`}>
    <div>
      <ToFeedButton />

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6 ${textColor}`}>
        <ul className='flex flex-col col-span-2 space-y-6'>{children}</ul>

        {/* info sidebar */}
        <div className={`overflow-hidden h-fit rounded-lg border ${borderColor} order-first md:order-last`}>
          <div className='px-6 py-4'>
            <p className={`font-semibold py-3 ${textColor}`}>About r/{subreddit.name}</p>
          </div>
          <dl className={`divide-y divide-gray-100 px-6 py-4 text-sm leading-6 ${bgColor} ${textColor}`}>
            <div className='flex justify-between gap-x-4 py-3'>
              <dt className='text-gray-500'>Created</dt>
              <dd className={`${textColor}`}>
                <time dateTime={subreddit.createdAt.toDateString()}>
                  {format(subreddit.createdAt, 'MMMM d, yyyy')}
                </time>
              </dd>
            </div>
            <div className='flex justify-between gap-x-4 py-3'>
              <dt className='text-gray-500'>Members</dt>
              <dd className='flex items-start gap-x-2'>
                <div className={`${textColor}`}>{memberCount}</div>
              </dd>
            </div>
            {subreddit.creatorId === session?.user?.id ? (
              <div className='flex justify-between gap-x-4 py-3'>
                <dt className='text-gray-500'>You created this community</dt>
              </div>
            ) : null}

            {subreddit.creatorId !== session?.user?.id ? (
              <SubscribeLeaveToggle
                isSubscribed={isSubscribed}
                subredditId={subreddit.id}
                subredditName={subreddit.name}
              />
            ) : null}
            <Link
              className={buttonVariants({
                variant: 'outline',
                className: 'w-full mb-6',
              })}
              href={`r/${slug}/submit`}>
              Create Post
            </Link>
          </dl>
        </div>
      </div>
    </div>
  </div>)
}