import { useSetAlert} from '../utils/contextCustomHooks';
import ClientPage from './ClientPage';
import AdministratorPage from './AdministratorPage';
import { useNavigate } from 'react-router-dom';
import '../css/Homepage.css';


const HomePage = () : JSX.Element => {
  const currentUserRole = window.localStorage.getItem('currentUserRole');
  const setAlert = useSetAlert();
  const navigate = useNavigate();

  if(!currentUserRole) {
    setAlert('Internal server error!');
  }

  const handleLogout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('currentUserId');
      window.localStorage.removeItem('currentUserRole');
    }
    navigate('/login');
  }
  return (
    <div>
      {
        currentUserRole === "CLIENT" ? <ClientPage handleLogout={handleLogout}/> : <AdministratorPage handleLogout={handleLogout}/>
      }
    </div>
  )
}

export default HomePage