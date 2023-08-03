import { Request, Response } from 'express';
import LoginService from '../services/Login.service';

export default class LoginController {
  private service: LoginService;

  constructor(s: LoginService = new LoginService()) {
    this.service = s;
  }

  public async login(req: Request, res: Response) {
    console.log('asdasdjs');
    
    const { status, data } = await this.service.login(req.body);
    return res.status(status).json(data);
  }
}