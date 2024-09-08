import axios from 'axios';
import { UserGetByIdFields, UserIncomingTicket, UserOutgoingTicket, UserPostParams } from '../interfaces/userInterface';

const BASE_URL = "http://localhost:3000/api/users";
const token = window.localStorage.getItem('ticket4MeToken');

const getUserById = async (userId: string): Promise<UserGetByIdFields> => {
  const response = await axios.get(`${BASE_URL}/${userId}`);
  return response.data;
};

// Fetch incoming tickets for a user (administrators)
const getUserIncomingTickets = async (userId: string): Promise<UserIncomingTicket[]> => {
  const response = await axios.get(`${BASE_URL}/${userId}/incomingTickets`);
  return response.data;
};

// Fetch outgoing tickets for a user
const getUserOutgoingTickets = async (userId: string): Promise<UserOutgoingTicket[]> => {
  const response = await axios.get(`${BASE_URL}/${userId}/outgoingTickets`);
  return response.data;
};

// Create a new user 
const createUser = async (userData: UserPostParams): Promise<UserGetByIdFields> => {
  if(!token) {
    throw new Error("Internal server error!")
  }

  const header = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  
  const response = await axios.post(BASE_URL, userData, header);
  return response.data;
};

// Delete user by Id
const deleteUser = async (userId: string): Promise<UserGetByIdFields> => {
  const response = await axios.delete(`${BASE_URL}/${userId}`);
  return response.data;
};

// Export the functions to be used in React components
export default {
  getUserById,
  getUserIncomingTickets,
  getUserOutgoingTickets,
  createUser,
  deleteUser
};