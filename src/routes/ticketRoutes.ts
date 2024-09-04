import express, { NextFunction, Request, Response } from 'express';
import { ITicketActivity, Ticket, TicketActivity } from '../models/ticketModel';
import { User } from '../models/userModel';
import mongoose from 'mongoose';

const router = express.Router();


router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    res.json(ticket);
  } catch (error) {
    next(error);
  }
});


router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
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

router.post('/:id/activity', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, comment } = req.body;
    const activityData = { status, comment };
    const activity = new TicketActivity(activityData); 
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

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
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

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
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
