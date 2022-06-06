import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { context } from '../../context/Context'
import './compose.css'
import CategoryDropDown from '../../components/CategoryDropDown/CategoryDropDown'
import { IconButton, Button } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send'
import { axiosInstance } from '../../config'
import Loading from '../../components/Loading/Loading'

function Compose() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState([])
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const { user } = useContext(context)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPost = {
      username: user.username,
      userId: user._id,
      categories: category,
      title,
      content,
    }

    const postBlog = () => {
      axiosInstance
        .post('/posts', newPost)
        .then((res) => {
          setUploading(false)
          navigate('/posts/' + res.data._id)
        })
        .catch((err) => {
          setUploading(false)
          console.log(err)
        })
    }

    setUploading(true)
    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append('name', fileName)
      data.append('file', file)
      axiosInstance
        .post('/upload', data, {
          onUploadProgress: (data) => {
            setProgress(Math.round((100 * data.loaded) / data.total))
          },
        })
        .then(async (res) => {
          newPost.photo = res.data
           postBlog()
        })
        .catch((err) => {
          setUploading(false)
          console.log(err)
        })
    } else {
      postBlog()
    }
  }
  
  let props={
    category,
    setCategory,
  }

  return (
    <div className='compose'>
      {uploading ? (
        <Loading data={'Uploading'} progress={progress} />
      ) : (
        <>
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt=''
              className='composeImg'
            />
          )}
          <form
            id='formSubmit'
            action=''
            className='composeForm'
            onSubmit={handleSubmit}
          >
            <div className='composeFormGroup'>
              <label htmlFor='composeInputFile'>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <input
                type='file'
                id='composeInputFile'
                style={{ display: 'none' }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <input
                type='text'
                placeholder='Title'
                className='composeInput'
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className='composeFormGroup'>
              <textarea
                placeholder='tell Your Story...'
                type='text'
                className='composeInput composeText'
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </form>
          <CategoryDropDown {...props} />
          <div className='composeSubmit'>
            <Button
              form='formSubmit'
              type='submit'
              variant='contained'
              color='success'
              endIcon={<SendIcon style={{ fontSize: '15px' }} />}
            >
              Publish
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Compose

// https://picsum.photos/1300/800?random=1
