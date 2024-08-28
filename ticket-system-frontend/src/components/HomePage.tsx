import TicketDashboard from "./TicketDashboard"
import NavBar from "./NavBar"
import TicketInfoTab from "./TicketInfoTab"

const HomePage = () : JSX.Element => {
  return (
    <div className="">
      <NavBar/>
      <div className="row d-flex justify-content-between">
        <div className="col-3">
          <TicketInfoTab/>
        </div>
        <div className="col-9">
          <TicketDashboard/>
        </div>
      </div>
    </div>
  )
}

export default HomePage