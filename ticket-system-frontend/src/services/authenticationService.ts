import axios from 'axios';
import { LoginReturnParams, UserLoginParams } from '../interfaces/authenticationInterface';
import { UserGetByIdParams } from '../interfaces/userInterface';

const baseUrl = "http://localhost:3000/api/authentication";

const login = async (userCredentials: UserLoginParams): Promise<LoginReturnParams | Error> => {
  try {
    const res = await axios.post(`${baseUrl}/login`, userCredentials);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An unknown error occurred'); 
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

const register = async (userCredentials: UserLoginParams): Promise<UserGetByIdParams | Error> => {
  try {
    const res = await axios.post(`${baseUrl}/register`, userCredentials);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return new Error(error.message); 
    } else {
      return new Error('An unknown error occurred');
    }
  }
}

export default { login, register }