import { Navbar, Nav, Container } from 'react-bootstrap'
import { useContext } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { context } from '../../context/Context'

function NavbarBoot() {
  const { user, dispatch } = useContext(context)
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }
  return (
    <Navbar bg='light' expand='lg' fixed='top' className='navbar'>
      <Container>
        <Nav className='navbarLogo'>
          <Link to='/' className='link'>
            Blog
          </Link>
        </Nav>
        <div className='rightNavbar'>
          {user ? (
            <Link to='/settings'>
              {user.profilePic ? (
                <img
                  className='navbarImage'
                  src={user.profilePic}
                  alt='profile'
                ></img>
              ) : (
                <i
                  className='fa-regular fa-user'
                  style={{ fontSize: '20px' }}
                ></i>
              )}
            </Link>
          ) : (
            <ul className='fixedNavList'>
              <Link className='link' to='/login'>
                <li className='centerNavListItems'>LOGIN</li>
              </Link>
              <Link className='link' to='/register'>
                <li className='centerNavListItems'>REGISTER</li>
              </Link>
            </ul>
          )}
        </div>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            <div className='centerNavbar'>
              <ul className='centerNavList'>
                <Link className='link' to='/'>
                  <li className='centerNavListItems'>HOME</li>
                </Link>
                <Link className='link' to='/'>
                  <li
                    className='centerNavListItems'
                    style={{ color: 'rgb(177, 176, 176)' }}
                  >
                    ABOUT
                  </li>
                </Link>
                <Link className='link' to='/'>
                  <li
                    className='centerNavListItems'
                    style={{ color: 'rgb(177, 176, 176)' }}
                  >
                    CONTACT
                  </li>
                </Link>
                <Link className='link' to='/compose'>
                  <li className='centerNavListItems'>COMPOSE</li>
                </Link>
                <Link className='link' to='/'>
                  <li className='centerNavListItems' onClick={logout}>
                    {user && 'LOGOUT'}
                  </li>
                </Link>
              </ul>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarBoot
