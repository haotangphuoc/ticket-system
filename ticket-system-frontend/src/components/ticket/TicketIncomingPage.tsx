import TicketInfoTab from "./TicketInfoTab"
import TicketDashboard from "./TicketDashboard";

const TicketIncomingPage = (): JSX.Element => {
  return(
    <div>
      <div className={`row d-flex justify-content-between`}>
        <div className="col-3">
          <TicketInfoTab infoTabType="INCOMING"/>
        </div>
        <div className="col-9">
          <TicketDashboard dashboardType="INCOMING"/>
        </div>
      </div> 
    </div>
  )
}

export default TicketIncomingPage

