import { Link } from 'react-router-dom'
import './post.css'
import Like from '../like/Like'
import CommentButton from './CommentButton'
import { HashLink } from 'react-router-hash-link'
import { PF } from '../../config'

function Post({ post }) {
  return (
    <div className='post'>
      <Like post={post} />
      <HashLink smooth className='link' to={`/posts/${post._id}#comments`}>
        <CommentButton post={post} />
      </HashLink>
      <Link className='link' to={`/posts/${post._id}`}>
        {post.photo ? (
          <img src={post.photo} alt='' className='postImg' />
        ) : (
          <img
            className='postImg'
            style={{ border: '1px solid gray', borderRadius: '7px' }}
            src={PF + 'no-image-available.jpg'}
            alt='profile pic'
          />
        )}
        <div className='postInfo'>
          <div className='postInfoTop'>

            <div className='postCats'>
              {post.categories.map((cat, index) => {
                return (
                  <span key={index} className='postCat'>
                    {cat}
                  </span>
                )
              })}
            </div>
            <div className='usernameLg'>
              <p>{post.username}</p>
            </div>
            
          </div>
          <span className='postTitle'>{post.title}</span>
          <span className='postDate'>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className='postDesc'>{post.content}</p>
      </Link>
    </div>
  )
}

export default Post
