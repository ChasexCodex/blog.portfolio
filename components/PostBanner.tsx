const PostBanner = ({post}: any) => {
  return (
      <div>
        <p>{post.title}</p>
        <img src={post.thumbnail} alt={post.title}/>
        <p>{post.description}</p>
        <p>{post.author} / {post.created_at} / {post.updated_at}</p>
      </div>
  )
}

export default PostBanner
