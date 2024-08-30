import NavBar from "./NavBar";
import { Routes, Route, useMatch } from 'react-router-dom'
import TicketDetailsPage from "./TicketDetailsPage";
import TicketManagePage from "./TicketManagePage";
import UserManagePage from "./UserManagePage";
import { useContext } from "react";
import { Context } from "../utils/Context";

const HomePage = () : JSX.Element => {
  const { tickets } = useContext(Context);
  const match = useMatch("/tickets/:id");
  const ticket = match 
    ? tickets.find(ticket => ticket.id === match.params.id)
    : null

  return (
    <div className="">
        <NavBar/>
        <Routes>
          <Route path="/notes" element={<TicketDetailsPage ticket={ticket}/>} />
          <Route path="/users" element={<UserManagePage/>} />
          <Route path="/" element={<TicketManagePage/>} />
          <Route path="/tickets/:id" element={<TicketDetailsPage ticket={ticket}/>}/>
        </Routes>
    </div>
  )
}

export default HomePage