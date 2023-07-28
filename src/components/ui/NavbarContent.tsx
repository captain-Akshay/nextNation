"use client"
import Link from 'next/link'
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FC } from 'react'
import { useState } from 'react';
import { buttonVariants } from '../ui/Button'
import { Icons } from '../Icon'
import Image from 'next/image';
import logo from "@/components/ui/logo.png"
//------------------------LOGO---------------------------
export function NavbarLogo() {
    const { theme,setTheme } = useTheme();
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }
    const logoTextColor = theme === 'dark' ? 'text-white' : 'text-zinc-900';
  
    return (
      <Link href="/" className={`flex gap-2 items-center ${logoTextColor}`}>
        <Image src={logo} alt='logo' width={50} height={50} />
        <p className="hidden text-sm font-medium md:block">URVerse</p>
      </Link>
    );
  }

//------------------------SIGN_BUTTON---------------------------
export function NavbarButton() {
    const { theme,setTheme } = useTheme();
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }
    const buttonClasses = `${buttonVariants()} ${
      theme === 'dark' ? 'border-white' : 'border-zinc-300'
    }`;
  
    return (
      <Link href="/sign-in" legacyBehavior>
        <a className={`${buttonClasses} border-2`}>
          Sign In
        </a>
      </Link>
    );
  }
//------------------------PROVIDER---------------------------
export function NavbarProvider({ children }: { children: React.ReactNode }) {
    const { theme,setTheme } = useTheme();
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }
    return (
      <div
        className={`fixed top-0 inset-x-0 h-fit ${
          theme === 'dark' ? 'bg-black' : 'bg-zinc-100'
        } border-b ${theme === 'dark' ? 'bg-black' : 'border-zinc-300'} z-[10] py-2`}
      >
        <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
          {children}
        </div>
      </div>
    );
}
//------------------------DARKMODE TOGGLE---------------------------
interface NightComponentProps {
  
}

export const NightComponent: FC<NightComponentProps> = ({}) => {
    const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (typeof window !== 'undefined') {
    setTheme(window.localStorage.getItem("theme")??"light");
  }
  return (<>
  <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-10 h-10 p-3 rounded focus:outline-none"
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              theme === "dark"
                ? localStorage.setItem("theme", "light")
                : localStorage.setItem("theme", "dark");
            }}
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="w-4 h-4 text-yellow-500 dark:text-yellow-500"
              >
                {theme === "dark" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            )}
          </button>
  </>)
}