import { Link } from "react-router-dom";
import "../../css/TicketDashboard.css";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { AxiosError } from "axios";
import { useSetAlert, useTicketsRefetchFlag } from "../../utils/contextCustomHooks";
import { UserIncomingTicket, UserOutgoingTicket } from "../../interfaces/userInterface";

interface TicketDashboardProps {
  ticketDirection : "INCOMING" | "OUTGOING"
}

const TicketDashboard = ({ ticketDirection }: TicketDashboardProps) : JSX.Element => {
  const today = new Date();
  const currentUserId = window.localStorage.getItem('currentUserId');
  const [tickets, setTickets] = useState<UserIncomingTicket[] | UserOutgoingTicket[]>([]);
  const setAlert = useSetAlert();
  const ticketsRefetchFlag = useTicketsRefetchFlag();

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

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (!currentUserId) {
          setAlert('Internal server error!');
          throw new Error('Internal server error!');
        }
        console.log(ticketDirection)
        if(ticketDirection === "INCOMING") {
          const res = await userService.getUserIncomingTickets(currentUserId);
          console.log(res)
          setTickets(res);
        } 
        else {
          const res = await userService.getUserOutgoingTickets(currentUserId);
          setTickets(res);
        }
      } catch(error) {
        if(error instanceof AxiosError) {
          setAlert(error.response?.data.message || "An unknown error occured!");
        }
        else {
          setAlert("An unknown error occured!");
        }
      }
    } 

    fetchTickets();
  }, [currentUserId, ticketDirection, setAlert, ticketsRefetchFlag])
  
  return(
    <div className="w-100 vh-100 border border-2">
      <div className="text-center my-4 fs-3 fw-bold">
        {(ticketDirection === "INCOMING") ? "My Inbox" : "My Tickets"}
      </div>
      {
        <div className="ticket-dashboard">
          { tickets.length === 0
            ? <div className="text-center text-danger">No ticket to display</div>
            : tickets.map(ticket => (
                <div key={ticket.id}>
                  <Link to={`/tickets/${ticketDirection}/${ticket.id}`} className="text-decoration-none">
                    <div className="container border p-2 d-flex flex-row align-items-center justify-content-between custom-hover">
                      <div className="ticket-general-info">
                        <div className="fs-5 fw-bold">{ticket.title}</div>
                        <div className="fs-7 fw-bold text-secondary">
                          {
                            'sender' in ticket
                              ? ticket.sender.email
                              : ticket.receiver.email
                          }
                        </div>
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
