import {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import {Post} from '../../../types'
import {prisma} from '../../../prisma'
import Banner from '../../../components/Banner'

const perPage = 10

export const getStaticPaths: GetStaticPaths = async () => {
	const postCount = await prisma.post.count({
		where: {
			published: true,
		},
	})

	const pages = Math.ceil(postCount / perPage)
	const paths = Array.from({length: pages}, (_, i) => ({params: {page: (i + 1).toString()}}))

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<any, { page: string }> = async ({params}) => {
	const page = params?.page ? parseInt(params.page) : 1

	const posts = (await prisma.post.findMany({
		skip: (page - 1) * perPage,
		take: perPage,
	}))
		.map(post => ({
			...post,
			created_at: JSON.stringify(post.created_at),
			updated_at: JSON.stringify(post.updated_at),
		}))

	return {
		props: {
			posts,
		},
	}
}

type Props = {
	posts: Post[]
}

const Posts: NextPage<Props> = ({posts}) => {
	return (
		<div className="grid grid-cols-2 mx-auto gap-2 w-full max-w-7xl my-4">
			{posts.map(post => <div key={post.id} className="h-40"><Banner post={post}/></div>)}
		</div>
	)
}

export default Posts
