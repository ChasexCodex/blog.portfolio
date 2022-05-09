import fakeDB from '../db.json'

export const getPosts = (limit?: number) => {
  return fakeDB.posts
}

export const getPostsPaths = () => {
  return fakeDB.posts.map(p => p.slug)
}

export const getPostsData = (slug: string) => {
  return fakeDB.posts.find(p => p.slug === slug)
}
