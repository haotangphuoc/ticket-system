import TicketInfoTab from "./TicketInfoTab";
import TicketDashboard from "./TicketDashboard";
import { useState } from "react";
import TicketAddForm from "./TicketAddForm";

const TicketManagePage = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false);

  const handleAddTicket = () => {
    setShowForm(!showForm);
  };

  return(
    <div>
      {showForm && <TicketAddForm handleAddTicket={handleAddTicket}/>}

      <div className={`row d-flex justify-content-between ${showForm ? "client-dashboard-overlay" : ""}`}>
        <div className="col-3">
          <TicketInfoTab handleAddTicket={handleAddTicket}/>
        </div>
        <div className="col-9">
          <TicketDashboard/>
        </div>
      </div> 
    </div>
    
  );
}

export default TicketManagePage;