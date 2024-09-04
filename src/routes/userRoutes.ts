import express, { NextFunction, Request, Response } from 'express';
import { User } from '../models/userModel';
import { Organization } from '../models/organizationModel';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, password, email, role, organizationId } = req.body;

    // Validate required fields
    if (!name || !password || !email || !role || !organizationId) {
      throw new Error("Missing required fields.");
    }

    // Create a new user
    const newUser = new User({
      name,
      password,
      email,
      organizationId,
      role,
      incomingTicketIds: role === 'ADMINISTRATOR' ? [] : undefined, // Make sure only Administrator has incoming ticket
      outgoingTicketIds: []
    });

    const savedUser = await newUser.save({ session });

    // Update the organization with the new user's ID
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

router.delete('/:userId', async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
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
