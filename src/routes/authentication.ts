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
    if (!User) {
      res.status(400).send('User with provided email does not exist in the database!');
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email },     
      { passwordHash: await bcrypt.hash(password, saltRounds)},              
      { new: true, runValidators: true } 
    );

    res.status(201).json(updatedUser);
  } catch(error) {
    next(error);
  }
})

// Login user
authenticationRoutes.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash);
    if(!(user && passwordCorrect)) {
      res.status(401).send('Invalid userame or password');
    }
    else {
      const webTokenUserInfo = {
        email: user.email,
        id: user.id,
      }
      if(!process.env.SECRET) {
        throw new Error('env.SECRET does not exists!');
      }
      const token = jwt.sign(webTokenUserInfo, process.env.SECRET);
      res.status(200).json({token, user});
    }
  } catch(error) {
    next(error);
  }
})

export default authenticationRoutes;