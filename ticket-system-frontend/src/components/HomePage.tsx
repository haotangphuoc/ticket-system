import { useSetAlert} from '../utils/contextCustomHooks';
import ClientPage from './ClientPage';
import AdministratorPage from './AdministratorPage';
import { useNavigate } from 'react-router-dom';
import '../css/Homepage.css';
import { useEffect, useState } from 'react';
import userService from '../services/userService';
import { AxiosError } from 'axios';


const HomePage = () : JSX.Element => {
  const currentUserId = window.localStorage.getItem('currentUserId');
  const setAlert = useSetAlert();
  const navigate = useNavigate();
  const [currentUserRole, setCurrentUserRole] = useState('')

  const handleLogout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      window.localStorage.removeItem('ticket4MeToken');
      window.localStorage.removeItem('currentUserId');
      window.localStorage.removeItem('currentUserOrganizationId');
    }
    navigate('/login');
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if(!currentUserId) {
          throw new Error('Internal server error');
        }
        const res = await userService.getUserById(currentUserId);
        setCurrentUserRole(res.role);
      } catch(error) {
        if(error instanceof AxiosError) {
          setAlert(error.response?.data.message || "An unknown error occured!");
        }
        else {
          setAlert("An unknown error occured!");
        }
      }
    }

    fetchUser();
  }, [currentUserId, setAlert])
  return (
    <div>
      {
        currentUserRole === "CLIENT" ? <ClientPage handleLogout={handleLogout}/> : <AdministratorPage handleLogout={handleLogout}/>
      }
    </div>
  )
}

export default HomePage