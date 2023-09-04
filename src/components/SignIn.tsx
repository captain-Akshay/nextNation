"use client"
import { Icons } from '@/components/Icon'
import UserAuthForm from '@/components/UserAuthForm'
import Link from 'next/link'

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const SignIn = () => {
  const { theme,setTheme } = useTheme();
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }else{
      setTheme("light")
    }},[]);

  const containerClass = theme === 'dark' ? 'text-white' : 'text-black';
  const linkClass = theme === 'dark' ? 'text-brand' : 'text-[#0070f3]';

  return (
    <div className={`flex flex-col-reverse md:flex-row w-full space-y-6 ${containerClass}`}>
      <div className="md:w-1/2 flex flex-col justify-center">
        <div className="px-8 flex flex-col justify-center text-center md:text-right">
          <UserAuthForm />
          <p className={`text-sm text-muted-foreground text-center ${containerClass}`}>
            New to URVerse?{' '}
            <Link href="/sign-up" className={`hover:${linkClass} text-sm underline underline-offset-4`}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col justify-center text-center">
        <div className="flex flex-col items-center justify-center md:justify-start">
          <div className='h-10 w-10'>
          <Icons.logo/>
          </div>
          <h1 className={`text-2xl font-semibold tracking-tight ml-2 ${containerClass}`}>Welcome back</h1>
          <div className="mt-2 text-center">
            <p className={`text-sm max-w-xs ${containerClass}`}>
              By continuing, you are setting up a URVerse account and agree to our User Agreement and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn