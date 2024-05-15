import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const AppTitle = ({ title }) => {
   const dispatch = useDispatch();
   useEffect(() => {
    const app_name = process.env.APP_NAME;
    document.title = `${title} | ${app_name}`;
  }, [dispatch])
}

export default AppTitle;
