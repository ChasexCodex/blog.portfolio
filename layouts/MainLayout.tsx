import {ReactElement} from 'react'
import Image from 'next/image'
import Link from 'next/link'

const FooterInfo = () => {
	return (
		<footer className="h-32 flex flex-row bg-gray-900 px-4 space-x-4 mt-4">
			<div className="flex-1 flex flex-row items-center justify-evenly my-4 px-4 text-2xl text-white font-semibold">
				<Link href="/posts/page/1"><a>Posts</a></Link>
				<a href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}>
					Portfolio
				</a>
			</div>
			<div className="bg-white flex flex-row justify-center items-center space-x-8 py-4 px-8 my-4">
				<p className="text-xl font-semibold italic">Made by Elyas A. Al-Amri</p>
				<div>
					<p>Powered By</p>
					<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
				</div>
			</div>
		</footer>
	)
}

const NavBar = () => {
	return (
		<nav className="h-20 shadow-md flex flex-row items-center px-4">
			<Link href="/">
				<a className="mr-auto text-4xl font-bold">
					Elyas Al-Amri{'\''}s Blog
				</a>
			</Link>
			<a className="text-2xl font-extrabold"
				 href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}>
				Portfolio
			</a>
		</nav>
	)
}

const MainLayout = (page: ReactElement) => {
	return (
		<div className="flex flex-col w-screen min-h-screen bg-gray-100">
			<NavBar/>
			<main className="flex-1 flex flex-col w-full">
				{page}
			</main>
			<FooterInfo/>
		</div>
	)
}

export default MainLayout
