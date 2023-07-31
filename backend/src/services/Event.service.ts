import NewEntity from '../interfaces/NewEntity';
import EventModel from '../models/Event.model';
import IEvent from '../interfaces/IEvent';
import ServiceReturn, { ErrorReturn } from '../interfaces/ServiceReturn';
import IUser from '../interfaces/IUser';
import ExpireTime from '../utils/ExpireTime';
import UserModel from '../models/User.model';
import Token from '../utils/Token';
import TicketModel from '../models/Ticket.model';
import Mailer from '../utils/Mailer';

type mappedErrors = 'internalError' | 'noTickets' | 'notFound' | 'userNotFound' 
  | 'eventHasPassed' | 'needInvite' | 'doNotNeedInvite';

export default class EventService {
  private model: EventModel;
  private userModel: UserModel;
  private ticketModel: TicketModel;
  private mailer: Mailer;

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
    mailer: Mailer = new Mailer(),
  ) {
    this.model = model;
    this.userModel = userModel;
    this.ticketModel = ticketModel
    this.mailer = mailer;
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
  ): Promise<{ token: string | null, userEmail: string}> {
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
    return { token, userEmail: user.email };
  }

  private static hasTickets(event: IEvent) {
    if (event.ticketsQuantity !== null && event.ticketsQuantity <= 0) {
      const err = new Error();
      err.name = 'noTickets';
      throw err;
    }
  }

  private async sendInviteMail(to: string, token: string, event: IEvent) {
    const body = `
    <h2>You were invite to an event</h2>
    <p>Description: ${event.description}</p>
    <p>Date: ${event.date}</p>
    <p>Time: ${event.time}</p>
    <p>Ticket: ${token}</p>`;
    await this.mailer.sendMail(
      'allexthiagodev@gmail.com',
      to,
      'Invite confirmation',
      body,
    );
  }

  private async sendSignMail(to: string, event: IEvent, token?: string) {
    const body = `
    <h2>You signed to an event</h2>
    <p>Description: ${event.description}</p>
    <p>Date: ${event.date}</p>
    <p>Time: ${event.time}</p>
    ${token ? `<p>Ticket: ${token}</p>` : ''}`;
    await this.mailer.sendMail(
      'allexthiagodev@gmail.com',
      to,
      'Sign confirmation',
      body,
    );
  }

  async invite(
    id: number | string,
    userId: number | string,
  ): Promise<ServiceReturn<{ message: 'User invited' }>> {
    try {
      const event = await this.findEvent(id, true);
      if (!event.privateEvent) { const err = new Error(); err.name = 'doNotNeedInvite'; throw err; }
      EventService.hasTickets(event);
      const { token, userEmail } = await this.createTicket(userId, event);
      this.sendInviteMail(userEmail, token as string, event);
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
      const { token, userEmail } = await this.createTicket(userId, event);
      this.sendSignMail(userEmail, event, token as string | undefined);
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
