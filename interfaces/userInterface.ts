import { Ticket } from "./ticketInterface"

export type UserRole = "CLIENT" | "ADMINISTRATOR";

export interface User {
  id: string,
  name: string,
  email: string,
  tickets: Ticket[],
  role: UserRole
}

