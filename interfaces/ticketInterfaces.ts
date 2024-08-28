export interface Ticket {
  id: string,
  title: string,
  description: string,
  sender: string,
  receiver: string,
  status: "OPEN" | "IN PROGRESS" | "RESOLVED" | "REOPENDED" | "ON HOLD" | "CANCELLED",
  startDate: string,
  endDate: string
}