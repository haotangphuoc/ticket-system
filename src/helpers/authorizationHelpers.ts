import { Request } from 'express';
import jwt from 'jsonwebtoken';

const getTokenFrom = (request:Request): string | null => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null;
}

export const tokenIsValid = (request:Request) => {
  const token = getTokenFrom(request);
  if(!token || !process.env.SECRET) {
    console.log("Here")
    return false;
  }
  
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken) {
    return false;
  }
  
  return true;
}