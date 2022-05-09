import {GetStaticPaths, GetStaticProps} from 'next'
import {getPostsData, getPostsPaths} from '../../data/posts'

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getPostsPaths().map(p => ({params: {slug: p}}))

  return {
    paths,
    fallback: false,
  }
}


export const getStaticProps: GetStaticProps = ({params}) => {
  const postData = getPostsData(params.slug)

  return {
    props: {
      data: postData
    }
  }
}

const Post = ({data: post}: any) => {
  return (
      <div>
        <p>{post.title}</p>
        <img src={post.thumbnail} alt={post.title}/>
        <p>{post.description}</p>
        <p>{post.author} / {post.created_at} / {post.updated_at}</p>
      </div>
  )
}

export default Post
