import {useContext, useEffect, useState} from 'react'
import './homepage.css'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import { useLocation } from 'react-router-dom'
import { context } from '../../context/Context'
import Loading from '../../components/Loading/Loading'
import { axiosInstance } from '../../config'


function Homepage() {
  const [posts,setPosts] = useState([])
  const [category,setCategory] =useState([])
  const {search} = useLocation()
  const {dispatch,isLoading} = useContext(context)
  useEffect(() => {
  dispatch({type:"FETCHING_START"})
    const getPosts = () => {
      axiosInstance.get('/posts'+search).then(res => {
        dispatch({type:"FETCHING_SUCCESS"})
        setPosts(res.data)
      }).catch((err) => {
        dispatch({type:"FETCHING_FAILURE"})
        console.log(err)
      })
    }
    axiosInstance
      .get('/category/')
      .then((res) => {
        let array = res.data.reduce((acc, cur) => [...acc, cur.name], [])
        setCategory(array)
      })
      .catch((err) => console.log(err))
    getPosts()
},[search]);
const props = {
  posts,
  category
}
  return (
    <>
      <Header />
      <div className='homepage'>
        {isLoading ? <Loading /> :
        <><Posts {...props}/>
        <Sidebar />  </>  }
      </div>
    </>
  )
}

export default Homepage
