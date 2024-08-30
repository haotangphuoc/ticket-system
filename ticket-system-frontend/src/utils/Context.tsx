import { createContext, useEffect, useState } from "react";
import ticketService from "../services/ticketService";
import { ReactNode } from "react";
import { Ticket } from "../../../interfaces/ticketInterface";

export const Context = createContext({ tickets: [] as Ticket[] });

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTicket = async () => {
      const result = await ticketService.getAllTickets();
      if (result instanceof Error) {
        console.log("Error");
      }
      else {
        setTickets(result);
      }
    }
    fetchTicket();
  }, []);

  return(
    <Context.Provider value={{ tickets: tickets }}>
      {children}
    </Context.Provider>
  )
}