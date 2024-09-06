import express, { Request, Response, NextFunction } from 'express';
import { Organization } from '../models/organizationModel';
import { IUser } from '../models/userModel';
import { tokenIsValid } from '../helpers/authorizationHelpers';

const router = express.Router();

// Get organization based on ID

// Return JSON format: 
// {
//   "name": "string",
//   "id": "string"
// }
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if(!organization) {
      throw new Error('Organization not found!');
    }
    res.json(organization);
  } catch (error) {
    next(error);
  }
});

// Get organization's users

// Return JSON format:
// {
//   "users": [
//       {
//           "name": "string",
//           "email": "string",
//           "role": "UserRole",
//           "id": "MongoId"
//       },
//       ...
//   ]
// }
router.get('/:id/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const organization = await Organization.findById(req.params.id)
      .populate({
        path: "userIds",
        select: "name email role"
      });
    if(!organization) {
      throw new Error('Organization not found!');
    }

    // @ts-ignore
    const transformedUsers = organization.userIds.map((user: IUser) => {
      const {_id, ...rest} = user.toObject();
      return {
        id: user._id,
        ...rest
      }
    })

    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
});

// Create organization

// POST JSON format 
// {
//   "name": "string"
// }
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!tokenIsValid(req)) {
      res.status(400).send("Token is invalid!");
    }
    const newOrganization = new Organization(req.body);
    await newOrganization.save();
    res.json(newOrganization);
  } catch (error) {
    next(error);
  }
});

export default router;

