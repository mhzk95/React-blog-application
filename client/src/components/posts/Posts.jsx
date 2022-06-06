import Post from '../post/post'
import FilterMenu from './FilterMenu'
import './posts.css'

export default function Posts({ posts, category }) {
  return (
    <div className='posts'>
      <FilterMenu category={category} />
      {posts.map((post, index) => {
        return <Post post={post} key={index} />
      })}
    </div>
  )
}
