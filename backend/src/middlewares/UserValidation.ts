import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export default class UserValidation {
  private creationFields = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  validateCreation(req: Request, res: Response, next: NextFunction) {
    const { error } = this.creationFields.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    return next();
  }
}
