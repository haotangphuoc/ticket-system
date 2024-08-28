import '../css/LoginPage.css'

const LoginPage = () : JSX.Element => {
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
          <form>
            <div className="mb-3">
              <p className="htmlForm-label mb-0">Email address:</p>
              <input type="email" className="htmlForm-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <p className="htmlForm-label mb-0">Password:</p>
              <input type="password" className="htmlForm-control" id="exampleInputPassword1"/>
            </div>

            <button type="submit" className="btn btn-primary w-100 rounded-pill">Submit</button>
          </form>
        </div>
        
      </div>
    </div>
    
  )
}

export default LoginPage