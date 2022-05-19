import Link from 'next/link'

const Banner = ({post}: any) => {
  return (
      <div className="flex flex-row bg-white shadow-md h-full">
        <div className="mr-auto p-4 flex flex-col">
          <Link href={`/posts/${post.slug}`}>
            <a className="text-2xl">{post.title}</a>
          </Link>

          {post.author !== process.env.NEXT_PUBLIC_DEFAULT_AUTHOR &&
            <p>{post.author}</p>
          }
          <div className="mt-auto">
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
