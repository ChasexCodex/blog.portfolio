import {GetStaticPaths, GetStaticProps} from 'next'
import {prisma} from '../../prisma'
import {Post} from '../../types'
import {serialize} from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote'

import rehypeHighlight from 'rehype-highlight'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'


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
    where: {
      slug: params.slug,
      published: true,
    },
  })

  if (!post) {
    return {notFound: true}
  }

  post.created_at = JSON.stringify(post.created_at)
  post.updated_at = JSON.stringify(post.updated_at)

  const {content} = matter(post.content)
  const source = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {className: ['anchor']},
          },
          {behaviour: 'wrap'},
        ],
        rehypeHighlight,
        rehypeCodeTitles,
      ],
    },
  })

  return {
    props: {
      post,
      source,
    },
  }
}

type Props = {
  post: Post | any
  source: MDXRemoteSerializeResult
}

const Post = ({post, source}: Props) => {
  return (
      <div>
        <p>{post.title}</p>
        <img src={post.thumbnail ?? 'https://picsum.photos/400/400'} alt={post.title + ' image'}/>
        <p>{post.description}</p>
        <article>
          <MDXRemote {...source}/>
        </article>
      </div>
  )
}

export default Post
