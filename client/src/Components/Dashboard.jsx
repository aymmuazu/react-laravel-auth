import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../Store/reducer/auth';

const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);
  const isRejected = useSelector(state => state.auth.isRejected);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch, navigate]);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout()).then(() => {
      navigate('/login')
    });
  }

  if(isRejected){
    localStorage.removeItem('accessToken');
    navigate('/login');
  }
  
  else if (userData == null && isLoading) {
    return(
      <div className='bg-white px-5 py-5'> 
        <p className='bg-gray-100 px-4 py-4 font-bold'>Loading....</p>        
      </div>
    )
  }
  else if (userData !== null && !isLoading) {
    const {name, email } = userData.data;
    return (
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        
          <div>
            <h2 className='text-2xl font-bold text-center'>Dashboard</h2>
            <p className='mt-3'>Welcome Back, {name}!</p>
            <p className='font-bold'>
              <span className='block'>{email}</span>
              <Link to="/dashboard/profile" className='bg-blue-500 px-2 py-3 mt-3 text-white font-bold rounded block text-center'>
                Edit Profile
              </Link>

              <Link to="/dashboard/password" className='bg-red-800 px-2 py-3 mt-3 text-white font-bold rounded block text-center'>
                Change Password
              </Link>


              <Link onClick={handleLogout} className='bg-red-500 px-2 py-3 mt-3 text-white font-bold rounded block text-center'>
                Logout
              </Link>
            </p>
          </div>
      
      </div>
    );
  }

};

export default Dashboard;