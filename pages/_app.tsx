import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {NavBar, FooterInfo} from '../components'

function MyApp({Component, pageProps}: AppProps) {
  return (
      <div>
        <NavBar/>
        <main>
          <Component {...pageProps} />
        </main>
        <FooterInfo/>
      </div>
  )
}

export default MyApp
