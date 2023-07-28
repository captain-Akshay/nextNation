"use client"
import { formatTimeToNow } from '@/lib/utils'

import { useTheme } from 'next-themes';
interface PostProviderProps {
  children:React.ReactNode
}
interface PostProviderSubProps {
    post?:any
    cachedPost?:any
    children:React.ReactNode
  }

  export const PostProvider= ({ children }:PostProviderProps) => {
    const { theme,setTheme } = useTheme();
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }else{
      setTheme("light")
    }
  
    // Set colors based on the current theme
    const containerBgColor = theme === 'dark' ? 'bg-zinc-900' : 'bg-white';
    const containerTextColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  
    return (
      <div className={`h-full flex flex-col sm:flex-row items-center sm:items-start justify-between ${containerBgColor} ${containerTextColor}`}>
        {children}
      </div>
    );
  };
export const PostProviderSub = ({children,post,cachedPost}:PostProviderSubProps) => {
  const { theme,setTheme } = useTheme();
  if (typeof window !== 'undefined') {
    setTheme(window.localStorage.getItem("theme")??"light");
  }

    // Set colors based on the current theme
    const containerBgColor = theme === 'dark' ? 'bg-zinc-900' : 'bg-white';
    const containerTextColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  
    return (
      <div className={`sm:w-0 w-full flex-1 ${containerBgColor} p-4 rounded-sm`}>
        <p className='max-h-40 mt-1 truncate text-xs text-gray-500'>
          Posted by u/{post?.author.username ?? cachedPost.authorUsername}{' '}
          {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
        </p>
        <h1 className={`text-xl font-semibold py-2 leading-6 ${containerTextColor}`}>
          {post?.title ?? cachedPost.title}
        </h1>
        {children}
      </div>
    );
  };
  import { buttonVariants } from '@/components/ui/Button';
  import { ArrowBigUp, ArrowBigDown, Loader2 } from 'lucide-react';
  
  export function PostVoteShell(){
    const { theme,setTheme } = useTheme();
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }

    // Set colors based on the current theme
    const containerTextColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

    const containerBgColor = theme === 'dark' ? 'bg-zinc-900' : 'bg-white';
    return (
      <div className={`flex items-center flex-col pr-6 w-20 ${containerBgColor}`}>
        {/* upvote */}
        <div className={buttonVariants({ variant: 'ghost' })}>
          <ArrowBigUp className={`h-5 w-5 ${containerTextColor}`} />
        </div>
  
        {/* score */}
        <div className={`text-center py-2 font-medium text-sm ${containerTextColor}`}>
          <Loader2 className='h-3 w-3 animate-spin' />
        </div>
  
        {/* downvote */}
        <div className={buttonVariants({ variant: 'ghost' })}>
          <ArrowBigDown className={`h-5 w-5 ${containerTextColor}`} />
        </div>
      </div>
    );
  };