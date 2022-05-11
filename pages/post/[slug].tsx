import {GetStaticPaths, GetStaticProps} from 'next'
import {getPostsData, getPostsPaths} from '../../data/posts'

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getPostsPaths()
  const paths = res.map(slug => ({params: {slug}}))

  return {
    paths,
    fallback: false,
  }
}


export const getStaticProps: GetStaticProps = async ({params}) => {
  const postData = await getPostsData(params.slug)

  return {
    props: {
      data: postData,
    },
  }
}

const Post = ({data: post}: any) => {
  return (
      <div>
        <p>{post.title}</p>
        <img src={post.thumbnail} alt={post.title + ' image'}/>
        <p>{post.description}</p>
        <p>{post.author} / {post.created_at} / {post.updated_at}</p>
        <p>{post.content}</p>
      </div>
  )
}

export default Post
