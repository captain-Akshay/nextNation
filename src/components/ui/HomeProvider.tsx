"use client"
import { useTheme } from "next-themes";
export default function HomeProvider({children}: {
    children: React.ReactNode
  }){
    const { theme,setTheme } = useTheme();
    if(localStorage.getItem("theme")){
      setTheme(localStorage.getItem("theme")!)
    }
    const backgroundColor = theme === 'dark' ? 'bg-black' : 'bg-zinc-100';
  
    return(

        <div className={`min-h-screen ${backgroundColor}`}>
        {children}
        </div>
    )
}