"use client"
import { formatTimeToNow } from '@/lib/utils'
import Image from 'next/image'
import { FC, useEffect } from 'react'
import {useTheme} from "next-themes";
import Link from 'next/link';
interface CommunityCardProps {
  itemname:string,
  created:Date,
  creator:string |null,
  id:string
}

const CommunityCard: FC<CommunityCardProps> = ({itemname,created,creator,id}) => {
    let randomNumber=Math.round(Math.random()*16)
    const {theme,setTheme}=useTheme();
    useEffect(()=>{
      if (typeof window !== 'undefined') {
        setTheme(window.localStorage.getItem("theme")??"light");
      }else{
        setTheme("light")
      }},[]);
    return (
        <Link href={`/c/${itemname}`}>
        <div
        className={`max-w-sm rounded overflow-hidden shadow-lg transform hover:scale-110 transition-transform duration-300 ease-in-out`}>
          <Image
            className="w-full h-40"
            src={`/assets/images/${randomNumber}-${theme === 'dark' ? 'dark' : 'light'}.svg`}
            alt=""
            width={100}
            height={100}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{itemname}</div>
            <p className="text-gray-700 text-base">Created By {creator}</p>
          </div>
          <span
            className={`inline-block bg-${theme === 'dark' ? 'gray-900' : 'gray-200'} rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}
          >
            Created {formatTimeToNow(new Date(created))}
          </span>
        </div>
        </Link>
      );
    };
    
    export default CommunityCard;