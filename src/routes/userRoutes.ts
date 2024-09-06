import express, { NextFunction, request, Request, Response } from 'express';
import { User } from '../models/userModel';
import { Organization } from '../models/organizationModel';
import mongoose from 'mongoose';
import { ITicket, ITicketActivity } from '../models/ticketModel';
import { tokenIsValid } from '../helpers/authorizationHelpers';

const router = express.Router();



// Get user based on id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) {
      throw new Error('User not found!');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});



// Get the user's incoming ticket if the user is administrator
router.get('/:id/incomingTickets', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) {
      throw new Error('User not found!');
    }
    if(user.role != 'ADMINISTRATOR') {
      throw new Error('User is not and administrator!');
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
  
      res.json(transformedTickets);
  } catch (error) {
    next(error);
  }
});



// Get the user's outgoing tickets
router.get('/:id/outgoingTickets', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user) {
      throw new Error('User not found!');
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

      res.json(transformedTickets);
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
      res.status(400).send("Token is invalid!");
    }
    const { name, email, role, organizationId } = req.body;
    const organization = await Organization.findById(organizationId);
    // Make sure organizaion exists
    if(!organization) {
      throw new Error("the organizationId is invalid");
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
      throw new Error("Organization not found.");
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedUser);

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
      res.status(400).send("Token is invalid!");
    }
    // Make sure userId is available and user exist
    const userId = req.params.userId;
    if (!userId) {
      throw new Error("User ID is required.");
    }
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error("User not found.");
    }

    // Make sure organization exists
    const organizationId = user.organizationId;
    if (!organizationId) {
      throw new Error("User is not associated with any organization.");
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

    res.status(200).json({ message: "User deleted and organization updated successfully." });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error); 
  }
});

export default router;
