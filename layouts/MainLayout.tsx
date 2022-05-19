import {ReactElement} from 'react'
import Image from 'next/image'

const FooterInfo = () => {
  return (
      <footer>
        <div>
          <div>
            <p>Made by Elyas</p>
          </div>
          <div>
            <p>
              <span>Powered By</span>
              <span>
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
              </span>
            </p>
          </div>
        </div>
      </footer>
  )
}

const NavBar = () => {
  return (
      <nav className="h-20 shadow-md flex flex-row items-center px-4">
        <a className="mr-auto text-4xl font-bold"
           href={process.env.APP_URL}>
          Elyas Al-Amri{'\''}s Blog
        </a>
        <a className="text-2xl font-extrabold"
           href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}>
          Portfolio
        </a>
      </nav>
  )
}

const MainLayout = (page: ReactElement) => {
  return (
      <div className="flex flex-col w-screen min-h-screen">
        <NavBar/>
        <main className="flex-1 flex flex-col w-full">
          {page}
        </main>
        <FooterInfo/>
      </div>
  )
}

export default MainLayout
