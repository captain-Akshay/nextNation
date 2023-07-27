"use client";

import { useState } from "react";
import Image from "next/image";
import { Prompt } from "@prisma/client";
import tick from "@/public/assets/icons/tick.svg";
import copy from "@/public/assets/icons/copy.svg";
const PromptCard = ({ post }:{post:Prompt}) => {
  const [copied, setCopied] = useState('');
  const handleProfileClick = () => {

  };
  const handleCopy = () => {
    setCopied(post.body);
    navigator.clipboard.writeText(post.body);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.body
                ? tick
                : copy
            }
            alt={copied === post.body ? "tick_icon" : "copy_icon"}
            width={20}
            height={20}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.body}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
      >
        #{post.tags}
      </p>

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