import axios from 'axios';
import { LoginReturnFields, UserLoginParams } from '../interfaces/authenticationInterface';
import { UserGetByIdFields } from '../interfaces/userInterface';

const BASE_URL = "http://localhost:3000/api/authentication";

const login = async (userCredentials: UserLoginParams): Promise<LoginReturnFields> => {
  const res = await axios.post(`${BASE_URL}/login`, userCredentials);
  return res.data;
}

const register = async (userCredentials: UserLoginParams): Promise<UserGetByIdFields> => {
  const res = await axios.post(`${BASE_URL}/register`, userCredentials);
  return res.data;
}

export default { login, register }