import bcrypt from 'bcrypt';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/userModel';

dotenv.config();

const authenticationRoutes = express.Router();

// Register user with email in the DB
authenticationRoutes.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const saltRounds = 10;

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({message: 'Email does not exist in DB, require permission from an administrator!'});
    }
    if (user.passwordHash) {
      return res.status(400).json({message: 'Email has already been registered, please login!'});
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email },     
      { passwordHash: await bcrypt.hash(password, saltRounds)},              
      { new: true, runValidators: true } 
    );

    return res.status(201).json({user: updatedUser});
  } catch(error) {
    next(error);
  }
})

// Login user
authenticationRoutes.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({message: 'Email does not exist in DB, require permission from an administrator!'});
    }
    if(user.passwordHash === '') {
      return res.status(400).json({message: 'User is not yet registered!'});
    }
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);
    if(!passwordCorrect) {
      return res.status(401).json({message: 'Invalid userame or password'});
    }
    const webTokenUserInfo = {
      email: user.email,
      id: user.id,
    }
    if(!process.env.SECRET) {
      return res.status(500).json({message: 'env.SECRET does not exists!'});
    }
    const token = jwt.sign(webTokenUserInfo, process.env.SECRET);
    return res.status(200).json({token, user});
    
  } catch(error) {
    next(error);
  }
})

export default authenticationRoutes;