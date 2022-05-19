import {ReactElement} from 'react'
import {FooterInfo, NavBar} from '../components'

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
