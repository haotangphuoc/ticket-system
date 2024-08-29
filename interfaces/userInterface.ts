import { Ticket } from "./ticketInterface"

export interface User {
  id: string,
  name: string,
  email: string,
  tickets: Ticket[],
  role: "CLIENT" | "ADMINISTRATOR"
}

