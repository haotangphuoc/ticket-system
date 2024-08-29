import axios from 'axios';
import { User } from '../../../interfaces/userInterface'

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

export default { getAllUsers }