import { useContext } from "react"
import TicketInfoTab from "./TicketInfoTab"
import { Context } from "../utils/Context"
import TicketDashboard from "./TicketDashboard";

const TicketIncomingPage = (): JSX.Element => {
  const { tickets } = useContext(Context);

  return(
    <div>
      <div className={`row d-flex justify-content-between`}>
        <div className="col-3">
          <TicketInfoTab isIncomingTickets={true}/>
        </div>
        <div className="col-9">
          <TicketDashboard tickets={tickets} label="My Inbox"/>
        </div>
      </div> 
    </div>
  )
}

export default TicketIncomingPage

