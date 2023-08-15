"use client"
import React from 'react'
import { ExtendedPost } from '@/types/db';
import Post from './Post';
import { useSession } from 'next-auth/react';
interface Props{
    posts:ExtendedPost[],
}
function UpdatedPostPromptFeed({posts}:Props) {
    const { data: session } = useSession();
  return (
    <div>
    <ul className='flex flex-col col-span-2 space-y-6'>
      {posts.map((post) => {
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
        </ul>   
    </div>
  )
}

export default UpdatedPostPromptFeed;