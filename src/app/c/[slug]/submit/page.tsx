import { Editor } from '@/components/Editor'
import { Button } from '@/components/ui/Button'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import SubmitProvider from '@/components/ui/SubmitProvider'
interface pageProps {
  params: {
    slug: string
  }
}

const page = async ({ params }: pageProps) => {
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: params.slug,
    },
  })

  if (!subreddit) return notFound()

  return (
    <div className='flex flex-col items-start gap-6'>
      {/* heading */}
      <SubmitProvider slug={params.slug} />

      {/* form */}
      <Editor subredditId={subreddit.id} />

      <div className='w-full flex justify-end'>
        <Button type='submit' className='w-full' form='subreddit-post-form'>
          Post
        </Button>
      </div>
    </div>
  )
}

export default page
