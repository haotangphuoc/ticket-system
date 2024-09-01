import '../css/Homepage.css';
import { Link } from 'react-router-dom'
import { useUserRole } from '../utils/customHooks';

const NavBar = (): JSX.Element => {
  const userRole = useUserRole();
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
        userRole === "CLIENT"
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