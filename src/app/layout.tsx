import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import {Inter} from "next/font/google"
import ThemePro from '@/components/ThemePro'
import HomeProvider from '@/components/ui/HomeProvider'
import Providers from '@/components/Providers'


export const metadata = {
  title: 'URverse',
  description: 'Your Verse to connect with Tech Leads engage with conversation with them and grow together!',
}


const inter= Inter({subsets:["latin"]})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={cn("bg-white text-slate-900 antialiased light",inter.className)}>
      <body className='min-h-screen bg-slate-50 antialiased'>
        <ThemePro>
          <Providers>
          <HomeProvider>

            {/* @ts-ignore */}
        <Navbar />
        <div className='container max-w-7xl mx-auto py-5'>
        {children}
        </div>
        <Toaster/>
        </HomeProvider>
        </Providers>
        </ThemePro>
        </body>
    </html>
  )
}
