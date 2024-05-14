import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, login } from '../Store/reducer/auth';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonMessage, setButtonMessage] = useState('Login');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorPending, setErrorPending] = useState(false)
  const [disabledButton, setDisableButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email == '' || password == '') {
      setError(true);
        setErrorMessage('All fields are required.');
        setButtonMessage('Login');
        setDisableButton(false);
        setTimeout(() => {
            setError(false);
        }, 1000);

        return;
    }
    else{

      dispatch(login({ email, password })).then((action) => {
        switch (action.type) {
          case login.rejected.type:
            setErrorPending(false);
            setError(true);
            setErrorMessage('Something went wrong.');
            setButtonMessage('Login');
            setDisableButton(false);
            break;

          case login.pending.type:
            setErrorPending(true);
            break;

          case login.fulfilled.type:
            setError(false);
            setSuccess(true);
            setSuccessMessage('You are now logged in successfully.');
            setButtonMessage('Login');

            localStorage.setItem('accessToken', action.payload.accessToken);
            setTimeout(() => {
              dispatch(getCurrentUser());
              navigate('/dashboard');
            }, 1000);
            break;
        
          default:
            break;
        }
      })

    }
  }

  return (
    <div className='bg-white px-4 py-4 rounded'>
      <h2 className='text-center font-bold text-3xl'>Login</h2>
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

      <form onSubmit={handleSubmit}>
        <div className='mt-2'>
            <label htmlFor="email">EMail</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        </div>

        <div className='mt-2'>
            <label htmlFor="password">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>

        <div className='mt-2'>
            <button type='submit' className='bg-blue-500 px-2 py-4 text-white rounded font-bold w-full hover:bg-blue-700'>
                {buttonMessage}
            </button>
        </div>

        <p className='mt-2 mb-4'>
            Not yet have an account ? <Link to='/register' className='text-blue-700'>Register</Link>
        </p>
        <hr />
        <p className='text-center text-sm'>Go back <Link to='/' className='text-red-600'>Home</Link></p>
      </form>
    </div>
  )
}

export default Login
