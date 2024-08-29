import TicketInfoTab from "./TicketInfoTab";
import TicketDashboard from "./TicketDashboard";
import { useState } from "react";
import AddTicketForm from "./AddTicketForm";

const ManageTicketPage = (): JSX.Element => {
  const [showForm, setShowForm] = useState(false);

  const handleAddTicket = () => {
    setShowForm(!showForm);
  };

  return(
    <div>
      <div className={`row d-flex justify-content-between ${showForm ? "client-dashboard-overlay" : ""}`}>
        <div className="col-3">
          <TicketInfoTab handleAddTicket={handleAddTicket}/>
        </div>
        <div className="col-9">
          <TicketDashboard/>
        </div>
      </div> 

      {showForm && <AddTicketForm handleAddTicket={handleAddTicket}/>}
    </div>
    
  );
}

export default ManageTicketPage;