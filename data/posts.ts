import fakeDB from '../db.json'

export const getPosts = (limit?: number) => {
  return fakeDB.posts
}
