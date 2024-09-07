import '../css/Homepage.css';
import { Link, Navigate } from 'react-router-dom'
import { useUser } from '../utils/customHooks';

const NavBar = (): JSX.Element => {
  const user = useUser();
  if(!user) {
    return <Navigate to="/login"/>
  }
  const linkClassAttributes = "nav-link fs-5 text-light";

  const handleLogout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      console.log("User confirmed logout.");
    } else {
      console.log("User canceled logout.");
    }
  }

  return (
    <div>
      {
        user.role === "CLIENT"
        ? <div className="bg-primary p-4 d-flex align-items-end justify-content-between">
            <Link className="nav-link fw-bolder fs-1 text-light" to="/">Ticket 4me</Link>
            <a className={linkClassAttributes} aria-disabled="true" onClick={(e) => handleLogout(e)}><u>Log out</u></a>
          </div>
        : <div className="bg-primary p-4 d-flex align-items-end justify-content-between">
            <Link className="nav-link fw-bolder fs-1 text-light" to="/">Ticket 4me</Link>
            <Link className={linkClassAttributes} to="/users">Users</Link>
            <Link className={linkClassAttributes} to="/outgoing-tickets">My tickets</Link>
            <a className={linkClassAttributes} aria-disabled="true" onClick={(e) => handleLogout(e)}><u>Log out</u></a>
          </div>
      }
    </div>
  );
}

export default NavBar;