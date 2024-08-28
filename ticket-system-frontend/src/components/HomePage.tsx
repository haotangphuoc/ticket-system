import TicketDashboard from "./TicketDashboard"
import NavBar from "./NavBar"

const HomePage = () : JSX.Element => {
  return (
    <div className="">
      <NavBar/>
      <div>

        <TicketDashboard/>
      </div>
    </div>
  )
}

export default HomePage