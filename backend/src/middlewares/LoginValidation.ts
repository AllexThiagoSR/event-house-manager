import { NextFunction, Request, Response } from 'express';
import * as emailValidator from 'email-validator';

export default class LoginValidation {
  public static validateFields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Some required field is empty' });
    }
    if (!emailValidator.validate(email) || password.length < 6) {
      return res.status(400).json({ message: 'Some field is invalid' });
    }
    return next();
  }
}