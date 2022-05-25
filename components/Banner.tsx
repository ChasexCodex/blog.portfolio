import Link from './Link'
import {Post} from '@/types'

type Props = {
	post: Post | any
}

const Banner = ({post}: Props) => {
	return (
		<div className="flex flex-row bg-white shadow-md h-full
										dark:bg-gray-800 dark:text-white
										">
			<div className="mr-auto p-4 flex flex-col">
				<Link href={`/posts/${post.slug}`} className="text-2xl">
					{post.title}
				</Link>

				{post.author !== process.env.NEXT_PUBLIC_DEFAULT_AUTHOR &&
					<p>{post.author}</p>
				}
				<div className="mt-auto flex flex-col space-y-2">
					<p>
						<span className="mr-2">Category:</span>
						<span className="bg-orange-400 px-1.5 rounded-full text-xs py-0.5 font-semibold text-white">
								{post.category.name}
						</span>
					</p>
					<div>
						<span className="mr-2">Tags: </span>
						<div className="inline-block">
							{post.tags.map((t: any) =>
								<span className="bg-green-500 px-1.5 rounded-full text-xs py-0.5 font-semibold text-white" key={t.id}>{t.name}</span>
							)}
						</div>
					</div>
					<p>Published: {post.created_at}</p>
					{post.updated_at !== post.created_at &&
						<p>Last Edit: {post.updated_at}</p>
					}
				</div>
			</div>
			<img src={post.thumbnail ?? 'https://picsum.photos/400/400'} alt={post.title}/>
		</div>
	)
}

export default Banner
