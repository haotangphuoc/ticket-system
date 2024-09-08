import { Link, Route, Routes } from "react-router-dom"
import TicketOutgoingPage from "./ticket/TicketOutgoingPage"
import TicketIncomingPage from "./ticket/TicketIncomingPage"
import UserManagePage from "./user/UserManagePage"
import TicketDetailsPage from "./ticket/TicketDetailsPage"


interface AdministratorPageProps {
  handleLogout: (e: React.SyntheticEvent) => void
}

const AdministratorPage = ({handleLogout}: AdministratorPageProps): JSX.Element => {
  return(
    <div>
      {/* Navbar */}
      <div className="bg-primary p-4 d-flex align-items-end justify-content-between">
        <Link className="nav-link fw-bolder fs-1 text-light" to="/homepage">Ticket 4me</Link>
        <Link className="nav-link fs-5 text-light" to="/users">Users</Link>
        <Link className="nav-link fs-5 text-light" to="/outgoing-tickets">My tickets</Link>
        <a className="nav-link fs-5 text-light" aria-disabled="true" onClick={(e) => handleLogout(e)}><u>Log out</u></a>
      </div>
      <Routes>
        <Route path="/homepage" element={<TicketIncomingPage/>} />
        <Route path="/outgoing-tickets" element={<TicketOutgoingPage/>} />
        <Route path="/users" element={<UserManagePage/>} />
        <Route path="/tickets/:ticketDirection/:id" element={<TicketDetailsPage/>}/>
      </Routes>
    </div>
  )
}

export default AdministratorPage;