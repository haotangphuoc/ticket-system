import express, { NextFunction, request, Request, Response } from 'express';
import { User } from '../models/userModel.js';
import { Organization } from '../models/organizationModel.js';
import mongoose from 'mongoose';
import { ITicket, ITicketActivity } from '../models/ticketModel.js';
import { tokenIsValid } from '../helpers/authorizationHelpers.js';

const router = express.Router();



// Get user based on id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) {
      return res.status(404).json({message: 'User not found!'});
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});



// Get the user's incoming ticket if the user is administrator
router.get('/:id/incomingTickets', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) {
      return res.status(404).json({message: 'User not found!'});
    }
    if(user.role != 'ADMINISTRATOR') {
      return res.status(401).json({message: 'User is not and administrator!'});
    }
    const administrator = await user.populate({
        path: 'incomingTicketIds',
        select: 'title description status startDate endDate activities',
        populate: {
          path: 'senderId',
          select: 'email id'
        }
      });
      
      // @ts-ignore
      const transformedTickets = administrator.incomingTicketIds.map((ticket: ITicket) => {
        const { _id, startDate, endDate, senderId, activities, ...rest } = ticket.toObject();
        return {
          id: _id,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          sender: { id: senderId._id, email: senderId.email}, // Rename field
          activities: activities.map((activity:ITicketActivity) => {
            const {_id, ...rest} = activity
            return {
              id: _id,
              ...rest
            }
          }),
          ...rest
        };
      });
  
      return res.status(200).json(transformedTickets);
  } catch (error) {
    next(error);
  }
});



// Get the user's outgoing tickets
router.get('/:id/outgoingTickets', async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const user = await User.findById(req.params.id);
    if(!user) {
      return res.status(404).json({message: 'User not found!'});
    }
    const administrator = await user.populate({
        path: 'outgoingTicketIds',
        select: 'title description status startDate endDate activities',
        populate: {
          path: 'receiverId',
          select: 'email id'
        }
      });
      
      // @ts-ignore
      const transformedTickets = administrator.outgoingTicketIds.map((ticket: ITicket) => {
        const { _id, startDate, endDate, receiverId, activities, ...rest } = ticket.toObject();
        return {
          id: _id,
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          sender: { id: receiverId._id, email: receiverId.email}, // Rename field
          activities: activities.map((activity:ITicketActivity) => {
            const {_id, ...rest} = activity
            return {
              id: _id,
              ...rest
            }
          }),
          ...rest
        };
      });

      return res.status(200).json(transformedTickets);
  } catch (error) {
    next(error);
  }
});



// Create new user and add the user id to organization's userIds field
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if(!tokenIsValid(req)) {
      return res.status(400).send("Token is invalid!");
    }
    const { name, email, role, organizationId } = req.body;
    const organization = await Organization.findById(organizationId);
    // Make sure organizaion exists
    if(!organization) {
      return res.status(400).json({message: "The organization is not found!"});
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      organizationId,
      role,
      incomingTicketIds: role === 'ADMINISTRATOR' ? [] : undefined, // Make sure only Administrator has incoming ticket
      outgoingTicketIds: []
    });

    const savedUser = await newUser.save({ session });

    
    const updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      { $push: { userIds: savedUser._id } },
      { new: true, session }
    );

    if (!updatedOrganization) {
      return res.status(404).json({message: "Organization not found."});
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json(savedUser);

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error); // Pass the error to error-handling middleware
  }
});



// Delete user and delete its id from organization's userIds field
router.delete('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if(!tokenIsValid(req)) {
      return res.status(401).send("Token is invalid!");
    }
    // Make sure userId is available and user exist
    const userId = req.params.userId;
    const user = await User.findById(userId).session(session);
    if (!user) {
      return res.status(404).json({message: "User not found."});
    }

    // Make sure organization exists
    const organizationId = user.organizationId;
    if (!organizationId) {
      return res.status(400).json({message: "User is not associated with any organization."});
    }

    await User.findByIdAndDelete(userId).session(session);

    const updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      { $pull: { userIds: userId } },
      { new: true, session }
    );

    if (!updatedOrganization) {
      throw new Error("Organization not found.");
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "User deleted and organization updated successfully." });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error); 
  }
});

export default router;
