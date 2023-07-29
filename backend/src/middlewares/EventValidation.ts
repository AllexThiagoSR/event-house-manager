import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export default class EventValidation {
  private fields = Joi.object({
    date: Joi.string().required(),
    description: Joi.string().min(10).required(),
    needTicket: Joi.bool(),
    ticketsQuantity: Joi.number().min(10),
    privateEvent: Joi.bool(),
    time: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required(),
  });

  public validate(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const { error } = this.fields.validate(data);
    const date = new Date(data.date);
    console.log(date.toString());
    
    if (date.toString() === 'Invalid Date') {
      return res.status(400).json({ message: date.toString() });
    }
    if (error) {
      let message = error.message;
      if (message.includes('"time" with value')) message = 'Invalid Time';
      return res.status(400).json({ message });
    }
    return next();
  }
}
