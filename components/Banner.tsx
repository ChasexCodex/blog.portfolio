import {Link, CategoryLabel, TagList} from './'
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

				<p>
					{post.description}
				</p>

				<div className="mt-auto flex flex-col space-y-2">
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
			<img src={post.thumbnail ?? 'https://picsum.photos/400/400'} alt={post.title + ' title'}/>
		</div>
	)
}

export default Banner
