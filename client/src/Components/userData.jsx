import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../Store/reducer/auth';
import { useNavigate } from 'react-router-dom';

const useUserData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRejected = useSelector(state => state.auth.isRejected)

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch, navigate]);

  if(isRejected){
    localStorage.removeItem('accessToken');
    navigate('/login');
  }
  
}

export default useUserData;
