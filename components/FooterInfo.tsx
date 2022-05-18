import Image from 'next/image'
import styles from '../styles/Footer.module.css'

const FooterInfo = () => {
  return (
      <footer className={styles.container}>
        <div className={styles.content}>
          <div className={styles.text}>
            <p className={styles.maker}>Made by Elyas</p>
          </div>
          <div className={styles.text}>
            <p className={styles.org}>
              <span>Powered By</span>
              <span className={styles.logo}>
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
              </span>
            </p>
          </div>
        </div>
      </footer>
  )
}

export default FooterInfo
