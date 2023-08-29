'use client'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { FC } from 'react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/use-toast'
import { Icons } from './Icon'
import { useTheme } from 'next-themes'
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { theme,setTheme } = useTheme();
  React.useEffect(()=>{
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }else{
      setTheme("light")
    }},[]);
  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with Google',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }
  const loginWithGithub = async () => {
    setIsLoading(true)

    try {
      await signIn('github')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error logging in with github',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <>
      <div className="flex justify-center w-full m-2">
        <Button
          isLoading={isLoading}
          type="button"
          size="sm"
          className={`w-full ${
            theme === 'dark' ? 'border-white border-2' : 'border-neutral-300 border-2'
          }`}
          onClick={loginWithGoogle}
          disabled={isLoading}
        >
          {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
          Google
        </Button>
      </div>
      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
          OR
        </p>
      </div>
      <div className="flex justify-center w-full m-2">
        <Button
          isLoading={isLoading}
          type="button"
          size="sm"
          className={`w-full ${
            theme === 'dark' ? 'border-white border-2' : 'border-neutral-300 border-2'
          }`}
          onClick={loginWithGithub}
          disabled={isLoading}
        >
          {isLoading ? null : <Icons.github className="h-4 w-4 mr-2" />}
          Github
        </Button>
      </div>
    </>
  );}

export default UserAuthForm
