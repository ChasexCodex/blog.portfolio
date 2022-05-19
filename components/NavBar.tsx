import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
      <nav className={styles.container}>
        <a className={styles.title} href={process.env.APP_URL}>
          Elyas Al-Amri{"'"}s Blog
        </a>
        <div className={styles.hold}>
          <a className={styles.portfolio} href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}>
            Portfolio
          </a>
        </div>
      </nav>
  )
}

export default NavBar
