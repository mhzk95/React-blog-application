
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import { axiosInstance,PF } from '../../config'
import { context } from '../../context/Context'
import './settings.css'
import Loading from '../../components/Loading/Loading'

function Settings() {
  const { user,dispatch,isFetching } = useContext(context)
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState(user.email)
  const [deleteUser,setDeleteUser] = useState(false)
  const navigate = useNavigate()

  const updateUser = (e) => {
    e.preventDefault()
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      username,
      userId: user._id,
      password,
      email,
    }
    const updateUserData = () => {
      axiosInstance
      .put('/user/' + user._id, updatedUser)
      .then((res) => {
        dispatch({type:"UPDATE_SUCCESS",payload:res.data})
        navigate('/')
      })
      .catch((err) => {
        dispatch({type:"UPDATE_FAILURE"})  
        console.log(err)})
    }
    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append('name', fileName)
      data.append('file', file)
      axiosInstance
        .post('/upload', data)
        .then((res) => {
          updatedUser.profilePic = res.data
          updateUserData()
        })
        .catch((err) => console.log(err))
    } else updateUserData()
    
  }
  const confirmDelete = () => {
    axiosInstance.delete('/user/' + user._id,{data:{userId:user._id,filename:user.profilePic}}).then(res => {
      dispatch({type:'LOGOUT'})
    }).catch(err => console.log(err))
  }
  return (
    <div className='settings'>
      <div className='settingsWrapper' >
      {isFetching ? <Loading data={'Updating User....'} />
    
  : <>
        <div className='settingsTitle'>
          <span className='settingsUpdate'>Update your Account</span>
          <span className='settingsDelete' onClick={() => setDeleteUser(true)}>Delete Account</span>
        </div>
        <form action='' className='settingsForm' onSubmit={updateUser}>
          <label htmlFor=''>Profile picture</label>
          <div className='settingsProfile'>
            <img
              src={file ? URL.createObjectURL(file) : user.profilePic}
              alt=''
              onError={(e) => {e.target.src = PF+'no-profile-pic.png'}}
            />
            <label htmlFor='profilePictureInput'>
              <i className='settingsProfileIcon fa-solid fa-circle-user'></i>
            </label>
            <input
              type='file'
              id='profilePictureInput'
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type='text'
            required={true}
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            pattern={"^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){4,16}$"}
          />
          <span>should be 4-16 characters (atleast 1 alphabet and a number)</span>
          <label>Email</label>
          <input
            type='email'
            placeholder={user.email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>New Password</label>
          <input
            type='password'
            className='password'
            required={true}
            pattern={"^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){4,16}$"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>should contain 7 characters (atleast 1 alphabet and a number)</span>
          <button className='settingsSubmit'>Update</button>
        </form>
        {deleteUser &&
        <div className="popup">
          <div className="popupInner">
          <div className="close" onClick={() => setDeleteUser(false)}>❌</div>
          <div className="popupHeader">
          <h1>Delete User</h1>
          <button onClick={confirmDelete}>Confirm</button>
          </div>
            <p>All posts and related contents will be deleted<br /><span>Cannot be recovered</span></p>
          </div>
        </div>
        }
        </>
    }
      </div>
      <Sidebar />
    </div>
  )
}

export default Settings
