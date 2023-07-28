'use client'

import { formatTimeToNow } from '@/lib/utils';
import { Post, User, Vote } from '@prisma/client';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { FC, useRef } from 'react';
import EditorOutput from './EditorOutput';
import PostVoteClient from './post-vote/PostVoteClient';
import { useTheme } from 'next-themes';

type PartialVote = Pick<Vote, 'type'>;

interface PostProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  votesAmt: number;
  subredditName: string;
  currentVote?: PartialVote;
  commentAmt: number;
}

const Post: FC<PostProps> = ({
  post,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  subredditName,
  commentAmt,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const { theme,setTheme } = useTheme();
  if (typeof window !== 'undefined') {
    setTheme(window.localStorage.getItem("theme")??"light");
  }

  // Set colors based on the current theme
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const linkColor = theme === 'dark' ? 'text-gray-300' : 'text-zinc-600';

  return (
    <div className={`rounded-md ${bgColor} shadow`}>
      <div className='px-6 py-4 flex justify-between'>
        <PostVoteClient
          postId={post.id}
          initialVotesAmt={_votesAmt}
          initialVote={_currentVote?.type}
        />

        <div className='w-0 flex-1'>
          <div className={`max-h-40 mt-1 text-xs ${textColor}`}>
            {subredditName ? (
              <>
                <Link
                  className={`underline ${linkColor} text-sm underline-offset-2`}
                  href={`/r/${subredditName}`}
                >
                  r/{subredditName}
                </Link>
                <span className='px-1'>•</span>
              </>
            ) : null}
    
            <span>Posted by
                  <Link
                className={`underline ${linkColor} text-sm underline-offset-2`}
                href={`/u/${post.author.username}`}> u/{post.author.username} </Link></span>{' '}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
          <a href={`/r/${subredditName}/post/${post.id}`}>
            <h1 className={`text-lg font-semibold py-2 leading-6 ${textColor}`}>
              {post.title}
            </h1>
          </a>

          <div
            className='relative text-sm max-h-40 w-full overflow-clip'
            ref={pRef}
          >
            {/* <EditorOutput content={post.content} /> */}
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent'></div>
            ) : null}
          </div>
        </div>
      </div>

      <div className={`${bgColor} z-20 text-sm px-4 py-4 sm:px-6`}>
        <Link
          href={`/r/${subredditName}/post/${post.id}`}
          className='w-fit flex items-center gap-2'
        >
          <MessageSquare className={`h-4 w-4 ${textColor}`} /> {commentAmt} comments
        </Link>
      </div>
    </div>
  );
};

export default Post;