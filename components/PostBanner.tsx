import Link from 'next/link'
import styles from '../styles/Banner.module.css'

const PostBanner = ({post}: any) => {
  return (
      <div className={styles.container}>
        <div className={styles.info}>
          <Link href={`/post/${post.slug}`}>
            <a className={styles.title}>{post.title}</a>
          </Link>

          {/*<p>{post.description}</p>*/}
          {post.author !== process.env.NEXT_PUBLIC_DEFAULT_AUTHOR &&
            <p>{post.author}</p>
          }
          <div className={styles.space}/>
          <div className={styles.timestamp}>
            <p className={styles.published}>Published: {post.created_at}</p>
            {post.updated_at !== post.created_at &&
              <p>Last Edit: {post.updated_at}</p>
            }
          </div>
        </div>
        <img src={post.thumbnail ?? 'https://picsum.photos/400/400'} alt={post.title} className={styles.thumbnail}/>
      </div>
  )
}

export default PostBanner
