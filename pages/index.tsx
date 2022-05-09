import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {getPosts} from '../data/posts'

import type {GetStaticProps, NextPage} from 'next'
import {PostBanner} from '../components'

export const getStaticProps: GetStaticProps = () => {
  const posts = getPosts()

  return {
    props: {
      posts
    },
    revalidate: 60,
  }
}

type Props = {
  posts: any
}

const Main: NextPage<Props> = ({posts}) => {
  return (
      <div className={styles.container}>
        <Head>
          <title>Elyas Al-Amri{"'"}s Blog</title>
        </Head>
        <div>
          {posts.map((post: any) => <PostBanner key={post.id} post={post}/>)}
        </div>
      </div>
  )
}

export default Main
