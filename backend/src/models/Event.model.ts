import IEvent from '../interfaces/IEvent';
import SequelizeEvent from '../database/models/SequelizeEvent';
import NewEntity from '../interfaces/NewEntity';
import SequelizeUser from '../database/models/SequelizeUser';

export default class EventModel {
  model = SequelizeEvent;

  async create(event: NewEntity<IEvent>) {
    const newEvent = await this.model.create(event);
    return newEvent;
  }

  private static include(includeStats?:boolean) {
    return includeStats ? {
      include: {
        model: SequelizeUser,
        through: { as: 'ticket', attributes: [] },
        as: 'signedUsers',
        attributes: { exclude: ['password'] },
      }
    } : {};
  }

  async getAll(includeStats?: boolean) {
    const events = await this.model.findAll({
      where: {
        privateEvent: includeStats ? [false, true] : false,
      },
      ...EventModel.include(includeStats),
    });
    return events;
  }

  async getById(id: number | string, includeStats?: boolean) {
    const event = await this.model.findOne(
      {
        where: { id, privateEvent: includeStats ? [false, true] : false, },
        ...EventModel.include(includeStats),
      },
    );
    return event;
  }
}
