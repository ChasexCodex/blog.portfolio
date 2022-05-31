import {ReactElement} from 'react'
import Image from 'next/image'
import {Link} from '@/components'

const FooterInfo = () => {
	return (
		<footer className="h-20 xl:h-32 flex flex-row bg-gray-900 pl-4 space-x-4 mt-4">
			<div className="flex-1 flex flex-row items-center justify-evenly my-4 px-4 text-white font-semibold text-md
											xl:text-2xl">
				<Link href="/posts/page/1">Posts</Link>
				<a href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}>
					Portfolio
				</a>
			</div>
			<div className="bg-white flex flex-row justify-center items-center space-x-4 px-4 xl:space-x-8 py-4 xl:px-8
											dark:text-white dark:bg-gradient-to-tr dark:from-black dark:to-neutral-600
											">
				<div className="text-xs xl:text-xl w-max">
					<p className="text-center font-semibold italic">Made by</p>
					<p>Elyas A. Al-Amri</p>
				</div>
				<div>
					<p className="text-xs text-center">Powered By</p>
					<div className="bg-white flex justify-center py-1 px-2 rounded-full mt-2">
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
					</div>
				</div>
			</div>
		</footer>
	)
}

const NavBar = () => {
	return (
		<nav className="h-20 shadow-md flex flex-row items-center px-4 dark:bg-black dark:text-gray-200">
			<Link href="/" className="mr-auto text-xl font-bold xl:text-4xl">
				Elyas Al-Amri{'\''}s Blog
			</Link>
			<a className="text-md xl:text-xl font-extrabold"
				 href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}>
				Portfolio
			</a>
		</nav>
	)
}

const MainLayout = (page: ReactElement) => {
	return (
		<div className="flex flex-col w-screen min-h-screen bg-gray-100 dark:bg-neutral-900">
			<NavBar/>
			<main className="flex-1 flex flex-col w-full">
				{page}
			</main>
			<FooterInfo/>
		</div>
	)
}

export default MainLayout
