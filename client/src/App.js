import React, { useContext } from 'react'
import Compose from './pages/compose/Compose'
import Homepage from './pages/homepage/Homepage'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Settings from './pages/settings/Settings'
import Single from './pages/Single/Single'
import Footer from './components/footer/footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { context } from './context/Context'
import NavbarBoot from './components/navbar/NavbarBoot'
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from './ScrollToTop'

function App() {

  const {user} = useContext(context)

  return (
    <div className='App'>
      <Router>
        <NavbarBoot />
        <ScrollToTop />
        <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/compose' element={user ? <Compose /> : <Register /> } />
        <Route path='/posts/:postId' element={<Single />} />
        <Route path='/settings' element={user ? <Settings /> : <Register />} />
        <Route path='/login' element={user ? <Homepage /> : <Login />} />
        <Route path='/register' element={user ? <Login /> : <Register />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
