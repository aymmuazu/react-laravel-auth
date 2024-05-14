import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  
  const app_name = process.env.APP_NAME;
  
  return (
    <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <h2 className='text-center text-2xl font-semibold mb-6'>Reactlaravelauth</h2>
      
      <Link to='/login' className='block bg-blue-500 text-center hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline'>Login</Link>
      <Link to='/register' className='block bg-blue-500 mt-2 text-center hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline'>Register</Link>

      <p className='mt-4'>
        <Link to='/' className='bg-red-500 text-center rounded text-white py-2 font-bold px-4 hover:bg-blue-600 block'>Home</Link>
      </p>
    </div>
  )
}

export default Home
