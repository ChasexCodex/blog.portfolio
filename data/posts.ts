import {supabase} from './supabase'
import {Post} from '../types'

export const getPosts = async (limit: number = 15) => {
  const res = await supabase.from('posts').select().limit(limit)
  return res.data as Post[]
}

export const getPostsPaths = async () => {
  const res = await supabase.from('posts').select('slug')
  return res.data as string[]
}

export const getPostsData = async (slug: string) => {
  const res = await supabase.from('posts').select().eq('slug', slug)

  if (!res.data || res.data?.length === 0) {
    throw new Error(`post with slug "${slug}" not found`)
  }

  return res.data[0] as Post
}
