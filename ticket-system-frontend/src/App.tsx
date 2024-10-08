import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'
import HomePage from './components/HomePage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ContextProvider } from './utils/Context';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { ProtectedRoute } from './utils/ProtectedRoutes';
import Alert from './components/Alert';

function App() {
  return (
    <div>
      <ContextProvider>
        <Alert/>
        < Router>
          <div className='app'>
            <Routes>
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage/>} />
              <Route element={<ProtectedRoute/>}>
              <Route path="/*" element={<HomePage/>} />
              </Route>
            </Routes>
          </div>
        </Router>
      </ContextProvider>
    </div>
  )
}

export default App
