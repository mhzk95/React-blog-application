import { useContext, useEffect, useState } from 'react'
import './like.css'
import { context } from '../../context/Context'
import { useNavigate } from 'react-router-dom'
import {Modal,Button} from 'react-bootstrap'
import { axiosInstance } from '../../config'

function Like({ post }) {
  const [isLiked, setIsLike] = useState(false)
  const [like, setLike] = useState(1)
  const { user } = useContext(context)
  const navigate = useNavigate()
  const [loginFirst,setLoginFirst] = useState(false)

  useEffect(() => {
     setLike(post.likes.length)
     if(post.likes.includes(user?._id)){
         setIsLike(true)
     } else setIsLike(false)
  },[post._id])


  const handleLike = (e) => {
    if(user){

      setIsLike(!isLiked)
      axiosInstance.put('/posts/', { id: post._id, userId: user._id }).then((response) => {
        if(like){
          isLiked ? setLike(like - 1) : setLike(like + 1)
        } else setLike(1)
      }).catch(err => console.log(err))
    } else setLoginFirst(true)
  }
  return (
    <>
    <div className='likeWrapper' onClick={handleLike}>
      <i
        className={`fa-heart likeButton ${
          isLiked ? 'fa-solid pop' : 'fa-regular shrink'
        }`}
      ></i>
      <span className='numberOfLikes'>{like}</span>
    </div>
    <Modal show={loginFirst} onHide={() => setLoginFirst(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login to like the post </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setLoginFirst(false)
            navigate('/login')}}>
          Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Like
