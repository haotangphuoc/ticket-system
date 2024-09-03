import axios from 'axios';
import { Ticket } from '../../../src/interfaces/ticketInterface'

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

const createTicket = async (ticketData: Omit<Ticket, 'id' | 'senderId' | 'status' | 'startDate' | 'activities'>) => {
  try {
    const newTicket: Ticket = {
      id: String(Math.floor(Math.random() * 100000)),
      senderId: "sophia@example.com", 
      status: "OPEN",
      activities: [],
      startDate: new Date().toISOString().split('T')[0],  // Implement this in the back end
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