import { Routes, Route, useMatch } from 'react-router-dom'
import { useContext } from "react";
import { Context } from "../utils/Context";

import NavBar from "./NavBar";
import TicketDetailsPage from "./TicketDetailsPage";
import UserManagePage from "./UserManagePage";
import TicketIncomingPage from './TicketIncomingPage';
import TicketOutgoingPage from './TicketOutgoingPage';
import { UserRole } from '../../../interfaces/userInterface';


const HomePage = () : JSX.Element => {
  const role: UserRole = "CLIENT";
  const isClientView = role === "CLIENT";

  const { tickets } = useContext(Context);
  const match = useMatch("/tickets/:id");
  const ticket = match 
    ? tickets.find(ticket => ticket.id === match.params.id)
    : null

  return (
    <div>
      <NavBar isClientView={isClientView}/>
      {
        isClientView 
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