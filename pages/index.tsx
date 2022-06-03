import type {GetStaticProps, NextPage} from 'next'
import {Post} from '@/types'
import {prisma} from '@/prisma'
import {Banner} from '@/components'
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

type Props = {
	posts: Post[]
}

const Home: NextPage<Props> = ({posts}) => (
	<div className="w-full flex flex-col items-center">
		<div className="w-full max-w-6xl my-4">
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
