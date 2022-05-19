import Link from 'next/link'

const PostBanner = ({post}: any) => {
  return (
      <div>
        <div>
          <Link href={`/post/${post.slug}`}>
            <a>{post.title}</a>
          </Link>

          {/*<p>{post.description}</p>*/}
          {post.author !== process.env.NEXT_PUBLIC_DEFAULT_AUTHOR &&
            <p>{post.author}</p>
          }
          <div/>
          <div>
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

export default PostBanner
