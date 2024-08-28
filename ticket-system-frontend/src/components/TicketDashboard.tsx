import { useEffect, useState } from "react"
import ticketService from "../services/ticketService"
import { Ticket } from "../../../interfaces/ticketInterfaces"
import '../css/Inbox.css'

const TicketDashboard = () : JSX.Element => {
  const [tickets, setTickets] = useState<Ticket[]>([])

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
    <div>
      <div className="container">
        My Inbox
      </div>
      {
        <ul>
          {tickets.map(ticket => (
            <li key={ticket.id}>{ticket.title}</li>
          ))}
        </ul>
      }
    </div>
  )
}

export default TicketDashboard

