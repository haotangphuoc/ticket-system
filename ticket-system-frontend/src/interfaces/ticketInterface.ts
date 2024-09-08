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

export interface TicketGetByIdFields {
  id: string,
  title: string,
  description: string,
  sender: { id: string, email: string},
  receiver: { id: string, email: string},
  activities: TicketActivity[],
  startDate: string,
  endDate: string
}
 
export interface TicketPostParams {
  title: string,
  description: string,
  senderId: string,
  receiverEmail: string,
  startDate: string,
  endDate: string
}


