import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: err.errors, 
    });
  }

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({
      message: `Invalid ID format: ${err.value}`,
    });
  }

  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      message: `Duplicate key error: ${field} must be unique.`,
    });
  }

  res.status(500).json({
    message: 'An unexpected error occurred',
    error: err.message,
  });

  next(err);
};
