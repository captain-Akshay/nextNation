import GeneralFeed from "@/components/homepage/GeneralFeed";
import CustomFeed from "@/components/homepage/CustomFeed";
import RootProvider from "@/components/ui/RootProvider"
import { getAuthSession } from '@/lib/auth';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export default async function Home() {
  const session = await getAuthSession();
  return (
    <>
      <h1 className='font-bold text-3xl md:text-4xl'>Your feed</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
        {/* @ts-expect-error server component */}
        {session ? <CustomFeed /> : <GeneralFeed />}
        <RootProvider/>

      </div>
    </>
  );
}
