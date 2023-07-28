// import { User } from '@prisma/client'
// import { AvatarProps } from '@radix-ui/react-avatar'

// import { Icons } from '@/components/Icon'
// import { Avatar, AvatarFallback } from '@/components/ui/Avatar'
// import Image from 'next/image'

// interface UserAvatarProps extends AvatarProps {
//   user: Pick<User, 'image' | 'name'>
// }

// export function UserAvatar({ user, ...props }: UserAvatarProps) {
//   return (
//     <Avatar {...props}>
//       {user.image ? (
//         <div className='relative aspect-square h-full w-full'>
//           <Image
//             fill
//             src={user.image}
//             alt='profile picture'
//             referrerPolicy='no-referrer'
//           />
//         </div>
//       ) : (
//         <AvatarFallback>
//           <span className='sr-only'>{user?.name}</span>
//           <Icons.user className='h-4 w-4' />
//         </AvatarFallback>
//       )}
//     </Avatar>
//   )
// }
import { User } from '@prisma/client';
import { AvatarProps } from '@radix-ui/react-avatar';
import { useTheme } from 'next-themes';

import { Icons } from '@/components/Icon';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import Image from 'next/image';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  const { theme,setTheme } = useTheme();
  if (typeof window !== 'undefined') {
    setTheme(window.localStorage.getItem("theme")??"light");
  }else{
    setTheme("light")
  }
  // Theme-specific ring class
  const ringClass = theme === 'dark' ? 'ring-white' : 'ring-blue';

  return (
    <Avatar {...props} className={`ring-2 ${ringClass}`}>
      {user.image ? (
        <div
          className={`relative aspect-square h-full w-full`}
        >
          <Image
            fill
            src={user.image}
            alt='profile picture'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
          <Icons.user className='h-4 w-4' />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
