import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom' 
import { register } from '../Store/reducer/auth';

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorPending, setErrorPending] = useState(false)
  const [buttonMessage, setButtonMessage] = useState('Register');
  const [disabledButton, setDisableButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault('disabled');

    setButtonMessage('Processing...');
    setDisableButton(true);
    
    if (name == '' || email == '' || password == '') {
        setError(true);
        setErrorMessage('All fields are required.');
        setButtonMessage('Register');
        setDisableButton(false);
        setTimeout(() => {
            setError(false);
        }, 1000);

        return;
    }
    else{

        dispatch(register({ name, email, password })).then((action) => {

          switch (action.type) {
            case register.rejected.type:
              setErrorPending(false);
              setError(true);
              setErrorMessage('Something went wrong.');
              setButtonMessage('Register');
              setDisableButton(false);
              break;

            case register.pending.type:
              setErrorPending(true);
              break;

            case register.fulfilled.type:
              setErrorPending(false);
              setSuccess(true);
              setSuccessMessage('You are now registered successfully.');
              setButtonMessage('Register');
              setTimeout(() => {
                navigate('/login');
              }, 1000);
              break;
          
            default:
              break;
          }

        })

    }

  }


  return (
    <div className='bg-white py-4 px-4 rounded'>
      <h2 className='text-center text-3xl font-bold'>Register</h2>

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
        <div>
            <label htmlFor="">Name</label>
            <input type="text" onChange={(e) => setName(e.target.value)} className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        </div>

        <div className='mt-2'>
            <label htmlFor="">EMail</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        </div>

        <div className='mt-2'>
            <label htmlFor="">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>

        <div className='mt-2'>
            <button type='submit' disabled={ disabledButton && true } className='bg-blue-500 px-2 py-4 text-white rounded font-bold w-full hover:bg-blue-700'>
                {buttonMessage}
            </button>
        </div>

        <p className='mt-2 mb-2'>
            Already have an account ? <Link to='/login' className='text-blue-700'>Login</Link>
        </p>

        <hr />
        <p className='text-center text-sm'>Go back <Link to='/' className='text-red-600'>Home</Link></p>
      </form>
    </div>
  )
}

export default Register
