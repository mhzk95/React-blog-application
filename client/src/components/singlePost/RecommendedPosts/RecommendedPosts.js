import './RecommendedPosts.css'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { Link } from 'react-router-dom'
import Loading from '../../Loading/Loading'
import { PF } from '../../../config'

export default function RecommendedPosts({ recPosts, fetchRec }) {
  return (
    <div className='recommendedPostWrapper'>
      <Typography variant='h5'>Recommended Posts</Typography>
      {fetchRec ? (
        <Loading />
      ) : (
        <>
          {recPosts.map((post, index) => {
            return (
              <Card key={index} sx={{ backgroundColor: '', margin: '10px 0' }}>
                <CardActionArea
                  component={Link}
                  to={`/posts/${post._id}`}
                  disableRipple
                >
                  {post.photo ? (
                    <CardMedia
                      component='img'
                      height='140px'
                      image={post.photo}
                      alt='green iguana'
                    />
                  ) : (
                    <CardMedia
                      component='img'
                      height='140px'
                      image={PF + 'no-image-available.jpg'}
                      alt='post'
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom component='div'>
                      {post.title.substring(0, 35) + '...'}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {post.content.substring(0, 135) + '...'}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
        </>
      )}
    </div>
  )
}
