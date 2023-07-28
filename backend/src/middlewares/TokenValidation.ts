import { NextFunction, Request, Response } from 'express';
import Token from '../utils/Token';

export default class TokenValidation {
  public static validate(req: Request, res: Response, next: NextFunction): Response | void {
    try {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json({ message: 'Token not found' });
      res.locals.user = new Token().decode(token);
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
  }
}