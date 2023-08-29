"use client"
import { useTheme } from "next-themes";
import { useEffect } from "react";
export default function HomeProvider({children}: {
    children: React.ReactNode
  }){
    const { theme,setTheme } = useTheme();
    useEffect(()=>{
      if (typeof window !== 'undefined') {
        setTheme(window.localStorage.getItem("theme")??"light");
      }else{
        setTheme("light")
      }},[]);
    const backgroundColor = theme === "dark" ? 'bg-black' : 'bg-zinc-100';
    return(

        <div className={`min-h-screen ${backgroundColor}`}>
        {children}
        </div>
    )
}