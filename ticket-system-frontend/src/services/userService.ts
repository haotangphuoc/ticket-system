import axios from 'axios';
import { User } from '../interfaces/userInterface'

const baseUrl = "http://localhost:3000/users";

const getAllUsers = async () : Promise<User[] | Error> => {
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

const createUser = async (userDate: Omit<User, 'id'| 'organizationId' | 'ticketIds' | 'password'>): Promise<User | Error> => {
  try {
    const newUser = {
      id: String(Math.floor(Math.random() * 100000)),
      organizationId: "Add organization id here", // Could be implemented in the backend
      ticketIds: [],
      password: '',
      ...userDate
    }
    const res = await axios.post(baseUrl, newUser);
    return res.data
  } catch(error) {
    if (axios.isAxiosError(error)) {
      return new Error(error.message); 
    } else {
      return new Error('An unknown error occurred');
    }
  }
}

export default { getAllUsers, createUser }