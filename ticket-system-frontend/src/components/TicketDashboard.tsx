import { useEffect, useState } from "react"
import ticketService from "../services/ticketService"
import { Ticket } from "../../../interfaces/ticketInterface"
import '../css/TicketDashboard.css'


const TicketDashboard = () : JSX.Element => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const today = new Date()

  const isOverdue = (endDate: string): boolean => {
    const endDateObj = new Date(endDate);
    return endDateObj > today;
  }
  const endDateContainerTextColor = (endDate: string): string => {
    return isOverdue(endDate) ? 'text-danger': 'text-success'
  }
  const convertDayFormat = (date:string): string => {
    const dateObject = new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return dateObject.toLocaleDateString('en-US', options);
  }

  useEffect(() => {
    const fetchTicket = async () => {
      const result = await ticketService.getAllTickets();
      if (result instanceof Error) {
        console.log("Error")
      }
      else {
        setTickets(result)
      }
    }

    fetchTicket();
  }, [])
  
  return(
    <div className="w-100 border border-2">
      <div className="text-center my-4 fs-5 fw-bold">
        My Inbox
      </div>
      {
        <div className="ticket-dashboard">
          {tickets.map(ticket => (
            <div className="container border p-2 d-flex flex-row align-items-center justify-content-between" key={ticket.id}>
              <div className="ticket-general-info">
                <div className="fs-5 fw-bold">{ticket.sender}</div>
                <div className="fs-7 fw-bold">{ticket.title}</div>
                <div className="fw-light ticket-description text-secondary">{ticket.description}</div>
              </div>
              <div className="ticket-status d-flex flex-column justify-content-end">
                <div className={`fw-bold text-end ${endDateContainerTextColor(ticket.endDate)}`}>{convertDayFormat(ticket.endDate)}</div>
                <div className="fs-6 text-end text-secondary ">{ticket.status}</div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default TicketDashboard
