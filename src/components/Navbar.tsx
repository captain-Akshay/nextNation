import { UserAccountNav } from './UserAccountNav'
import SearchBar from './SearchBar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { NavbarButton,NavbarProvider,NightComponent,NavbarLogo } from '@/components/ui/NavbarContent'
import Notification from './notification/Notification'
import Myprofile from './Myprofile'
import PlayGroundButton from './playground/PlayGroundButton'
import BrowseCommunity from "@/components/BrowseCommunity"
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <NavbarProvider>
      <NavbarLogo/>

        <SearchBar />
        <div className=' flex space-x-6 justify-center'>
        {session?.user ? (
          <>
         <UserAccountNav user={session.user} />
         <div className='hidden lg:block '>
         <Myprofile id={session.user.username}/>
         </div>
         {/* @ts-expect-error server component*/}
         <Notification />
         </>
         ) : (<>
          <NavbarButton/>
          <PlayGroundButton/>
          <BrowseCommunity />
          </>
          )}
          <NightComponent />

      </div>
      </NavbarProvider>
  )
}
export default Navbar;

