import {Link, CategoryLabel, TagList} from './'
import {Post} from '@/types'
import {Image} from '@/components'

type Props = {
	post: Post | any
}

const Banner = ({post}: Props) => (
	<div className="flex flex-col-reverse bg-white shadow-md h-full overflow-hidden
									dark:bg-gradient-to-bl dark:from-orange-900 dark:to-neutral-900 dark:text-white dark:shadow-zinc-800
									xl:flex-row">
		<div className="flex-1 flex flex-col text-xs px-4 py-1
										xl:px-2">
			<Link href={`/posts/${post.slug}`}
						className="text-xl underline underline-offset-2
											 xl:text-2xl">
				{post.title}
			</Link>

			{post.author !== process.env.NEXT_PUBLIC_DEFAULT_AUTHOR &&
				<p>{post.author}</p>
			}

			<p className="mt-0.5 flex-1 overflow-hidden">
				{post.description}
			</p>

			<div className="mt-auto flex flex-col space-y-0.5 mt-1 text-xs">
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
		<div className="flex-1">
			<div className="w-full aspect-w-4 aspect-h-3">
				<Image layout="fill" src={post.thumbnail} alt={post.title + ' title'}
							 className="object-cover"
				/>
			</div>
		</div>
	</div>
)

export default Banner
