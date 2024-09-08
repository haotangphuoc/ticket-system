import { useEffect } from "react";
import { useSetTicketFilter } from "../../utils/contextCustomHooks"
import { useLocation } from "react-router-dom";

interface TicketDashboardProps {
  handleAddTicket?: () => void,
  ticketDirection: "INCOMING" | "OUTGOING"
}

const TicketInfoTab = ({ handleAddTicket, ticketDirection }: TicketDashboardProps): JSX.Element => {
  const setTicketFilter = useSetTicketFilter();
  const location = useLocation();

  // Reset the filter when navigating to a new page
  useEffect(() => {
    setTicketFilter('');
  }, [location, setTicketFilter]);

  return (
    <div className={`container d-flex flex-column ps-4 vh-100`}>
      {/* Only show add ticket button for ticket manage page */}
      {ticketDirection === "OUTGOING" && (
        <div className="m-4 btn btn-primary mx-2" onClick={handleAddTicket}>+ Add ticket</div>
      )}
      
      <div className="mb-4 mt-5 fs-5 fw-bold d-flex justify-content-center">Statuses</div>
      <br />
      <a className="text-dark" onClick={() => setTicketFilter('')}>All tickets</a>
      <br />
      <a className="text-dark" onClick={() => setTicketFilter('OPEN')}>Open</a>
      <a className="text-dark" onClick={() => setTicketFilter('IN PROGRESS')}>In progress</a>
      <a className="text-dark" onClick={() => setTicketFilter('RESOLVED')}>Resolved</a>
      <a className="text-dark" onClick={() => setTicketFilter('ON HOLD')}>On hold</a>
      <a className="text-dark" onClick={() => setTicketFilter('CANCELLED')}>Cancelled</a>
    </div>
  )
}

export default TicketInfoTab