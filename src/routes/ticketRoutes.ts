import express, { NextFunction, Request, Response } from 'express';
import { ITicketActivity, Ticket, TicketActivity } from '../models/ticketModel';
import { User } from '../models/userModel';
import mongoose from 'mongoose';
import { tokenIsValid } from '../helpers/authorizationHelpers';

const router = express.Router();



// Create a new ticket and add the ticket Id to sender and receiver's ticketIds field
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if(!tokenIsValid(req)) {
      res.status(400).send("Token is invalid!");
    }
    const { senderId, receiverId } = req.body;
    const newTicket = new Ticket(req.body);
    const savedTicket = await newTicket.save({ session });

    // Add the ticket to the sender's outgoingTicketIds
    const sender = await User.findById(senderId).session(session);
    if (!sender) {
      throw new Error(`Sender with ID ${senderId} not found.`);
    }
    sender.outgoingTicketIds.push(new mongoose.Types.ObjectId(savedTicket._id as string));
    
    
    await sender.save({ session });

    // Add the ticket to the receiver's incomingTicketIds if they are ADMINISTRATOR
    const receiver = await User.findById(receiverId).session(session);
    if (!receiver) {
      throw new Error(`Receiver with ID ${receiverId} not found.`);
    }
    if (receiver.role === 'ADMINISTRATOR') {
      if (!receiver.incomingTicketIds) {
        receiver.incomingTicketIds = [];
      }

      receiver.incomingTicketIds.push(new mongoose.Types.ObjectId(savedTicket._id as string));
      await receiver.save({ session });
    } else {
      throw new Error(`Receiver with ID ${receiverId} is not an ADMINISTRATOR.`);
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedTicket);

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
});



// Add new ticket activity to ticket's activityIds field
router.post('/:id/activities', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!tokenIsValid(req)) {
      res.status(400).send("Token is invalid!");
    }
    const { status, comment } = req.body;
    const activity = new TicketActivity({status, comment}); 
    const ticket = await Ticket.findById(req.params.id);

    // Push the new activity to ticket's activities field and change ticket status to activity
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    ticket.activities.push(activity);
    ticket.status = status;
    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
});



// Edit fields of ticket
router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!tokenIsValid(req)) {
      res.status(400).send("Token is invalid!");
    }
    // Check for unknown field in the ticket PATCH request
    const allowedFields = ['title', 'description', 'receiverId', 'status', 'startDate', 'endDate'];
    const unknownFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    if (unknownFields.length > 0) {
      return res.status(400).json({ message: `Unknown fields: ${unknownFields.join(', ')}` });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },  
      { new: true, runValidators: true } 
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(updatedTicket);
  } catch (error) {
    next(error);
  }
});



// Delete ticket and delete its Id from sender and receiver's ticketIds field
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if(!tokenIsValid(req)) {
      res.status(400).send("Token is invalid!");
    }
    // Make sure ticket exists
    const ticket = await Ticket.findById(req.params.id).session(session);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Update the ticket field of sender and receiver
    const { senderId, receiverId } = ticket;
    const updatedSender = await User.updateOne(
       { _id: senderId },
      { $pull: { outgoingTicketIds: ticket._id } },
      { session }
    );
    const updatedReceiver = await User.updateOne(
      { _id: receiverId },
      { $pull: { incomingTicketIds: ticket._id } },
      { session }
    );
    if(!updatedReceiver || !updatedSender) {
      throw new Error("Cannot update receiver or sender's ticket field")
    }

    // Delete the ticket
    await Ticket.findByIdAndDelete(req.params.id).session(session);
    await session.commitTransaction();
    session.endSession();
    res.json({ message: "Ticket deleted" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
});

export default router;
