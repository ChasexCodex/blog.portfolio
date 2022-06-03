import type {GetStaticProps, NextPage} from 'next'
import {Post} from '@/types'
import {prisma} from '@/prisma'
import {Banner, Image} from '@/components'
import {convertTimestampToMoment} from '@/utils/orm'

const postsCount = 10

export const getStaticProps: GetStaticProps = async () => {
	const res = await prisma.post.findMany({
		take: postsCount,
		where: {published: true},
		orderBy: {created_at: 'desc'},
		select: {
			id: true,
			title: true,
			slug: true,
			author: true,
			description: true,
			published: true,
			created_at: true,
			updated_at: true,
			category: true,
			tags: true,
			thumbnail: true,
		},
	})

	const posts = res.map(p => convertTimestampToMoment(p, 'MMMM Do YYYY, h:mm:ss a'))

	return {
		props: {
			posts,
		},
		revalidate: 60,
	}
}

const MainHeading = () => (
	<section className="w-full dark:text-white h-80 flex">
		<p className="px-2 pt-4 text-2xl xl:text-5xl leading-snug">
			Discover the potentials of technology. Follow Elyas A. Al-Amri every week for new information.
		</p>
		<div className="relative">
			<div className="aspect-h-4 aspect-w-3 xl:w-60">
				<Image layout="fill" src={process.env.NEXT_PUBLIC_AUTHOR_IMAGE_URL ?? '/404.jpg'} alt="Webmaster's Image"/>
				<div className="absolute inset-0 opacity-50 bg-gradient-to-br to-blue-900 from-red-300"/>
			</div>
		</div>
	</section>
)

type Props = {
	posts: Post[]
}

const Home: NextPage<Props> = ({posts}) => (
	<div className="w-full flex flex-col items-center">
		<div className="w-full max-w-6xl my-4">
			<MainHeading/>

			<div className="border-t-4 my-4"/>

			<div className="grid grid-column-1 gap-y-4">
				{posts.map(post => (
					<div key={post.id} className="h-[30rem] xl:h-96">
						<Banner post={post}/>
					</div>
				))}
			</div>
		</div>
	</div>
)

export default Home
