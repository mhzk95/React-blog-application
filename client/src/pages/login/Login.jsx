import { Link } from 'react-router-dom'
import './login.css'
import { useContext, useState } from 'react'
import { context } from '../../context/Context'
import { axiosInstance } from '../../config'

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const { dispatch, isFetching, error,focused } = useContext(context)

  const handleChange = (e) => {
    dispatch({type:'RESET'})
    setCredentials((prevalue) => {
      return { ...prevalue, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })

    axiosInstance
      .post('/auth/login', {
        username:credentials.username,
        password:credentials.password
      })
      .then((res) => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
      })
      .catch((err) => {
        dispatch({ type: 'LOGIN_FAILURE' })
        console.log(err)
      })
  }

  return (
    <div className='login'>
      <div className='loginTitle'>Login</div>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label htmlFor=''>Username</label>
        <input
          type='text'
          name='username'
          autoComplete='off'
          spellCheck='false'
          required={true}
          className='loginInput wrongCredInput'
          placeholder='Enter your username'
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){4,16}$"
          onChange={handleChange}
          focused={`${focused}`}
        />
        <span className='wrongCred' style={{background:error && 'rgba(245, 39, 39, 0.378)'}}></span>
        <label htmlFor=''>Password</label>
        <input
          type='password'
          name='password'
          required={true}
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){7,16}$"
          className='loginInput wrongCredInput'
          placeholder='Enter your password'
          onChange={handleChange}
          focused={`${focused}`}
        />

        <span className='wrongCred' style={{background:error && 'rgba(245, 39, 39, 0.378)'}}>
          {error && <p>Incorrect username or password</p>}
        </span>

        <button className='loginButtonLogin' disabled={isFetching}>
          Login
        </button>
      </form>
      <Link to='/register'>
        <button className='registerButtonLogin'>Register</button>
      </Link>
    </div>
  )
}

export default Login
