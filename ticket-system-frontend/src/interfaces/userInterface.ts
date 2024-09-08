import { TicketActivity, TicketStatus } from "./ticketInterface";

export type UserRole = "CLIENT" | "ADMINISTRATOR";

export interface UserGetByIdFields {
  id: string,
  name: string,
  email: string,
  organizationId: string,
  role: UserRole
}

export interface UserPostParams {
  name: string,
  email: string,
  organizationId: string,
  role: UserRole
}

export interface UserOutgoingTicket {
  id: string,
  title: string,
  description: string,
  status: TicketStatus,
  startDate: string,  
  endDate: string,    
  activities: TicketActivity[],
  receiver: { id: string, email: string }
}

export interface UserIncomingTicket  {
  id: string,
  title: string,
  description: string,
  status: TicketStatus,
  startDate: string,  
  endDate: string,    
  activities: TicketActivity[],
  sender: { id: string, email: string }
}
