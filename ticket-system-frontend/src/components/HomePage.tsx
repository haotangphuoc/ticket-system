import { Routes, Route, useMatch, useNavigate, Navigate } from 'react-router-dom'
import NavBar from "./NavBar";
import TicketDetailsPage from "./TicketDetailsPage";
import UserManagePage from "./UserManagePage";
import TicketIncomingPage from './TicketIncomingPage';
import TicketOutgoingPage from './TicketOutgoingPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { ProtectedRoute } from '../utils/ProtectedRoutes';
import Hello from './Hello';


const HomePage = () : JSX.Element => {

  // const match = useMatch("/tickets/:id");
  // const ticket = match 
  //   ? tickets.find(ticket => ticket.id === match.params.id)
  //   : null

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route element={<ProtectedRoute roleRequired="CLIENT"/>}>
          <Route path="/" element={<Hello/>}/>
          {/* <Route path="/" element={<TicketOutgoingPage/>} /> */}
          {/* <Route path="/tickets/:id" element={<TicketDetailsPage ticket={ticket}/>}/> */}
        </Route>
        <Route element={<ProtectedRoute roleRequired="ADMINISTRATOR"/>}>
          <Route path="/" element={<Hello/>}/>
          {/* <Route path="/" element={<TicketIncomingPage/>} />
          <Route path="/outgoing-tickets" element={<TicketOutgoingPage/>} />
          <Route path="/users" element={<UserManagePage/>} /> */}
          {/* <Route path="/tickets/:id" element={<TicketDetailsPage ticket={ticket}/>}/> */}
        </Route>
      </Routes>
      
    </div>
  )
}

export default HomePage