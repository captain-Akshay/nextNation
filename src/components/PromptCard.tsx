"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Prompt } from "@prisma/client";
import tick from "@/icons/tick.svg";
import copy from "@/icons/copy.svg";
import { useTheme } from "next-themes";
import { formatTimeToNow } from "@/lib/utils";
import ImageModal from "./ui/ImageModal";

const PromptCard = ({ post }: { post: Prompt }) => {
  const [copied, setCopied] = useState('');
  const { theme,setTheme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const Tags=post.tags.split("#")
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }else{
      setTheme("light")
    }},[]);


  const handleCopy = () => {
    setCopied(post.body);
    navigator.clipboard.writeText(post.body);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <div className={`prompt_card bg-${theme === "dark" ?"gray-800":"white" } rounded-lg p-4 border border-white my-3`}>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <div className={`max-h-40 mt-1 text-xs`}>
            <span>Posted by u/{post.authorId}</span>{' '}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={copied === post.body ? tick : copy}
            alt={copied === post.body ? "tick_icon" : "copy_icon"}
            width={20}
            height={20}
          />
        </div>
      </div>
      {post.image.length>0&&<Image alt="PROMPT RESULT" src={post.image} width={300} height={200} onClick={openModal} />}
      <p className={`my-4 font-satoshi text-sm text-${theme === "dark" ? "white":"black"}`}>{post.body}</p>
      {modalOpen && <ImageModal imageUrl={post.image} onClose={closeModal} />}
      {Tags.map((item,index)=>{
        return <span className={`inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`} key={index}>#{item}</span>
      })}
    </div>
  );
};

export default PromptCard;
