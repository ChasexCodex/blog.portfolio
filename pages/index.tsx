import Head from 'next/head'
import styles from '../styles/Home.module.css'

import type {GetStaticProps, NextPage} from 'next'
import {PostBanner} from '../components'
import {Post} from '../types'
import {prisma} from '../prisma'

const postsCount = 10

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await prisma.post.findMany({
    take: postsCount,
    orderBy: {created_at: 'asc'},
  })).map(post => ({
    ...post,
    created_at: JSON.stringify(post.created_at),
    updated_at: JSON.stringify(post.updated_at),
  }))

  return {
    props: {
      posts,
    },
    revalidate: 60,
  }
}

type Props = {
  posts: Post[]
}

const Main: NextPage<Props> = ({posts}) => {
  return (
      <div className={styles.container}>
        <Head>
          <title>Elyas Al-Amri{'\''}s Blog</title>
        </Head>
        <div>
          {posts.map((post: Post) => <PostBanner key={post.id} post={post}/>)}
        </div>
      </div>
  )
}

export default Main
