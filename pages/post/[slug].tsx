import {GetStaticPaths, GetStaticProps} from 'next'
import {prisma} from '../../prisma'
import {Post} from '../../types'

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
    return {notFound: true}
  }

  const post = await prisma.post.findFirst({
    where: {slug: params.slug}
  })

  return {
    props: {
      post,
    },
  }
}

type Props = {
  post: Post | any
}

const Post = ({post}: Props) => {
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
