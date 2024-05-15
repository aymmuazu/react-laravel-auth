import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../Store/reducer/auth';
import { updateprofile } from '../Store/reducer/profile';
import Logout from './Logout';
import AppTitle from './AppTitle';
import useUserData from './userData';
import { updatepassword } from '../Store/reducer/password';

const Password = () => {
  AppTitle({ title: 'Password' })
  useUserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userData = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);
  const isRejected = useSelector(state => state.auth.isRejected);
  const [error, setError] = useState(false);
  const [errorPending, setErrorPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmitPassword = (e) => {
    e.preventDefault();

    if(newPassword == '' || currentPassword == '' || confirmPassword == ''){
      setError(true);
      setErrorMessage('All fields are required.');
      setTimeout(() => {
        setError(false);
      }, 1000);
    }else if (newPassword !== confirmPassword) {
      setError(true);
      setErrorMessage('New password not match with confirm');
      setTimeout(() => {
        setError(false);
      }, 1000);
    }else{

      dispatch(updatepassword({ currentPassword, newPassword, confirmPassword })).then((action) => {
        switch (action.type) {
          case updatepassword.rejected.type:
            setError(true)
            setErrorMessage(action.payload.error);
            break;

          case updatepassword.fulfilled.type:
            setError(false);
            setSuccess(true);
            setSuccessMessage(action.payload.message)
            setTimeout(() => {
              navigate('/dashboard');
            }, 1500);
            break;

          case updatepassword.pending.type:
            setErrorPending(true);
            break;
          
          default:
            break;
        }
      });

    }
    
  }

  if (userData == null && isLoading) {
    return(
      <div className='bg-white px-5 py-5'> 
        <p className='bg-gray-100 px-4 py-4 font-bold'>Loading....</p>        
      </div>
    )
  }
  
  else if (userData !== null && !isLoading) {
    const {name, email, created_at } = userData.data;

    return (
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        
          <div>
            <h2 className='text-2xl font-bold text-center'>Profile</h2>
            <p className='mt-3'>Welcome Back, {name}!</p>
            <p className='font-bold'>
              <span className='block'>{email}</span>
            </p>
          
            <div className='font-bold'>

              {errorPending && (<p className='bg-gray-100 mt-2 mb-2 font-bold text-center px-2 py-2'>Loading...</p>)}

              {error && (
                <div className='px-3 py-3 text-center rounded mt-2 mb-2 text-white font-bold bg-red-500'>
                    {errorMessage}
                </div>
              )}
              
              {success && (
                <div className='px-3 py-3 text-center rounded mt-2 mb-2 text-white font-bold bg-green-500'>
                    {successMessage}
                </div>
              )}

              <div>
                <form onSubmit={handleSubmitPassword}>
                  <div className='mt-5'>
                    <label htmlFor="">Current Password</label>
                    <input type="password" onChange={(e) => setCurrentPassword(e.target.value)} className='shadow appearance-none border rounded w-full px-3 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                  </div>
                  <div className='mt-2'>
                    <label htmlFor="">New Password</label>
                    <input type="password" onChange={(e) => setNewPassword(e.target.value)} className='shadow appearance-none border rounded w-full px-3 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                  </div>
                  <div className='mt-2'>
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className='shadow appearance-none border rounded w-full px-3 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                  </div>
                  <div className='mt-2'>
                      <button type='submit' className='bg-blue-500 px-2 py-4 text-white rounded font-bold w-full hover:bg-blue-700'>
                          Change Password
                      </button>
                  </div>
                </form>
              </div>

              <Link to="/dashboard" className='bg-red-800 px-2 py-3 mt-3 text-white font-bold rounded block text-center'>
                Dashboard
              </Link>

              <Logout />
            </div>
          </div>
      
      </div>
    );
  }

};

export default Password;