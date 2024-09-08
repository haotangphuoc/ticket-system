import axios from 'axios';
import { TicketGetByIdFields, TicketActivityPostParams, TicketPostParams } from '../interfaces/ticketInterface';

const BASE_URL = "http://localhost:3000/api/tickets";
const token = window.localStorage.getItem("ticket4MeToken");

// Get ticket by id
const getTicketById = async (ticketId: string): Promise<TicketGetByIdFields> => {
  const res = await axios.get(`${BASE_URL}/${ticketId}`);
  console.log(res.data)
  return res.data;
}

// Create new ticker
const createTicket = async (ticketData: TicketPostParams) => {
  if(!token) {
    throw new Error("Internal server error!")
  }

  const header = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  const res = await axios.post(BASE_URL, ticketData, header);
  return res.data;
}

const createTicketActivity = async (ticketId:string, ticketActivityData: TicketActivityPostParams) => {
  if(!token) {
    throw new Error("Internal server error!")
  }

  const header = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  const res = await axios.post(`${BASE_URL}/${ticketId}/activities`, ticketActivityData, header);
  return res.data;
}


export default { getTicketById, createTicket, createTicketActivity }