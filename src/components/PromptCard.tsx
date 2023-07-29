"use client";
import { useState } from "react";
import Image from "next/image";
import { Prompt } from "@prisma/client";
import tick from "@/icons/tick.svg";
import copy from "@/icons/copy.svg";
import { useTheme } from "next-themes";
import { formatTimeToNow } from "@/lib/utils";

const PromptCard = ({ post }: { post: Prompt }) => {
  const [copied, setCopied] = useState('');
  const { theme,setTheme } = useTheme();
  const Tags=post.tags.split("#")
  if (typeof window !== 'undefined') {
    setTheme(window.localStorage.getItem("theme")??"light");
  }else{
    setTheme("light")
  }
  const handleProfileClick = () => {
    // Implement your logic for handling profile clicks
  };

  const handleCopy = () => {
    setCopied(post.body);
    navigator.clipboard.writeText(post.body);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <div className={`prompt_card bg-${theme === "light" ? "white" : "gray-800"} rounded-lg p-4 border border-white my-3`}>
      <div className='flex justify-between items-start gap-5'>
        {/* Profile section (not implemented) */}
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          {/* Profile content */}
          <div className={`max-h-40 mt-1 text-xs`}>
            <span>Posted by u/{post.authorId}</span>{' '}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
        </div>
        {/* Copy button section */}
        <div className='copy_btn' onClick={handleCopy}>
          {/* Show 'tick' icon if prompt has been copied, otherwise show 'copy' icon */}
          <Image
            src={copied === post.body ? tick : copy}
            alt={copied === post.body ? "tick_icon" : "copy_icon"}
            width={20}
            height={20}
          />
        </div>
      </div>

      {/* Display the prompt body text */}
      <p className={`my-4 font-satoshi text-sm text-${theme === "light" ? "black" : "white"}`}>{post.body}</p>

      {/* Display the prompt tags */}
      {Tags.map((item,index)=>{
        return <span className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`} key={index}>#{item}</span>
      })}

      {/* {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
          >
            Delete
          </p>
        </div>
      )} */}
    </div>
  );
};

export default PromptCard;
