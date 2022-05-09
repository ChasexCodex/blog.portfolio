import Link from 'next/link'

const PostBanner = ({post}: any) => {
  return (
      <div>
        <Link href={`/post/${post.slug}`}>
          <a><p>{post.title}</p></a>
        </Link>

        <img src={post.thumbnail} alt={post.title}/>
        <p>{post.description}</p>
        <p>{post.author} / {post.created_at} / {post.updated_at}</p>
      </div>
  )
}

export default PostBanner
