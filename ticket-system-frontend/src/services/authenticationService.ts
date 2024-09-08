import axios from 'axios';
import { LoginReturnFields, UserLoginParams } from '../interfaces/authenticationInterface';
import { UserGetByIdFields } from '../interfaces/userInterface';

const baseUrl = "http://localhost:3000/api/authentication";

const login = async (userCredentials: UserLoginParams): Promise<LoginReturnFields | Error> => {
  const res = await axios.post(`${baseUrl}/login`, userCredentials);
  return res.data;
}

const register = async (userCredentials: UserLoginParams): Promise<UserGetByIdFields | Error> => {
  const res = await axios.post(`${baseUrl}/register`, userCredentials);
  return res.data;
}

export default { login, register }