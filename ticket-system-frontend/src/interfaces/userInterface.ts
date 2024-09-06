import { TicketActivity, TicketStatus } from "./ticketInterface";

export type UserRole = "CLIENT" | "ADMINISTRATOR";

export interface UserGetByIdParams {
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

export interface UserOutgoingTicketGetParams {
  id: string,
  title: string,
  description: string,
  status: TicketStatus,
  startDate: string,  
  endDate: string,    
  activities: TicketActivity[],
  receiverId: { id: string, email: string }
}

export interface UserIncomingTicketGetParams  {
  id: string,
  title: string,
  description: string,
  status: TicketStatus,
  startDate: string,  
  endDate: string,    
  activities: TicketActivity[],
  senderId: { id: string, email: string }
}
