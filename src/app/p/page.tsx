import PromptFeed from '@/components/PromptFeed'
import { FC } from 'react'

interface pageProps {
  
}
const page: FC<pageProps> = ({}) => {
  return <div className='py-14'>
    <PromptFeed />
  </div>
}

export default page
