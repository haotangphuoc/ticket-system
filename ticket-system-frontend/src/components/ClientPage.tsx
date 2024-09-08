import { Link, Route, Routes } from "react-router-dom"
import TicketOutgoingPage from "./ticket/TicketOutgoingPage"
import TicketDetailsPage from "./ticket/TicketDetailsPage"

interface ClientPageProps {
  handleLogout: (e: React.SyntheticEvent) => void
}

const ClientPage = ({handleLogout}: ClientPageProps): JSX.Element => {
  return(
    <div>
      {/* Navbar */}
      <div className="bg-primary p-4 d-flex align-items-end justify-content-between">
        <Link className="nav-link fw-bolder fs-1 text-light" to="/homepage">Ticket 4me</Link>
        <a className="nav-link fs-5 text-light" aria-disabled="true" onClick={(e) => handleLogout(e)}><u>Log out</u></a>
      </div>
      <Routes>
        <Route path="/homepage" element={<TicketOutgoingPage/>} />
        <Route path="/tickets/:ticketDirection/:id" element={<TicketDetailsPage/>}/>
      </Routes>
    </div>
  )
}

export default ClientPage;