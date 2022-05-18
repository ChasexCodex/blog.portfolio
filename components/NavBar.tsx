import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
      <nav className={styles.container}>
        <p className={styles.title}>Elyas Al-Amri{"'"}s Blog</p>
        <div className={styles.hold}>
          <a className={styles.portfolio} href="#">Portfolio</a>
        </div>
      </nav>
  )
}

export default NavBar
