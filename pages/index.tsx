import Head from 'next/head'
import type {GetStaticProps, NextPage} from 'next'
import {Post} from '../types'
import {prisma} from '../prisma'
import Banner from '../components/Banner'

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

const Home: NextPage<Props> = ({posts}) => {
  return (
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-6xl my-4">
          <Head>
            <title>Elyas Al-Amri{'\''}s Blog</title>
          </Head>
          <div className="grid grid-column-1 gap-y-4">
            {posts.map(post => <Banner key={post.id} post={post}/>)}
          </div>
        </div>
      </div>
  )
}

export default Home
