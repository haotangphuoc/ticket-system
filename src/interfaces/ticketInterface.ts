type TicketStatus = "OPEN" | "IN PROGRESS" | "RESOLVED" | "ON HOLD" | "CANCELLED"

export interface TicketActivity {
  id: string,
  status: TicketStatus,
  comment?: string
}

export interface Ticket {
  id: string,
  title: string,
  description: string,
  senderId: string,
  receiverId: string,
  status: TicketStatus,
  startDate: string,  // Format: YYYY-MM-DD
  endDate: string,    // Format: YYYY-MM-DD
  activities: TicketActivity[]
}

export interface TicketPOSTParams {
  title: string,
  description: string,
  receiverId: string,
  endDate: string
}