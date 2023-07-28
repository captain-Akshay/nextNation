"use client"
import { useTheme } from 'next-themes';
import { Avatar } from '../ui/Avatar';
import Image from 'next/image';

interface FriendsProviderProps {
    name:string|null,
    image:string|null,
    username:string|null
}

function FriendsProvider({image,name,username}:FriendsProviderProps){
  const { theme,setTheme } = useTheme();
  if (typeof window !== 'undefined') {
    setTheme(window.localStorage.getItem("theme")??"light");
  }

  const backgroundColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <>
      <div className={`max-w-sm w-full lg:max-w-full lg:flex ${backgroundColor}`}>
        <div className={`w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 ${backgroundColor} rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal`}>
          <div className="flex items-center">
            <Avatar>
              <Image src={image??"null"} alt="profile" width={100} height={100} />
            </Avatar>
            <div className={`text-sm pl-4 ${textColor}`}>
              <p className="leading-none">{name}</p>
              <p className="text-gray-600">u/{username}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FriendsProvider