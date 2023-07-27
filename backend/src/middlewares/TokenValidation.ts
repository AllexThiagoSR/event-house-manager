import { NextFunction, Request, Response } from 'express';

export default class TokenValidation {
  public static validate(req: Request, res: Response, next: NextFunction): Response | void {
    try {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json({ message: 'Token not found' });
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
  }
}