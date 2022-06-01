import {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import {Post} from '@/types'
import {prisma} from '@/prisma'
import {Banner, Link} from '@/components'
import {convertTimestampToMoment} from '@/utils/orm'
import Head from 'next/head'
import {PostCounterCache} from '@/utils/model'

const perPage = 10

export const getStaticPaths: GetStaticPaths = async () => {
	const postCount = await PostCounterCache.getCount()

	const pages = Math.ceil(postCount / perPage)
	const paths = Array.from({length: pages}, (_, i) => ({params: {page: (i + 1).toString()}}))

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<any, {page: string}> = async ({params}) => {
	const maxPage = Math.ceil(await PostCounterCache.getCount() / perPage)
	const page = params?.page ? parseInt(params.page) : 1

	const res = await prisma.post.findMany({
		skip: (page - 1) * perPage,
		take: perPage,
		orderBy: {created_at: 'desc'},
		where: {
			published: true,
		},
		include: {
			category: true,
			tags: true,
		},
	})

	const posts = res.map(p => convertTimestampToMoment(p, 'MMMM Do YYYY, h:mm:ss a'))

	return {
		props: {
			posts,
			page,
			maxPage,
		},
		revalidate: 60,
	}
}

type Props = {
	posts: Post[]
	page: number
	maxPage: number
}

const Posts: NextPage<Props> = ({posts, page, maxPage}) => (
	<div className="flex-1 flex flex-col">
		<Head>
			<title>Posts: Page {page} | Elyas Al-Amri{'\''}s Blog</title>

			<meta name="description" content="Posts list: page 1" key="description"/>

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

		<div className="grid grid-cols-1 mx-auto gap-y-8 w-full max-w-screen-2xl my-4
										xl:grid-cols-2 xl:gap-2
										">
			{posts.map(post =>
				<div key={post.id} className="h-96 xl:h-64">
					<Banner post={post}/>
				</div>,
			)}
		</div>

		{/*Pagination*/}
		<div className="flex flex-row mx-auto mt-auto text-2xl
										dark:text-white
										">
			{page > 1 &&
				<Link href={`/posts/page/${page - 1}`}
							className="border px-1 pb-0.5 font-extrabold bg-blue-700 first:rounded-l">
					{'<<'}
				</Link>
			}
			<p className="border bg-blue-700 px-2 only:px-4 only:rounded first:rounded-l last:rounded-r">
				{page}
			</p>
			{page < maxPage &&
				<Link href={`/posts/page/${page + 1}`}
							className="border px-1 pb-1 font-extrabold bg-blue-700 last:rounded-r">
					{'>>'}
				</Link>
			}
		</div>

	</div>
)

export default Posts
