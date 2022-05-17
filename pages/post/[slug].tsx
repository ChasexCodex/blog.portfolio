import {GetStaticPaths, GetStaticProps} from 'next'
import {getPostsData} from '../../data/posts'
import {prisma} from '../../prisma'

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await prisma.post.findMany({
    select: {slug: true},
  })

  const paths = res.map(post => ({params: post}))

  return {
    paths,
    fallback: false,
  }
}


export const getStaticProps: GetStaticProps<any, {slug: string}> = async ({params}) => {
  if (!params) {
    throw new Error('params is null or undefined')
  }

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
