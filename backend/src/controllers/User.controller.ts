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

  async deleteUser(_req: Request, res: Response) {
    const { status, data } = await this.service.deleteUser(res.locals.user.id);
    return res.status(status).json(data);
  }

  async update(req: Request, res: Response) {
    const { status, data } = await this.service.update(res.locals.user.id, req.body);
    return res.status(status).json(data);
  }
}
