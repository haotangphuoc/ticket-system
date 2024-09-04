import express, { Request, Response, NextFunction } from 'express';
import { Organization } from '../models/organizationModel';

const router = express.Router();


router.get('/', async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    next(error);
  }
});


router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const organization = await Organization.findById(req.params.id);
    res.json(organization);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newOrganization = new Organization(req.body);
    await newOrganization.save();
    res.json(newOrganization);
  } catch (error) {
    next(error);
  }
});

export default router;

