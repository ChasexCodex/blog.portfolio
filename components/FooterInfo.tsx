import Image from 'next/image'
import styles from '../styles/Home.module.css'

const FooterInfo = () => {
  return (
      <footer>
        <p>Made by Elyas</p>
        <p>
          <span>Powered By</span>
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
        </p>
      </footer>
  )
}

export default FooterInfo
