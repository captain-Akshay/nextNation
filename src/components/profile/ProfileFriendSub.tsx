"use client"
import { useTheme } from "next-themes";
import Image from "next/image";

interface ProfileFriendSubProps {
  name: string | null | undefined;
  image: string | null | undefined;
  username: string | null | undefined;
}

function ProfileFriendSub({ name, image, username }: ProfileFriendSubProps) {
  const { theme, setTheme } = useTheme();
  if (typeof window !== "undefined") {
    setTheme(window.localStorage.getItem("theme") ?? "light");
  } else {
    setTheme("light");
  }

  const backgroundColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <>
      <div className={`max-w-sm w-full lg:max-w-full lg:flex ${backgroundColor}`}>
        <div className={`w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 ${backgroundColor} rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal`}>
        <div className="flex items-center">
          <div
          className={`w-20 h-20 lg:w-20 lg:h-auto ${backgroundColor} flex-shrink-0`}
        >
          <Image
            src={
              image ??
              "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80"
            }
            alt="pic"
            width={160}
            height={160}
            className={`w-20 h-20 rounded-full`}
          />
        </div>
        <div
          className={`w-full ${backgroundColor} lg:rounded-b-lg p-4 flex flex-col justify-between leading-normal`}
        >
          <div className="flex items-center">
            <div className={`text-sm pl-4 ${textColor}`}>
              <p className="leading-none">{name}</p>
              <p className="text-gray-600">u/{username}</p>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default ProfileFriendSub;
