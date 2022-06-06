import './sidebar.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../../config'

export default function Sidebar() {
  const [cat, setCat] = useState([])
  useEffect(() => {
    const getCat = () => {
      axiosInstance.get('/category/').then((res) => {
        setCat(res.data)
      })
    }
    getCat()
  }, [])

  return (
    <div className='sidebar'>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>ABOUT ME</span>
        <img
          src='https://1.bp.blogspot.com/-arGwhEe2rG0/YTuyVzbS2NI/AAAAAAAAuUU/tKgGGBXs4Ig1kDG63eB8R_CKppQ8HY71QCLcBGAsYHQ/s920/Best-Profile-Pic-For-Boys%2B%25281%2529.png'
          alt='profile'
        />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's
        </p>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>CATEGORIES</span>
        <ul className='sidebarList'>
          {cat.map((cat, index) => {
            return (
              <Link to={`/?category=${cat.name}`} key={index}>
                <li className='sidebarListItem'>{cat.name}</li>
              </Link>
            )
          })}
        </ul>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>FOLLOW US</span>
        <div className='sidebarSocial'>
          <i className=' sidebarIcons fa-brands fa-facebook-square'></i>
          <i className=' sidebarIcons fa-brands fa-twitter-square'></i>
          <i className=' sidebarIcons fa-brands fa-instagram-square'></i>
          <i className=' sidebarIcons fa-brands fa-github-square'></i>
        </div>
      </div>
    </div>
  )
}
