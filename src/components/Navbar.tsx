import { UserAccountNav } from './UserAccountNav'
import SearchBar from './SearchBar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { NavbarButton,NavbarProvider,NightComponent,NavbarLogo } from '@/components/ui/NavbarContent'
import Notification from './notification/Notification'
import Myprofile from './Myprofile'
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
         <Myprofile id={session.user.username}/>
         </>
         ) : (
          <NavbarButton/>)}
          {/* @ts-ignore */}
          <Notification />
          <NightComponent />

      </div>
      </NavbarProvider>
  )
}
export default Navbar;

