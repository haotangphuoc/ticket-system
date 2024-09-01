import { Routes, Route, useMatch } from 'react-router-dom'
import NavBar from "./NavBar";
import TicketDetailsPage from "./TicketDetailsPage";
import UserManagePage from "./UserManagePage";
import TicketIncomingPage from './TicketIncomingPage';
import TicketOutgoingPage from './TicketOutgoingPage';
import { useTickets, useUserRole } from '../utils/customHooks';

const HomePage = () : JSX.Element => {
  const userRole = useUserRole();
  const tickets = useTickets();

  const match = useMatch("/tickets/:id");
  const ticket = match 
    ? tickets.find(ticket => ticket.id === match.params.id)
    : null

  return (
    <div>
      <NavBar/>
      {
        userRole === "CLIENT"
          ? <Routes>
              <Route path="/" element={<TicketOutgoingPage/>} />
              <Route path="/tickets/:id" element={<TicketDetailsPage ticket={ticket}/>}/>
            </Routes>
          : <Routes>
              <Route path="/" element={<TicketIncomingPage/>} />
              <Route path="/outgoing-tickets" element={<TicketOutgoingPage/>} />
              <Route path="/users" element={<UserManagePage/>} />
              <Route path="/tickets/:id" element={<TicketDetailsPage ticket={ticket}/>}/>
            </Routes>
      }
    </div>
  )
}

export default HomePage