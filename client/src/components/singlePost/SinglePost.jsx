import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './singlePost.css'
import { context } from '../../context/Context'
import CommentBox from '../comment/CommentBox'
import Comments from '../comment/comments'
import RecommendedPosts from './RecommendedPosts/RecommendedPosts'
import CategoryDropDown from '../CategoryDropDown/CategoryDropDown'
import ShareIcon from './shareIcon/shareIcon'
import Loading from '../Loading/Loading'
import { axiosInstance } from '../../config'

function SinglePost() {
  const { user, dispatch, isLoading } = useContext(context)
  const location = useLocation()
  const navigate = useNavigate()
  const [post, setPost] = useState({})
  const [updateMode, setUpdateMode] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState([])
  const [deletePost, setDeletePost] = useState(false)
  const [fetchComment, setFetchComment] = useState(false)
  const [recPosts, setRecPosts] = useState([])
  const [position, setPosition] = useState(false)
  const path = location.pathname.split('/')[2]

  // getting post data from database
  useEffect(() => {
    dispatch({ type: 'FETCHING_START' })
    const getPost = async () => {
      const fetchPost = await axiosInstance.get('/posts/' + path)
      setPost(fetchPost.data)
      setCategory(fetchPost.data.categories)
      axiosInstance
        .get(`/posts/?category=${fetchPost.data.categories[0]}`)
        .then((res) => {
          let array = res.data
          dispatch({ type: 'FETCHING_SUCCESS' })
          axiosInstance
            .get(`/posts/?category=${fetchPost.data.categories[1]}`)
            .then((response) => {
              array = [...array, ...response.data]
              let uniqueArray = Array.from(new Set(array.map((arr) => arr._id)))
              array = uniqueArray
                .map((arr) => array.find((a) => a._id === arr))
                .filter((arr) => arr._id !== path)
              setRecPosts(array)
            })
            .catch((err) => {
              dispatch({ type: 'FETCHING_FAILURE' })
            })
        })
        .catch((err) => {
          dispatch({ type: 'FETCHING_FAILURE' })
          console.log(err)
        })
    }

    getPost()
  }, [path, updateMode])

  const handleResize = () => {
    window.innerWidth < 1000 ? setPosition(true) : setPosition(false)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  //Deleting... post....
  const postDelete = () => {
    axiosInstance
      .delete(`/posts/${post._id}`, {
        data: { username: user.username, filename: post.photo },
      })
      .then((res) => {
        navigate('/')
      })
      .catch((err) => console.log(err))
  }
  //updating... post.....
  const postUpdate = () => {
    axiosInstance
      .put('/posts/' + path, {
        id: post._id,
        userId: user?._id,
        categories: category,
        title,
        content,
        username: user.username,
      })
      .then((res) => {
        setUpdateMode(false)
      })
      .catch((err) => console.log(err))
  }

  //Edit Mode
  const handleUpdate = () => {
    setUpdateMode(true)
    setTitle(post.title)
    setContent(post.content)
  }

  const props = {
    setFetchComment,
    fetchComment,
    post,
    category,
    setCategory,
  }

  return (
    <div className='singlePost'>
      <div className='singlePostWrapper'>
        <ShareIcon />
        {post.photo && (
          <img src={post.photo} alt='' className='singlePostImg' />
        )}
        {updateMode ? (
          <>
            <CategoryDropDown style={{ color: 'red' }} {...props} />
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='singlePostUpdateTitle'
            ></input>
          </>
        ) : isLoading ? (
          <Loading />
        ) : (
          <>
            <h1 className='singlePostTitle'>
              {post.title}
              <div className='singlePostIcons'>
                {post.userId === user?._id && (
                  <>
                    <i
                      className='singlePostIcon fa-solid fa-pen-to-square'
                      onClick={handleUpdate}
                    ></i>
                    <i
                      className='singlePostIcon fa-solid fa-trash-can'
                      onClick={() => setDeletePost(true)}
                    ></i>
                  </>
                )}
              </div>
            </h1>{' '}
          </>
        )}
        <div className='singlePostInfo'>
          <span className='singlePostAuthor'>
            Author:
            <Link to={`/?user=${post.username}`} className='link'>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className='singlePostDate'>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='singlePostUpdateContent'
          ></textarea>
        ) : (
          <p className='singlePostDesc'>{post.content}</p>
        )}
        {updateMode && (
          <>
            <button className='singlePostUpdateButton' onClick={postUpdate}>
              Update Post
            </button>
            <button
              className='singlePostCancelButton'
              onClick={() => setUpdateMode(false)}
            >
              Cancel
            </button>
          </>
        )}
        {position && !updateMode && <RecommendedPosts recPosts={recPosts} />}
        {!updateMode && user && <CommentBox {...props} />}
        {!updateMode && <Comments {...props} />}
      </div>
      {deletePost && (
        <div className='popup'>
          <div className='popupInner'>
            <div className='close' onClick={() => setDeletePost(false)}>
              ❌
            </div>
            <div className='popupHeader'>
              <h1>Delete Post</h1>
              <button onClick={postDelete}>Confirm</button>
            </div>
            <p>
              All the contents in this post will be deleted
              <br />
              <span>Cannot be recovered</span>
            </p>
          </div>
        </div>
      )}
      {!position && !updateMode && <RecommendedPosts recPosts={recPosts} />}
    </div>
  )
}

export default SinglePost
