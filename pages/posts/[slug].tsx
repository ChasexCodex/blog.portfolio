import {GetStaticPaths, GetStaticProps} from 'next'
import {prisma} from '@/prisma'
import {Post} from '@/types'
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote'
import {serialize} from '@/utils/mdx'
import {convertTimestampToString} from '@/utils/orm'

import 'github-markdown-css'
import moment from 'moment'

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await prisma.post.findMany({
		select: {slug: true},
	})

	const paths = res.map(post => ({params: post}))

	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<any, {slug: string}> = async ({params}) => {
	if (!params) {
		return {notFound: true}
	}

	const res = await prisma.post.findFirst({
		where: {
			slug: params.slug,
			published: true,
		},
		include: {category: true, tags: true},
	})

	if (!res) {
		return {notFound: true}
	}

	const post = convertTimestampToString(res)
	const source = await serialize(post.content)

	return {
		props: {
			post,
			source,
		},
	}
}


type Props = {
	post: Post | any
	source: MDXRemoteSerializeResult
}

const Post = ({post, source}: Props) => {
	return (
		<div className="flex flex-col max-w-5xl mx-auto my-4">

			<div className="flex flex-row mb-4">
				<img src={post.thumbnail ?? 'https://picsum.photos/400/400'} alt={post.title + ' image'}/>
				<div className="flex flex-col px-4 py-2">
					<p className="text-4xl font-semibold">{post.title}</p>
					<p className="pt-4">
						{post.description ?? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias commodi eum in iste laudantium placeat quaerat quas totam vero.'}
					</p>
					<div className="flex-1"/>
					<div>
						<p>
							<span className="mr-2">Category:</span>
							<span className="bg-orange-400 px-1.5 rounded-full text-xs py-0.5 font-semibold text-white">
								{post.category.name}
							</span>
						</p>
						<div>
							<span className="mr-2">Tags:</span>
							<div className="inline-block">
								{post.tags.map((t: any) =>
									<span className="bg-green-500 px-1.5 rounded-full text-xs py-0.5 font-semibold text-white" key={t.id}>{t.name}</span>
								)}
							</div>
						</div>
						<p className="">Published: {moment(post.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
						<p className="">Last Updated: {moment(post.updated_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
					</div>
				</div>
			</div>

			<article className="markdown-body py-2 px-8">
				<MDXRemote {...source}/>
			</article>

		</div>
	)
}

export default Post
