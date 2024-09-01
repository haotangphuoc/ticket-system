import { createContext, useEffect, useState } from "react";
import ticketService from "../services/ticketService";
import { ReactNode } from "react";
import { Ticket } from "../../../interfaces/ticketInterface";
import { UserRole } from "../../../interfaces/userInterface";

interface ContextType {
  tickets: Ticket[],
  userRole: UserRole | null
}

export const Context = createContext<ContextType>({tickets: [], userRole: null});

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      const ticketResult = await ticketService.getAllTickets();
      if (ticketResult instanceof Error) {
        console.log("Unable to fetch tickets");
      }
      else {
        setTickets(ticketResult);
      }
    }

    fetchTicket();
    setUserRole("ADMINISTRATOR")
  }, []);

  return(
    <Context.Provider value={{tickets: tickets, userRole: userRole}}>
      {children}
    </Context.Provider>
  )
}