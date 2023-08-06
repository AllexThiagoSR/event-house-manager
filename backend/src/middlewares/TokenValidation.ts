import { NextFunction, Request, Response } from 'express';
import Token from '../utils/Token';

export default class TokenValidation {
  constructor(private decoder: Token = new Token()) {}

  public validate(req: Request, res: Response, next: NextFunction): Response | void {
    try {
      const token = req.headers.authorization;
      if (!token) return res.status(401).json({ message: 'Token not found' });
      res.locals.user = this.decoder.decode(token);
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
  }

  public validatePermission(_req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;
    if (user.roleId !== 1) {
      return res.status(401).json({ message: 'Only admins can access this end-point' })
    }
    return next();
  }
}