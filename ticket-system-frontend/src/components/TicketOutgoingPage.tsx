import TicketInfoTab from "./TicketInfoTab";
import TicketDashboard from "./TicketDashboard";
import { useContext, useState } from "react";
import TicketAddForm from "./TicketAddForm";
import { Context } from "../utils/Context";

const TicketOutgoingPage = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false);
  const { tickets } = useContext(Context);

  const handleAddTicket = () => {
    setShowForm(!showForm);
  };

  return(
    <div>
      {showForm && <TicketAddForm handleAddTicket={handleAddTicket}/>}
      <div className={`row d-flex justify-content-between ${showForm ? "client-dashboard-overlay" : ""}`}>
        <div className="col-3">
          <TicketInfoTab handleAddTicket={handleAddTicket} isIncomingTickets={false}/>
        </div>
        <div className="col-9">
          <TicketDashboard tickets={tickets} label="My Tickets"/>
        </div>
      </div> 
    </div>
  );
}

export default TicketOutgoingPage;