import NewEntity from '../interfaces/NewEntity';
import EventModel from '../models/Event.model';
import IEvent from '../interfaces/IEvent';
import ServiceReturn from '../interfaces/ServiceReturn';
import IUser from '../interfaces/IUser';

export default class EventService {
  private model: EventModel;
  private static internalServerError = { status: 500, data: { message: 'Internal Server error' } };

  constructor(model: EventModel = new EventModel()) {
    this.model = model;
  }

  async create(event: NewEntity<IEvent>): Promise<ServiceReturn<IEvent>> {
    try {
      const newEvent = await this.model.create(event);
      return { status: 201 , data: newEvent };
    } catch (error) {
      return EventService.internalServerError as ServiceReturn<IEvent>;
    }
  }

  async getAll(user: Partial<IUser>): Promise<ServiceReturn<IEvent[]>> {
    try {
      const events = await this.model.getAll(user.roleId === 1);
      return { status: 200, data: events };
    } catch (error) {
      return EventService.internalServerError as ServiceReturn<IEvent[]>;
    }
  }
}
