import axios from 'axios';
import { Ticket } from '../../../interfaces/ticketInterface'

const baseUrl = "http://localhost:3000/tickets";

const getAllTickets = async () : Promise<Ticket[] | Error> => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
    return new Error(error.message); 
    } else {
      return new Error('An unknown error occurred');
    }
  }
}

const createTicket = async (ticketData: Omit<Ticket, 'id' | 'sender' | 'status' | 'startDate' | 'activities'>) => {
  try {
    const newTicket: Ticket = {
      id: String(Math.floor(Math.random() * 100000)),
      sender: "sophia@example.com", // fetch current user and add it here
      status: "OPEN",
      activities: [],
      startDate: new Date().toISOString().split('T')[0],
      ...ticketData
    };
    const res = await axios.post(baseUrl, newTicket);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(error.message); 
    } else {
      return new Error('An unknown error occurred');
    }
  }
}

export default { getAllTickets, createTicket }