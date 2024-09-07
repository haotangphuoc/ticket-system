import { useState } from 'react';
import '../css/LoginPage.css'
import { useSetUser } from '../utils/customHooks';
import authenticationService from '../services/authenticationService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () : JSX.Element => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const setUser = useSetUser();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const result = await authenticationService.login({email, password,})
      if (!result || !('user' in result)) {
        throw new Error("Internal error occurred!");
      }
      setUser(result.user)
      setEmail('')
      setPassword('')
      navigate('/');
      console.log("successful")
    } catch(error) {
      console.log(error)
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
          <form onSubmit={handleSubmit}>
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
        </div>
        
      </div>
    </div>
    
  )
}

export default LoginPage