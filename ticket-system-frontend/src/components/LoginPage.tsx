import { useState } from 'react';
import '../css/LoginPage.css'
import { useSetAlert } from '../utils/contextCustomHooks';
import authenticationService from '../services/authenticationService';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const LoginPage = () : JSX.Element => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();
  const setAlert = useSetAlert();

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const result = await authenticationService.login({email, password});
      window.localStorage.setItem('ticket4MeToken', result.token);
      window.localStorage.setItem('currentUserId', result.user.id);
      window.localStorage.setItem('currentUserOrganizationId', result.user.organizationId);
      setEmail('');
      setPassword('');
      navigate('/homepage');
      setAlert("Logged in successfully!");
    } catch(error) {
      if (error instanceof AxiosError) {
        setAlert(error.response?.data.message || 'An unknown error occurred');
      } else {
        setAlert('An unknown error occurred');
      }
    }
  }
  
  return(
    <div id="login-page">
      <div className='website-name-container'>
        <h1 className='text-white website-name'>Ticket4Me</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container shadow d-flex flex-column justify-content-center align-items-center py-4" id="login-form-container">
          <div className='mb-2'>
          <h1 className='login-label'>Sign In</h1>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <p className="htmlForm-label mb-0">Email address:</p>
              <input type="email" className="htmlForm-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
              <p className="htmlForm-label mb-0">Password:</p>
              <input type="password" className="htmlForm-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary w-100 rounded-pill">Submit</button>
          </form>
          <br />
          <Link to="/register">Dont have an account? Register here</Link>
        </div>
        
      </div>
    </div>
  )
}

export default LoginPage