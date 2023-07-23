import { Request, Response } from "express";
import EventService from "../services/Event.service";

export default class EventController {
  private service: EventService;

  constructor(service: EventService = new EventService()) {
    this.service = service;
  }

  async create(req: Request, res: Response) {
    const { status, data } = await this.service.create(req.body);
    return res.status(status).json(data);
  };

  async getAll(_req: Request, res: Response) {
    const { status, data } = await this.service.getAll();
    return res.status(status).json(data);
  }
}
