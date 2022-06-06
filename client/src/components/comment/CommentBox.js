import './style.css'
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { context } from '../../context/Context'
import { axiosInstance } from '../../config'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function CommentBox({ post, setFetchComment, fetchComment }) {
  const [comment, setComment] = useState('')
  const { user, dispatch, isLoading } = useContext(context)

  const handleUpdateComment = (e) => {
    setComment(e.target.value)
  }
  const handleComment = () => {

    dispatch({ type: 'FETCHING_START' })
    axiosInstance
      .post(`/posts/${post._id}/comments`, {
        userId: user?._id,
        username: user.username,
        comment: comment,
        userImage: user.profilePic,
        createdAt: Date.now(),
      })
      .then((res) => {
        dispatch({ type: 'FETCHING_SUCCESS' })
        setComment('')
        setFetchComment(!fetchComment)
      })
      .catch((err) => {
        dispatch({ type: 'FETCHING_FAILURE' })
        console.log(err)
      })
  }
  return (
    <>
      {
        <Card>
          <Card.Header>Comment</Card.Header>
          <Card.Body>
            <InputGroup className='mb-3' >
              <FormControl
                onChange={handleUpdateComment}
                placeholder='type here....'
                aria-describedby='commentSection'
                value={comment}
                as='textarea'
                rows={3}
              />
            </InputGroup>
            <Button onClick={handleComment} variant='success' style={{width:'100%'}}>
              {isLoading ? (
                <Box sx={{ display: 'flex',justifyContent:'center' }}>
                  <CircularProgress size='1.5rem' color='inherit' />
                </Box>
              ) : 
                "Comment"
              }
            </Button>
          </Card.Body>
        </Card>
      }
    </>
  )
}

export default CommentBox
