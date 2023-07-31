import NewEntity from '../interfaces/NewEntity';
import EventModel from '../models/Event.model';
import IEvent from '../interfaces/IEvent';
import ServiceReturn, { ErrorReturn } from '../interfaces/ServiceReturn';
import IUser from '../interfaces/IUser';
import ExpireTime from '../utils/ExpireTime';
import UserModel from '../models/User.model';
import Token from '../utils/Token';
import TicketModel from '../models/Ticket.model';

type mappedErrors = 'internalError' | 'noTickets' | 'notFound' | 'userNotFound' 
  | 'eventHasPassed' | 'needInvite' | 'doNotNeedInvite';
export default class EventService {
  private model: EventModel;
  private userModel: UserModel;
  private ticketModel: TicketModel;

  private static errors = {
    internalError: { 
      status: 500, data: { message: 'Internal Server error' },
    } as ErrorReturn,
    noTickets: { status: 409, data: { message: 'No more tickets' } } as ErrorReturn,
    notFound: { status: 404, data: { message: 'Event not found' } } as ErrorReturn,
    userNotFound: { status: 404, data: { message: 'User not found' } } as ErrorReturn,
    eventHasPassed: { status: 409, data: { message: 'Event has already passed' } } as ErrorReturn,
    needInvite: { status: 401, data: { message: 'You can\'t sign to this event' } } as ErrorReturn,
    userAlreadySigned: { 
      status: 409, data: { message: 'User has already been signed to this event' },
    } as ErrorReturn,
    doNotNeedInvite: { 
      status: 400, data: { message: 'This event do not need invite' },
    } as ErrorReturn,
  };

  constructor(
    model: EventModel = new EventModel(),
    userModel: UserModel = new UserModel(),
    ticketModel: TicketModel = new TicketModel(),
  ) {
    this.model = model;
    this.userModel = userModel;
    this.ticketModel = ticketModel
  }

  private mapErrors(error: Error): ErrorReturn {
    const name = error.name !== 'SequelizeUniqueConstraintError' 
      ? error.name : 'userAlreadySigned';
    const err = EventService.errors[name as mappedErrors];
    if (err) return err;
    return EventService.errors.internalError;
  }

  async findEvent(id: number | string, includeStats?: boolean): Promise<IEvent> {
    const event = await this.model.getById(id, includeStats);
    if (!event) {
      const err = new Error();
      err.name = 'notFound';
      throw err;
    }
    return event;
  }

  async create(event: NewEntity<IEvent>): Promise<ServiceReturn<IEvent>> {
    try {
      const newEvent = await this.model.create(event);
      return { status: 201 , data: newEvent };
    } catch (error) {
      return this.mapErrors(error as Error);
    }
  }

  async getAll(user: Partial<IUser>): Promise<ServiceReturn<IEvent[]>> {
    try {
      const events = await this.model.getAll(user.roleId === 1);
      return { status: 200, data: events };
    } catch (error) {
      return this.mapErrors(error as Error);
    }
  }

  async getById(id: number | string, user: Partial<IUser>): Promise<ServiceReturn<IEvent | null>>{
    try {
      const event = await this.findEvent(id, user.roleId === 1);
      return { status: 200, data: event };
    } catch (error) {
      return this.mapErrors(error as Error);
    }
  }

  private static addToken(event: IEvent, user: IUser) {
    if (!event.needTicket) return null;
    const expireIn = new ExpireTime(event.date.toString()).getTicketExpireTime();
    const payload = { id: user.id, eventId: event.id, date: event.date, time: event.time };
    const token = new Token().generateToken(payload, `${expireIn}d`);
    return token;
  }

  private async createTicket(
    userId: number | string, event: IEvent,
  ): Promise<string | null> {
    const user = await this.userModel.getById(userId);
    if (!user) {
      const err = new Error();
      err.name = 'userNotFound';
      throw err;
    }
    const token = EventService.addToken(event, user);
    await this.ticketModel.create({ userId: user.id, eventId: event.id, ticketToken: token });
    if (event.ticketsQuantity) {
      this.model.updateTicketsQuantity(event.id, event.ticketsQuantity - 1);
    }
    return token;
  }

  private static hasTickets(event: IEvent) {
    if (event.ticketsQuantity !== null && event.ticketsQuantity <= 0) {
      const err = new Error();
      err.name = 'noTickets';
      throw err;
    }
  }

  async invite(
    id: number | string,
    userId: number | string,
  ): Promise<ServiceReturn<{ message: 'User invited' }>> {
    try {
      const event = await this.findEvent(id, true);
      if (!event.privateEvent) {
        const err = new Error();
        err.name = 'doNotNeedInvite';
        throw err;
      }
      EventService.hasTickets(event);
      /*const ticketToken = */await this.createTicket(userId, event);
      // Enviar um email para a pessoa convidada com o token
      return { status: 200, data: { message: 'User invited' } };
    } catch (error) {
      return this.mapErrors(error as Error);
    }
  }

  async sign(
    id: number | string, userId: string | number,
  ): Promise<ServiceReturn<{ message: 'User signed' }>> {
    try {
      const event = await this.findEvent(id);
      if (event.privateEvent) { const err = new Error(); err.name = 'needInvite'; throw err; }
      EventService.hasTickets(event);
      const ticketToken = await this.createTicket(userId, event);
      if (ticketToken) {
        // Enviar um email com o token
      } else {
        // Evniar um email sem o token
      }
      return { status: 200, data: { message: 'User signed' } };
    } catch (error) {
      return this.mapErrors(error as Error);
    }
  }

  async deleteEvent(id: string | number): Promise<ServiceReturn<undefined>> {
    try {
      await this.model.deleteEvent(id);
      return { status: 204, data: undefined };
    } catch (error) {
      return this.mapErrors(error as Error);
    }
  }
}
