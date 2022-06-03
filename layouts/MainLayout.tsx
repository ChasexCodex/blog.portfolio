import {ReactElement} from 'react'
import Image from 'next/image'
import {Link} from '@/components'

const FooterInfo = () => (
	<footer className="h-20 xl:h-32 flex flex-row bg-gray-900 pl-4 space-x-4 mt-4">
		<div className="flex-1 flex flex-row items-center justify-around text-white font-semibold text-md
											xl:text-2xl">
			<Link href="/posts/page/1">
				Posts
			</Link>
			<a href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}>
				Portfolio
			</a>
			<Link href="/contact">
				Contact Me
			</Link>
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

const NavBar = () => (
	<nav className="shadow-md flex flex-col justify-center items-center px-2 py-2.5
	 								xl:px-4 xl:flex-row xl:py-6
	 								dark:bg-black dark:text-gray-200">
		<Link href="/" className="text-4xl pb-4 font-bold xl:pb-0 xl:mr-auto">
			Elyas Al-Amri{'\''}s Blog
		</Link>
		<div className="space-x-4 text-lg pt-1 font-bold
										xl:text-xl">
			<Link href="/posts/page/1"
						className="px-2 rounded-sm outline outline-2 hover:bg-white hover:text-black transition">
				Posts
			</Link>
			<Link href="/contact"
						className="px-2 rounded-sm outline outline-2 hover:bg-white hover:text-black transition">
				Contact Me
			</Link>
			<a href={process.env.NEXT_PUBLIC_PORTFOLIO_URL}
				 className="font-extrabold px-2 rounded-sm outline outline-2 outline-yellow-400 hover:bg-yellow-400 hover:text-black transition">
				Portfolio
			</a>
		</div>
	</nav>
)

const MainLayout = (page: ReactElement) => (
	<div className="flex flex-col w-screen min-h-screen bg-gray-100 dark:bg-neutral-900">
		<NavBar/>
		<main className="flex-1 flex flex-col w-full">
			{page}
		</main>
		<FooterInfo/>
	</div>
)

export default MainLayout
