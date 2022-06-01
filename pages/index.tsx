import Head from 'next/head'
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

const Home: NextPage<Props> = ({posts}) => {
	return (
		<div className="w-full flex flex-col items-center">
			<div className="w-full max-w-6xl my-4">
				<Head>
					<title>Main | Elyas Al-Amri{'\''}s Blog</title>
					<meta name="description" content="Elyas A. Al-Amri's Official Blog. Join me every week for new posts." key="desc"/>

					<meta property="og:title" content="Elyas A. Al-Amri's Official Website" key="og:title"/>
					<meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/website.jpg`} key="og:image"/>
					<meta property="og:image:type" content="image/jpeg"/>
					<meta property="og:image:width" content="1000"/>
					<meta property="og:image:height" content="425" />
					<meta property="og:image:alt" content="Elyas with ambitous text"/>
					<meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL} key="og:url"/>
					<meta property="og:description" content="Elyas A. Al-Amri's Official Blog. Join me every week for new posts." key="og:desc"/>

					<meta property="og:type" content="website"/>

				</Head>
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
}

export default Home
