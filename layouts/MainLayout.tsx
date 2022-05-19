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
      <nav>
        <a href={process.env.APP_URL}>
          Elyas Al-Amri{"'"}s Blog
        </a>
        <div>
          <a href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}>
            Portfolio
          </a>
        </div>
      </nav>
  )
}

const MainLayout = (page: ReactElement) => {
  return (
      <div>
        <NavBar/>
        <main>
          {page}
        </main>
        <FooterInfo/>
      </div>
  )
}

export default MainLayout
