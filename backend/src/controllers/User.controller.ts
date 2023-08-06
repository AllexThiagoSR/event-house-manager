import { Request, Response } from 'express';
import UserService from '../services/User.service';

export default class UserController {
  private service: UserService;

  constructor(s: UserService = new UserService()) {
    this.service = s;
  }

  async create(req: Request, res: Response) {
    const { status, data } = await this.service.create(req.body);
    return res.status(status).json(data);
  }
}
