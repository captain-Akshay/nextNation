"use client";
import { useTheme } from 'next-themes';
import { Home as HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';

// Define the types for card props
type CardProps = {
  bgColor: string;
  textColor: string;
  hoverBgColor: string;
  hoverTextColor: string;
};

// Card component for the Home section
function HomeCard({ bgColor, textColor, hoverBgColor, hoverTextColor }: CardProps) {
  return (
    <div className={`overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last`}>
      <div className={`px-6 py-4 ${bgColor}`}>
        <p className={`font-semibold py-3 flex items-center gap-1.5 ${textColor}`}>
          <HomeIcon className='h-4 w-4' />
          Home
        </p>
      </div>
      <dl className='-my-3  divide-gray-100 px-6 py-4 text-sm leading-6'>
        <div className='flex justify-between gap-x-4 py-3'>
          <p className={textColor}>
            Your personal Breadit frontpage. Come here to check in with your favorite communities.
          </p>
        </div>
        <Link href={`/r/create`} legacyBehavior>
          <a
            className={`
              ${buttonVariants({
                className: 'w-full mt-4 mb-6',
              })}
              ${textColor}
              border
              bg-transparent
              rounded-md
              py-2 px-4
              transition-colors
              hover:${hoverBgColor}
              hover:${hoverTextColor}
              focus:outline-none
              focus:${hoverBgColor}
              focus:${hoverTextColor}
              `}
          >
            Create Community
          </a>
        </Link>
      </dl>
    </div>
  );
}

// Card component for the Prompt section
function PromptCard({ bgColor, textColor, hoverBgColor, hoverTextColor }: CardProps) {
  return (
    <div className={`overflow-hidden h-fit rounded-lg border border-gray-200`}>
      <div className={`px-6 py-4 ${bgColor}`}>
        <p className={`font-semibold py-3 flex items-center gap-1.5 ${textColor}`}>
          <HomeIcon className='h-4 w-4' />
          Prompt
        </p>
      </div>
      <dl className='-my-3 divide-gray-100 px-6 py-4 text-sm leading-6'>
        <div className='flex justify-between gap-x-4 py-3'>
          <p className={textColor}>
            Your own personal professional prompts to share it with the world and beyond! 
          </p>
        </div> 
        <Link href={`/p/create`} legacyBehavior>
          <a
            className={`
              ${buttonVariants({
                className: 'w-full mt-4 mb-6',
              })}
              ${textColor}
              border
              bg-transparent
              rounded-md
              py-2 px-4
              transition-colors
              hover:${hoverBgColor}
              hover:${hoverTextColor}
              focus:outline-none
              focus:${hoverBgColor}
              focus:${hoverTextColor}
              `}
          >
            Create Prompt
          </a>
        </Link>
      </dl>
    </div>
  );
}

export default function RootProvider() {
  const { theme,setTheme } = useTheme();
  if (typeof window !== 'undefined') {
    setTheme(window.localStorage.getItem("theme")??"light");
  }else{
    setTheme("light")
  }
  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-blue-100';
  const textColor = theme === 'dark' ? 'text-white' : 'text-zinc-500';
  const hoverBgColor = theme === 'dark' ? 'bg-gray-700' : 'bg-blue-500';
  const hoverTextColor = theme === 'dark' ? 'text-white' : 'text-white';

  return (
    <div className="space-y-4 md:space-y-8">
      <HomeCard
        bgColor={bgColor}
        textColor={textColor}
        hoverBgColor={hoverBgColor}
        hoverTextColor={hoverTextColor}
      />
      <PromptCard
        bgColor={bgColor}
        textColor={textColor}
        hoverBgColor={hoverBgColor}
        hoverTextColor={hoverTextColor}
      />
    </div>
  );
}
