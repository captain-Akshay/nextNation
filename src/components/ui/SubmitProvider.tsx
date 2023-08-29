"use client"
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

interface PageProps {
      slug: string;
  }

const SubmitProvider = ({slug}:PageProps) => {
    const { theme,setTheme } = useTheme();
    useEffect(()=>{
      if (typeof window !== 'undefined') {
        setTheme(window.localStorage.getItem("theme")??"light");
      }else{
        setTheme("light")
      }},[]);
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

  return(      <div className={`border-b ${borderColor} pb-5`}>
  <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
    <h3 className={`ml-2 mt-2 text-base font-semibold leading-6 ${textColor}`}>
      Create Post
    </h3>
    <p className={`ml-2 mt-1 truncate text-sm ${textColor}`}>
      in r/{slug}
    </p>
  </div>
</div>)
}

export default SubmitProvider;
