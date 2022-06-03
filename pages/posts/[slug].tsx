import {GetStaticPaths, GetStaticProps} from 'next'
import {prisma} from '@/prisma'
import {Post, Tag} from '@/types'
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote'
import {serialize} from '@/utils/mdx'
import {convertTimestampToMoment} from '@/utils/orm'

import 'github-markdown-css'
import {CategoryLabel} from '@/components'
import TagList from '@/components/TagList'
import Head from 'next/head'
import AboutCard from '@/components/AboutCard'
import getReadingTime from 'reading-time'
import {Image} from '@/components'
import {Fragment} from 'react'

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

	const post = convertTimestampToMoment(res, 'MMMM Do YYYY, h:mm:ss a')
	const source = await serialize(post.content)
	const readingTime = getReadingTime(source.compiledSource).text

	return {
		props: {
			post,
			source,
			readingTime,
		},
	}
}


type Props = {
	post: Post | any
	source: MDXRemoteSerializeResult
	readingTime: string
}

const Post = ({post, source, readingTime}: Props) => {
	return (
		<div className="flex flex-col max-w-5xl w-full mx-auto py-4 px-4">
			<Head>
				<title>{post.title} | by {post.author}</title>
				<meta name="description" content={post.description} key="desc"/>
				{/*TODO: add keywords*/}
				{/*<meta name="keywords" />*/}

				<meta property="og:title" content={post.title} key="og:title"/>
				<meta property="og:image" content={post.thumbnail} key="og:image"/>
				<meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}/posts/${post.slug}`} key="og:url"/>
				<meta property="og:description" content={post.description} key="og:desc"/>
				<meta property="og:type" content="article" key="og:type"/>

				<meta property="og:article:published_time" content={post.created_at}/>
				<meta property="og:article:modified_at" content={post.created_at}/>
				<meta property="og:article:author" content={process.env.NEXT_PUBLIC_DEFAULT_AUTHOR}/>
				<meta property="og:article:section" content={post.category.name}/>

				{post.tags.map((tag: Tag) => (
					<Fragment key={tag.id}>
						<meta name="og:article:tag" content={tag.name}/>
					</Fragment>
				))}

			</Head>
			<div className="flex flex-col
											dark:text-white
											xl:flex-row
											">
				<div className="w-full">
					<div className="aspect-h-3 aspect-w-4">
						<Image layout="fill" src={post.thumbnail} alt={post.title + ' image'}/>
					</div>
				</div>
				<div className="flex flex-col py-2
												xl:px-4
												">
					<p>
					</p>
					<h1 className="text-4xl font-semibold">{post.title}</h1>
					<p className="pt-2 pb-4">{post.description}</p>
					<div className="flex-1"/>
					<div>
						<p>
							<span className="font-bold mr-2">Category:</span>
							<CategoryLabel category={post.category}/>
						</p>
						<div>
							<span className="font-bold mr-2">Tags:</span>
							<TagList tags={post.tags}/>
						</div>
						<p>
							<span className="font-bold mr-2">Published:</span>
							<span>{post.created_at}</span>
						</p>
						{post.updated_at !== post.created_at &&
							<p>
								<span className="font-bold mr-2">Last Updated:</span>
								<span>{post.updated_at}</span>
							</p>
						}
						<p className="xl:mt-2">
							<span className="mr-2 font-semibold italic">Estimated reading time:</span>
							<span>{readingTime}</span>
						</p>
					</div>
				</div>
			</div>

			<div className="border-t-4 border-b-4 h-[10px]"/>

			<article className="markdown-body markdown py-8 border-b-4
													dark:border-gray-400 break-after-left
													">
				<MDXRemote {...source}/>
			</article>

			<AboutCard/>
		</div>
	)
}

export default Post
