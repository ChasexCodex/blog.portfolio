import {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import {Post} from '../../../types'
import {prisma} from '../../../prisma'

import styles from '../../../styles/PostList.module.css'

const perPage = 10

export const getStaticPaths: GetStaticPaths = async () => {
  const postCount = await prisma.post.count({
    where: {
      published: true,
    },
  })

  const pages = Math.ceil(postCount / perPage)
  const paths = Array.from({length: pages}, (_, i) => ({params: {page: (i + 1).toString()}}))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<any, {page: string}> = async ({params}) => {
  const page = params?.page ? parseInt(params.page) : 1

  const posts = (await prisma.post.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
  }))
      .map(post => ({
        ...post,
        created_at: JSON.stringify(post.created_at),
        updated_at: JSON.stringify(post.updated_at),
      }))

  return {
    props: {
      posts,
    },
  }
}

type PostProps = {
  post: Post
}

const Banner = ({post}: PostProps) => {
  return (
      <div key={post.id} className={styles.banner}>
        <div className={styles.bancon}>
          <p className={styles.title}>{post.title}</p>
          <p>{post.author}</p>
          <div className={styles.timestamp}>
            <p>
              <span>Published: </span>
              <span>{post.created_at}</span>
            </p>
            <p>
              <span>Last Edit: </span>
              <span>{post.updated_at}</span>
            </p>
          </div>
          <div className={styles.space}/>
          <img className={styles.thumbnail} src="https://picsum.photos/400/400"/>
        </div>
      </div>
  )
}

type Props = {
  posts: Post[]
}

const Posts: NextPage<Props> = ({posts}) => {
  return (
      <div className={styles.container}>
        {posts.map(post => <Banner key={post.id} post={post}/>)}
      </div>
  )
}

export default Posts
