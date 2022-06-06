import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../config'
import FormInput from './FormInput'
import './register.css'

function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword:''
  })
  const [userExist, setUserExist] = useState(false)
  const [emailExist, setEmailExist] = useState(false)
  const navigate = useNavigate()

  const inputs = [
    {
      id:1,
      name: 'username',
      authMessage: 'Username Already exist',
      type: 'text',
      exist: userExist,
      placeholder: 'Enter Your Username',
      errorMessage:'should be 4-16 characters (atleast 1 alphabet and a number)',
      label:'Username',
      pattern:"^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){4,16}$",
      required:true
    },
    {
      id:2,
      name: 'email',
      authMessage: 'Email Already exist',
      type: 'email',
      exist: emailExist,
      placeholder: 'Enter Your Email',
      errorMessage:'should be a valid email',
      label:'Email',
      required:true
    },
    {
      id:3,
      name: 'password',
      type: 'password',
      exist: false,
      placeholder: 'Enter Your Password',
      errorMessage:'should contain 7 characters (atleast 1 alphabet and a number)',
      label:'Password',
      pattern:"^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){7,16}$",
      required:true
    },
    {
      id:4,
      name: 'confirmPassword',
      type: 'password',
      exist: false,
      placeholder: 'Confirm Password',
      errorMessage:'password does not match',
      label:'Confirm Password',
      pattern:values.password,
      required:true
    },
  ]

  const registerSubmit = (e) => {
    e.preventDefault()
    setUserExist(false)
    setEmailExist(false)
    axiosInstance
      .post('/auth/register', { ...values })
      .then((res) => {
        navigate('/login')
      })
      .catch((err) => {
        let error = err.response.data.keyValue
        if (error.username) {
          setUserExist(true)
        } else if (error.email) {
          setEmailExist(true)
        }
        console.log(err)
      })
  }
  onchange = ((e) => {
    setUserExist(false)
    setEmailExist(false)
    setValues({...values,[e.target.name]:e.target.value})})
  return (
    <div className='register'>
      <div className='registerTitle'>Register</div>

      <form className='registerForm' onSubmit={registerSubmit}>
        {inputs.map((input) => (
          <FormInput {...input}  key={input.id } value={values[input.name]} onChange={onchange} />
        ))}
        <button className='registerButtonRegister'>Register</button>
      </form>
      <Link to='/login'>
        <button className='loginButtonRegister'>Login</button>
      </Link>
    </div>
  )
}

export default Register
