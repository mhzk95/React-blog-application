
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Divider, Avatar, Grid, Paper } from '@mui/material'
import DeleteMenu from './DeleteMenu'
import { axiosInstance } from '../../config'

function Comments({ fetchComment,setFetchComment}) {
  const [comments, setComments] = useState([])
  const location = useLocation()
  const path = location.pathname.split('/')[2]

  useEffect(() => {
    axiosInstance
      .get(`/posts/${path}/comments`)
      .then((res) => {
        setComments(res.data)
      })
      .catch((err) => console.log(err))
  }, [path,fetchComment])
  return (
    <div  className='commentSection'>
    <h4>Comments</h4>
    <Divider variant='fullWidth' style={{ margin: '10px 0' }} />
    <Paper id='comments' style={{ padding: "40px 20px" }}>
      {comments?.map((comment,index) => {
        let time = moment(Date.parse(comment.createdAt)).fromNow()
        let props ={
          comment,
          fetchComment,
          setFetchComment
        }
        return (
            <Grid className='singleComment' key={index} container wrap='nowrap' spacing={2}>
              <Grid item>
                {comment?.userImage ? (
                  <Avatar alt='Remy Sharp' src={comment?.userImage} />
                ) : (
                  <AccountCircleIcon fontSize='large' />
                )}
              </Grid>
              <Grid justifyContent='left' item xs zeroMinWidth>
                <h6 style={{ margin: 0, textAlign: 'left' }}>
                  {comment?.username}
                </h6>
                <DeleteMenu {...props} />
                <p style={{ textAlign: 'left',margin:0,whiteSpace:'pre-wrap' }}>{comment?.comment}</p>
                <p style={{ textAlign: 'left', color: 'gray',fontSize:'0.8rem' }}>
                  {`posted ${time}`}
                </p>
              </Grid>
            </Grid>
          
        )
      })}
      </Paper>
    </div>
  )
}

export default Comments
