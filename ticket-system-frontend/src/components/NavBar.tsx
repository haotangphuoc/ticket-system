import '../css/Homepage.css'

const NavBar = (): JSX.Element => {
  return (
    <div className="nav-bar-container ">
      <ul className="nav d-flex align-items-end justify-content-between">
        <li className="nav-item">
          <a className="nav-link fw-bolder fs-5" aria-current="page" href="#">Ticket4Me</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Clients</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Statistics</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Logout</a>
        </li>
      </ul>
    </div>
  )
}

export default NavBar