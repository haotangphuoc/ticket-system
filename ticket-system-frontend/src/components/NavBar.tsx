import '../css/Homepage.css';

const NavBar = (): JSX.Element => {
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
    <div className="nav-bar-container bg-primary p-2">
      <ul className="nav d-flex align-items-end justify-content-between">
        <li className="nav-item">
          <a className="nav-link fw-bolder fs-3 text-light" aria-current="page" href="#">Ticket4Me</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Users</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Tickets</a>
        </li>
        <li className="nav-item ">
          <a className="nav-link fw-bolder text-light " aria-disabled="true" onClick={(e) => handleLogout(e)}><u>Log out</u></a>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;