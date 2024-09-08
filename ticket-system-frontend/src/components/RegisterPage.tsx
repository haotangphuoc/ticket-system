import { Link, useNavigate } from 'react-router-dom';
import '../css/LoginPage.css'
import { useState } from 'react';
import authenticationService from '../services/authenticationService';
import { useSetAlert } from '../utils/contextCustomHooks';
import { AxiosError } from 'axios';


const RegisterPage = () : JSX.Element => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const setAlert = useSetAlert();
  const navigate = useNavigate();

  const validatePassword = (password: string): boolean => {
    // Check password length, number, and special character
    const minLength = 8;
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasNumber && hasSpecialChar;
  };

  const handleRegister = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!validatePassword(password)) {
      setAlert('Password must be at least 8 characters long and include at least one number and one special character.');
      return;
    }

    if (password !== confirmPassword) {
      setAlert('Passwords do not match.');
      return;
    }

    try {
      const result = await authenticationService.register({email:email, password: password});
      if (!result || !('user' in result)) {
        throw new Error("Internal error occurred!");
      }
      console.log("hello");
      setAlert('Registered successfully, please login!');
      navigate("/login");
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
          <h1 className='login-label'>Register</h1>
          </div>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <p className="htmlForm-label mb-0">Email address:</p>
              <input type="email" className="htmlForm-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
              <p className="htmlForm-label mb-0">Password:</p>
              <input type="password" className="htmlForm-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="mb-3">
              <p className="htmlForm-label mb-0">Re-enter Password:</p>
              <input type="password" className="htmlForm-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 rounded-pill">Submit</button>
          </form>
          <br />
          <Link to="/login">Already have an account? Log in</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;