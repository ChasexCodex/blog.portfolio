import Head from 'next/head'
import type {GetStaticProps, NextPage} from 'next'
import {Post} from '../types'
import {prisma} from '../prisma'
import Link from 'next/link'

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


const Banner = ({post}: any) => {
  return (
      <div className="flex flex-row bg-white shadow-md">
        <div className="mr-auto p-4 flex flex-col">
          <Link href={`/posts/${post.slug}`}>
            <a className="text-2xl">{post.title}</a>
          </Link>

          {post.author !== process.env.NEXT_PUBLIC_DEFAULT_AUTHOR &&
            <p>{post.author}</p>
          }
          <div className="mt-auto">
            <p>Published: {post.created_at}</p>
            {post.updated_at !== post.created_at &&
              <p>Last Edit: {post.updated_at}</p>
            }
          </div>
        </div>
        <img src={post.thumbnail ?? 'https://picsum.photos/400/400'} alt={post.title}/>
      </div>
  )
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
