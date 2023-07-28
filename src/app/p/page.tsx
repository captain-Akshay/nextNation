import PromptFeed from '@/components/PromptFeed'
import { FC } from 'react'

interface pageProps {
  
}
const page: FC<pageProps> = ({}) => {
  const fetchPopularTags = async (tags:string[]) => {
    try {
      // Convert the 'tags' state to a comma-separated string.
      const tagsString = tags.join(',');

      // Build the fetch URL with the tags as query parameters.
      const url = `/api/p?tags=${encodeURIComponent(tagsString)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching popular tags:", error);
    }
  };
  return <div className='py-14'>
    <PromptFeed fetchPopularTags={fetchPopularTags}/>
  </div>
}

export default page
