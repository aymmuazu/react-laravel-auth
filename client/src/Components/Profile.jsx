import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../Store/reducer/auth';
import { updateprofile } from '../Store/reducer/profile';
import Logout from './Logout';
import AppTitle from './AppTitle';
import useUserData from './userData';

const Profile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  AppTitle({ title: 'Profile' })
  useUserData();

  const userData = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);
  
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [inputname, setName] = useState('');
  const [inputemail, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [errorPending, setErrorPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEditProfile = (e) => {
    e.preventDefault();
    setIsEditProfile(true)
    setName(userData.data.name);
    setEmail(userData.data.email)
    
  }

  const handleSubmitEditProfile = (e) => {
    e.preventDefault();
    
    if (inputname == '' || inputemail == '') {
      setError(true);
      setErrorMessage('All fields are required.')

      setTimeout(() => {
        setError(false);
      }, 1000);
      return;
    }

    dispatch(updateprofile({ inputname, inputemail })).then((action) => {
      switch (action.type) {
        case updateprofile.rejected.type:
          setError(true);
          setErrorMessage('Cannot update profile.');
          break;

        case updateprofile.pending.type:
          errorPending(true);
          break;

        case updateprofile.fulfilled.type:
          setError(false);
            setSuccess(true);
            setSuccessMessage(action.payload.message)
            setTimeout(() => {
              navigate('/dashboard');
            }, 1500);
          break;
      
        default:
          navigate('/');
          break;
      }
    });
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
              <span className='block'>Joined ({created_at})</span>

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

              {isEditProfile && (
                <div className='mt-3'>
                  <form onSubmit={handleSubmitEditProfile}>
                    <div>
                      <label htmlFor="">Name</label>
                      <input type="text" onChange={(e) => setName(e.target.value)} value={inputname} className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    <div className='mt-2'>
                      <label htmlFor="">Email</label>
                      <input type="text" onChange={(e) => setEmail(e.target.value)} value={inputemail} className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>

                    <div className='mt-2'>
                      <button className='px-2 py-2 bg-blue-700 rounded text-white hover:bg-blue-500 w-full'>Update</button>
                    </div>
                    <hr />
                  </form>
                </div>
              )}
             
              <Link to="/dashboard/password" onClick={handleEditProfile} className='bg-blue-800 px-2 py-3 mt-3 text-white font-bold rounded block text-center'>
                Edit Profile
              </Link>

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

export default Profile;