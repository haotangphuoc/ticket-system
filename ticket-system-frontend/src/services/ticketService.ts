import axios from 'axios';
import { Ticket } from '../../../interfaces/ticketInterfaces'

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

export default { getAllTickets }