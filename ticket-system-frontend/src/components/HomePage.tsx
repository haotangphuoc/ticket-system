
import ManageClientPage from "./ManageClientPage";
import NavBar from "./NavBar";
// import TicketInfoTab from "./TicketInfoTab"
// import TicketDashboard from "./TicketDashboard"

const HomePage = () : JSX.Element => {
  return (
    <div className="">
      <NavBar/>
      
      {/* Put these in a seperate component */}
      {/* <div className="row d-flex justify-content-between">
        <div className="col-3">
          <TicketInfoTab/>
        </div>
        <div className="col-9">
          <TicketDashboard/>
        </div>
      </div> */}
      
      <ManageClientPage/>
    </div>
  )
}

export default HomePage