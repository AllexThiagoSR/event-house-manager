import NewEntity from '../interfaces/NewEntity';
import EventModel from '../models/Event.model';
import IEvent from '../interfaces/IEvent';
import ServiceReturn, { ErrorReturn } from '../interfaces/ServiceReturn';
import IUser from '../interfaces/IUser';
import ExpireTime from '../utils/ExpireTime';
import UserModel from '../models/User.model';
import Token from '../utils/Token';
import TicketModel from '../models/Ticket.model';

export default class EventService {
  private model: EventModel;
  private userModel: UserModel;
  private ticketModel: TicketModel;
  private static internalServerError = {
    status: 500,
    data: { message: 'Internal Server error' },
  } as ErrorReturn;

  constructor(
    model: EventModel = new EventModel(),
    userModel: UserModel = new UserModel(),
    ticketModel: TicketModel = new TicketModel(),
  ) {
    this.model = model;
    this.userModel = userModel;
    this.ticketModel = ticketModel
  }

  async create(event: NewEntity<IEvent>): Promise<ServiceReturn<IEvent>> {
    try {
      const newEvent = await this.model.create(event);
      return { status: 201 , data: newEvent };
    } catch (error) {
      return EventService.internalServerError;
    }
  }

  async getAll(user: Partial<IUser>): Promise<ServiceReturn<IEvent[]>> {
    try {
      const events = await this.model.getAll(user.roleId === 1);
      return { status: 200, data: events };
    } catch (error) {
      return EventService.internalServerError;
    }
  }

  async getById(id: number | string, user: Partial<IUser>): Promise<ServiceReturn<IEvent | null>>{
    try {
      const event = await this.model.getById(id, user.roleId === 1);
      if (!event) return { status: 404, data: { message: 'Event not found' } };
      return { status: 200, data: event };
    } catch (error) {
      return EventService.internalServerError;
    }
  }

  private async createTicket(
    userId: number | string, event: IEvent
  ): Promise<ErrorReturn | string> {
    const user = await this.userModel.getById(userId)
    if (!user) {
      return { status: 404, data: { message: 'User not found' } };
    }
    const expireIn = new ExpireTime(event.date.toString()).getTicketExpireTime();
    if (expireIn < 0) return { status: 400, data: { message: 'This event has already passed' } };
    const payload = { id: user.id, eventId: event.id, date: event.date, time: event.time };
    const token = new Token().generateToken(payload, `${expireIn}d`);
    await this.ticketModel.create({ userId: user.id, eventId: event.id, ticketToken: token });
    if (event.ticketsQuantity) {
      this.model.updateTicketsQuantity(event.id, event.ticketsQuantity - 1);
    }
    return token;
  }

  private static hasTickets(event: IEvent) {
    if (event.ticketsQuantity !== null && event.ticketsQuantity <= 0) {
      throw new Error('No more tickets');
    }
  }

  private mapErrors(error: Error): ErrorReturn {
    if (error.message === 'No more tickets') {
      return { status: 409, data: { message: error.message } };
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return { status: 409, data: { message: 'User already invited' }}
    }
    return EventService.internalServerError;
  }

  async invite(
    id: number | string,
    userId: number | string,
  ): Promise<ServiceReturn<{ message: 'User invited' }>> {
    try {
      const event = await this.model.getById(id, true);
      if (!event) return { status: 404, data: { message: 'Event not found' } };
      if (!event.privateEvent) {
        return { status: 400, data: { message: 'This event do not need invite' } };
      }
      EventService.hasTickets(event);
      const ticketToken = await this.createTicket(userId, event);
      if (typeof ticketToken !== 'string') return ticketToken;
      return { status: 200, data: { message: 'User invited' } };
    } catch (error) {
      return this.mapErrors(error as Error);
    }
  }
}
