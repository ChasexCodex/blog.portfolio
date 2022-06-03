import type {ReactElement, ReactNode} from 'react'
import type {AppProps} from 'next/app'
import type {NextPage} from 'next'
import MainLayout from '@/layouts/MainLayout'
import '@/styles/globals.css'
import Head from 'next/head'

type NextPageWithLayout = NextPage & {
	Layout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {
	const Layout = Component.Layout ?? MainLayout

	return Layout(
		<>
			<Head>
				<title>Main | Elyas Al-Amri{'\''}s Blog</title>
				<meta name="description" content="Elyas A. Al-Amri's Official Blog. Join me every week for new posts." key="desc"/>

				<meta property="og:title" content="Elyas A. Al-Amri's Official Website" key="og:title"/>
				<meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/website.jpg`} key="og:image"/>
				<meta property="og:image:type" content="image/jpeg" key="og:image:type"/>
				<meta property="og:image:width" content="1000" key="og:image:width"/>
				<meta property="og:image:height" content="425" key="og:image:height"/>
				<meta property="og:image:alt" content="Elyas with ambitous text" key="og:image:alt"/>
				<meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL} key="og:url"/>
				<meta property="og:description" content="Elyas A. Al-Amri's Official Blog. Join me every week for new posts." key="og:desc"/>
				<meta property="og:type" content="website" key="og:type"/>
			</Head>
			<Component {...pageProps}/>
		</>
	)
}

export default MyApp
