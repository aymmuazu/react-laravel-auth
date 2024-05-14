import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Register from './Components/Register'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile'
import Password from './Components/Password'

function App() {
  return (
    <div className='bg-gray-100 flex justify-center items-center h-screen'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/profile' element={<Profile />} />
          <Route path='/dashboard/password' element={<Password />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
