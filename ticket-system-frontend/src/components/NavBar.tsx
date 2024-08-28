import '../css/Homepage.css'

const NavBar = (): JSX.Element => {
  return (
    <div className="nav-bar-container bg-primary p-2">
      <ul className="nav d-flex align-items-end justify-content-between">
        <li className="nav-item">
          <a className="nav-link fw-bolder fs-3 text-light" aria-current="page" href="#">Ticket4Me</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Clients</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Statistics</a>
        </li>
        <li className="nav-item ">
          <a className="nav-link disabled fw-bolder text-light border" aria-disabled="true">Logout</a>
        </li>
      </ul>
    </div>
  )
}

export default NavBar