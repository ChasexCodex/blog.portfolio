import type {ReactElement, ReactNode} from 'react'
import type {AppProps} from 'next/app'
import type {NextPage} from 'next'
import MainLayout from '@/layouts/MainLayout'
import '@/styles/globals.css'

type NextPageWithLayout = NextPage & {
	Layout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {
	const Layout = Component.Layout ?? MainLayout

	return Layout(<Component {...pageProps}/>)
}

export default MyApp
