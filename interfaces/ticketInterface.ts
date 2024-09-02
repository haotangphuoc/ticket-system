type TicketStatus = "OPEN" | "IN PROGRESS" | "RESOLVED" | "ON HOLD" | "CANCELLED"

export interface TicketActivity {
  id: string,
  status: TicketStatus,
  comments?: string
}

export interface Ticket {
  id: string,
  title: string,
  description: string,
  senderId: string,
  receiverId: string,
  status: TicketStatus,
  startDate: string,
  endDate: string,
  activities: TicketActivity[]
}