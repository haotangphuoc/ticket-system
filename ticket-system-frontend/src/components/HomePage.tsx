
import UserManagePage from "./UserManagePage";
import TicketManagePage from "./TicketManagePage";
import NavBar from "./NavBar";
import TicketDetailsPage from "./TicketDetailsPage";

const HomePage = () : JSX.Element => {
  return (
    <div className="">
      <NavBar/>
      {/* <UserManagePage/> */}
      <TicketManagePage/>
      {/* <TicketDetailsPage/> */}
    </div>
  )
}

export default HomePage