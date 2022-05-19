import Head from 'next/head'

import type {GetStaticProps, NextPage} from 'next'
import {PostBanner} from '../components'
import {Post} from '../types'
import {prisma} from '../prisma'

const postsCount = 10

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await prisma.post.findMany({
    take: postsCount,
    where: {published: true},
    orderBy: {created_at: 'asc'},
    select: {
      title: true,
      slug: true,
      author: true,
      published: true,
      created_at: true,
      updated_at: true,
      category: true,
      tags: true,
    },
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
      <div>
        <Head>
          <title>Elyas Al-Amri{'\''}s Blog</title>
        </Head>
        <div>
          {posts.map(post => <PostBanner key={post.id} post={post}/>)}
        </div>
      </div>
  )
}

export default Main
