"use client"
import { Button } from '@/components/ui/Button';
import { toast } from '@/hooks/use-toast';
import { CommentRequest } from '@/lib/validators/comment';
import { useCustomToasts } from '@/hooks/use-custom-toasts';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { useTheme } from 'next-themes';

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
}

const CreateComment: FC<CreateCommentProps> = ({ postId, replyToId }) => {
  const [input, setInput] = useState<string>('');
  const router = useRouter();
  const { loginToast } = useCustomToasts();
  const { theme,setTheme } = useTheme();
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      setTheme(window.localStorage.getItem("theme")??"light");
    }else{
      setTheme("light")
    }},[]);
  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, text, replyToId };
      const { data } = await axios.patch('/api/subreddit/post/comment/', payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      return toast({
        title: 'Something went wrong.',
        description: "Comment wasn't created successfully. Please try again.",
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      router.refresh();
      setInput('');
    },
  });

  // Set colors based on the current theme
  const labelColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';
  const textareaBgColor = theme === 'dark' ? 'bg-zinc-700' : 'bg-white';
  const buttonBgColor = theme === 'dark' ? 'bg-emerald-600' : 'bg-zinc-600';
  const buttonTextColor = theme === 'dark' ? 'text-white' : 'text-gray-100';

  return (
    <div className='grid w-full gap-1.5'>
      <Label htmlFor='comment' className={labelColor}>
        Your comment
      </Label>
      <div className='mt-2'>
        <Textarea
          id='comment'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder='What are your thoughts?'
          className={textareaBgColor}
        />
        <div className='mt-2 flex justify-end'>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => comment({ postId, text: input, replyToId })}
            className={`${buttonBgColor} ${buttonTextColor}`}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
