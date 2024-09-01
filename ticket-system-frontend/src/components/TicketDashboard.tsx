import { Link } from "react-router-dom";
import "../css/TicketDashboard.css";
import { useTickets } from "../utils/customHooks";

interface TicketDashboardProps {
  infoTabType : "INCOMING" | "OUTGOING"
}

const TicketDashboard = ({ infoTabType }: TicketDashboardProps) : JSX.Element => {
  const today = new Date();
  const tickets = useTickets();

  const isOverdue = (endDate: string): boolean => {
    const endDateObj = new Date(endDate);
    return endDateObj > today;
  }
  const endDateContainerTextColor = (endDate: string): string => {
    return isOverdue(endDate) ? 'text-success': 'text-danger'
  }
  const convertDayFormat = (date:string): string => {
    const dateObject = new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return dateObject.toLocaleDateString('en-US', options);
  }
  
  return(
    <div className="w-100 border border-2">
      <div className="text-center my-4 fs-3 fw-bold">
        {(infoTabType === "INCOMING") ? "My Inbox" : "My Tickets"}
      </div>
      {
        <div className="ticket-dashboard">
          {tickets.map(ticket => (
            <div key={ticket.id}>
              <Link to={`/tickets/${ticket.id}`} className="text-decoration-none">
                <div className="container border p-2 d-flex flex-row align-items-center justify-content-between custom-hover" onClick={() => console.log("helo")}>
                  <div className="ticket-general-info">
                    <div className="fs-5 fw-bold">{ticket.title}</div>
                    <div className="fs-7 fw-bold text-secondary">{ticket.sender}</div>
                    <div className="fw-light ticket-description text-secondary">{ticket.description}</div>
                  </div>
                  <div className="ticket-status d-flex flex-column justify-content-end">
                    <div className={`fw-bold text-end ${endDateContainerTextColor(ticket.endDate)}`}>{convertDayFormat(ticket.endDate)}</div>
                    <div className="fs-6 text-end text-secondary ">{ticket.status}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      }
    </div>
  );
}

export default TicketDashboard;
