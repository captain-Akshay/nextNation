"use client"
import React, { useState } from 'react'
import SwitchButton from './ui/SwitchButton'
import { ExtendedPost } from '@/types/db';
import { Prompt } from '@prisma/client';
import Post from './Post';
import { useSession } from 'next-auth/react';
import PromptCard from './PromptCard';
interface Props{
    posts:ExtendedPost[],
    prompts:Prompt[]
}
function UpdatedPostPromptFeed({posts,prompts}:Props) {
    const { data: session } = useSession();
    const [isOn, setIsOn] = useState(false);
    const [type, setType] = useState("prompt");
  return (
    <div>
    <SwitchButton isOn={isOn} setIsOn={setIsOn} type={type} setType={setType}/>
    {isOn?<ul className='flex flex-col col-span-2 space-y-6'>
      {posts.map((post, index) => {
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === 'UP') return acc + 1
          if (vote.type === 'DOWN') return acc - 1
          return acc
        }, 0)

        const currentVote = post.votes.find(
          (vote) => vote.userId === session?.user.id
        )
          return (
            <li key={post.id}>
            <Post
              post={post}
              commentAmt={post.comments.length}
              subredditName={post.subreddit.name}
              votesAmt={votesAmt}
              currentVote={currentVote}
            />
            </li>)})}
        </ul>:<>{prompts.map((item,index)=>(< PromptCard post={item} key={index}/>))}</>}        
    </div>
  )
}

export default UpdatedPostPromptFeed;