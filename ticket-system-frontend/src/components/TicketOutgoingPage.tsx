import TicketInfoTab from "./TicketInfoTab";
import TicketDashboard from "./TicketDashboard";
import TicketAddForm from "./TicketAddForm";
import { useState } from "react";

const TicketOutgoingPage = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false);

  const handleAddTicket = () => {
    setShowForm(!showForm);
  };

  return(
    <div>
      {showForm && <TicketAddForm handleAddTicket={handleAddTicket}/>}
      <div className={`row d-flex justify-content-between ${showForm ? "client-dashboard-overlay" : ""}`}>
        <div className="col-3">
          <TicketInfoTab handleAddTicket={handleAddTicket} infoTabType="OUTGOING"/>
        </div>
        <div className="col-9">
          <TicketDashboard infoTabType="OUTGOING"/>
        </div>
      </div> 
    </div>
  );
}

export default TicketOutgoingPage;