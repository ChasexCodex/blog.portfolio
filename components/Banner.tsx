import {Link, CategoryLabel, TagList} from './'
import {Post} from '@/types'
import Image from 'next/image'

type Props = {
	post: Post | any
}

const Banner = ({post}: Props) => {
	return (
		<div className="flex flex-col-reverse bg-white shadow-md h-full overflow-hidden
										dark:bg-gradient-to-bl dark:from-orange-900 dark:to-neutral-900 dark:text-white dark:shadow-zinc-800
										xl:flex-row
										">
			<div className="flex-1 flex flex-col text-xs px-2 py-1
											xl:p-4
											">
				<Link href={`/posts/${post.slug}`}
							className="text-lg underline
												 xl:text-2xl
												 ">
					{post.title}
				</Link>

				{post.author !== process.env.NEXT_PUBLIC_DEFAULT_AUTHOR &&
					<p>{post.author}</p>
				}

				<p className="flex-1">{post.description}</p>

				<div className="mt-auto flex flex-col space-y-1 text-xs
												xl:space-y-2
												">
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
							<span className="font-bold mr-2">Last Edit:</span>
							<span>{post.updated_at}</span>
						</p>
					}
				</div>
			</div>
			<Image width="400" height="300" src={post.thumbnail ?? 'https://picsum.photos/400/300'} alt={post.title + ' title'}
						 className="object-cover"
			/>
		</div>
	)
}

export default Banner
