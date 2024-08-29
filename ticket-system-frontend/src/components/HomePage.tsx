
import ManageUserPage from "./ManageUserPage";
import ManageTicketPage from "./ManageTicketPage";
import NavBar from "./NavBar";

const HomePage = () : JSX.Element => {
  return (
    <div className="">
      <NavBar/>
      {/* <ManageUserPage/> */}
      <ManageTicketPage/>
    </div>
  )
}

export default HomePage