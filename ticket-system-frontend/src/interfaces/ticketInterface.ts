export type TicketStatus = "OPEN" | "IN PROGRESS" | "RESOLVED" | "ON HOLD" | "CANCELLED"

export interface TicketActivity {
  id: string,
  status: TicketStatus,
  comment: string
}

export interface TicketActivityPostParams {
  status: TicketStatus,
  comment?: string
}

export interface TicketPostParams {
  title: string,
  description: string,
  senderId: string,
  receiverId: string,
  startDate: string,
  endDate: string
}


