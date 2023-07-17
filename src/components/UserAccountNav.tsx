"use client"
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropDownMenu';
import { UserAvatar } from '@/components/UserAvatar';

interface UserAccountNavProps{
  user: User;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const { theme } = useTheme();
  // console.log(user);

  // Theme-specific class names
  const bgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className='h-8 w-8'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`bg-white ${bgClass}`} align='end'>
        <div className={`flex items-center justify-start gap-2 p-2 ${textClass}`}>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.name && <p className={`font-medium ${textClass}`}>{user.name}</p>}
            {user.email && (
              <p className={`w-[200px] truncate text-sm text-muted-foreground ${textClass}`}>
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/u/${user.id}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/'>Feed</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/r/create'>Create Community</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href='/settings'>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={`cursor-pointer ${textClass}`}
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
