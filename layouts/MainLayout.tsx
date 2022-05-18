import {ReactElement} from 'react'
import {FooterInfo, NavBar} from '../components'
import styles from '../styles/MainLayout.module.css'

const MainLayout = (page: ReactElement) => {
  return (
      <div className={styles.root}>
        <NavBar/>
        <main className={styles.main}>
          {page}
        </main>
        <FooterInfo/>
      </div>
  )
}

export default MainLayout
