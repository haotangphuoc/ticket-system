import axios from 'axios';
import { TicketGetByIdFields, TicketPostParams } from '../interfaces/ticketInterface';

const baseUrl = "http://localhost:3000/api/tickets";
const token = window.localStorage.getItem("ticket4MeToken");

const getTicketById = async (ticketId: string): Promise<TicketGetByIdFields> => {
  const res = await axios.get(`${baseUrl}/${ticketId}`);
  console.log(res.data)
  return res.data;
}

const createTicket = async (ticketData: TicketPostParams) => {
  if(!token) {
    throw new Error("Internal server error!")
  }

  const header = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  const res = await axios.post(baseUrl, ticketData, header);
  return res.data;
}

export default { getTicketById, createTicket }