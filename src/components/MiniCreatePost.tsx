'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Image as ImageIcon, Link2 } from 'lucide-react'
import { FC, useEffect } from 'react'
import { UserAvatar } from './UserAvatar'
import type { Session } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
interface MiniCreatePostProps {
  session: Session | null
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const { theme, setTheme } = useTheme();
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }else{
      setTheme("light")
    }},[]);
  // Set colors based on the current theme
  const greenColor = theme === 'dark' ? 'bg-green-500' : 'bg-green-300';
  const outlineColor = theme === 'dark' ? 'outline-white' : 'outline-black';
  const bgColor = theme === 'dark' ? 'bg-black' : 'bg-white';
  const router = useRouter()
  const pathname = usePathname()

  return (<li className={`overflow-hidden rounded-md ${bgColor} shadow border outline-white`}>
  <div className='h-full px-6 py-4 flex justify-between gap-6'>
    <div className='relative'>
      <UserAvatar
        user={{
          name: session?.user.name || null,
          image: session?.user.image || null,
        }}
      />

      <span
        className={`absolute bottom-0 right-0 rounded-full w-3 h-3 ${greenColor} outline outline-2 ${outlineColor}`}
      />
    </div>
    <Input
      onClick={() => router.push(pathname + '/submit')}
      readOnly
      placeholder='Create post'
    />
    <Button
      onClick={() => router.push(pathname + '/submit')}
      variant='ghost'
    >
      <ImageIcon className='text-zinc-600' />
    </Button>
    <Button
      onClick={() => router.push(pathname + '/submit')}
      variant='ghost'
    >
      <Link2 className='text-zinc-600' />
    </Button>
  </div>
</li>
  )
}

export default MiniCreatePost
