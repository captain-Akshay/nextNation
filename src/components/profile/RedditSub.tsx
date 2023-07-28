"use client"
import { RandomAvatar } from "react-random-avatars";
import { useTheme } from "next-themes";

interface RedditSubProps {
  name:string | undefined,
  id:string | undefined,
}

function RedditSub({name,id}:RedditSubProps){
  const { theme,setTheme } = useTheme();
  if (typeof window !== 'undefined') {
    setTheme(window.localStorage.getItem("theme")??"light");
  }else{
    setTheme("light")
  }

  const backgroundColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <>
      <div className={`max-w-sm w-full lg:max-w-full lg:flex ${backgroundColor}`}>
        <div className={`w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 ${backgroundColor} rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal`}>
          <div className="flex items-center">
            <RandomAvatar size={50} mode="random" name={name} />
            <div className={`text-sm pl-4 ${textColor}`}>
              <p className="leading-none">{name}</p>
              <p className="text-gray-600">u/{id}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RedditSub;