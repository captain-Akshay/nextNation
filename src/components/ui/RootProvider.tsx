"use client"
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Home as HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';

export default function RootProvider() {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-emerald-100';
  const textColor = theme === 'dark' ? 'text-white' : 'text-zinc-500';
  const hoverBgColor = theme === 'dark' ? 'bg-gray-700' : 'bg-emerald-500';
  const hoverTextColor = theme === 'dark' ? 'text-white' : 'text-white';
  return (
    <div className={`overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last `}>
      <div className={`px-6 py-4 ${bgColor}`}>
        <p className={`font-semibold py-3 flex items-center gap-1.5 ${textColor}`}>
          <HomeIcon className='h-4 w-4' />
          Home
        </p>
      </div>
      <dl className='-my-3  divide-gray-100 px-6 py-4 text-sm leading-6 '>
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