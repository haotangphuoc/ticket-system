import { Routes, Route, useMatch } from 'react-router-dom'
import { useContext } from "react";
import { Context } from "../utils/Context";

import NavBar from "./NavBar";
import TicketDetailsPage from "./TicketDetailsPage";
import UserManagePage from "./UserManagePage";
import TicketIncomingPage from './TicketIncomingPage';
import TicketOutgoingPage from './TicketOutgoingPage';

const HomePage = () : JSX.Element => {
  const { tickets } = useContext(Context);
  const match = useMatch("/tickets/:id");
  const ticket = match 
    ? tickets.find(ticket => ticket.id === match.params.id)
    : null

  return (
    <div>
      <NavBar/>
      <Routes>
      <Route path="/" element={<TicketIncomingPage/>} />
        <Route path="/outgoing-tickets" element={<TicketOutgoingPage/>} />
        <Route path="/users" element={<UserManagePage/>} />
        <Route path="/tickets/:id" element={<TicketDetailsPage ticket={ticket}/>}/>
      </Routes>
    </div>
  )
}

export default HomePage