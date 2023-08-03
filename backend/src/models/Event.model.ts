import IEvent from '../interfaces/IEvent';
import SequelizeEvent from '../database/models/SequelizeEvent';
import NewEntity from '../interfaces/NewEntity';
import SequelizeUser from '../database/models/SequelizeUser';

export default class EventModel {
  model = SequelizeEvent;

  async create(event: NewEntity<IEvent>) {
    const newEvent = await this.model.create(event);
    return newEvent.dataValues;
  }

  async deleteEvent(id: string | number) {
    const deleted = await this.model.destroy({ where: { id } });
    return deleted;
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
        where: { id, privateEvent: includeStats ? [false, true] : false },
        ...EventModel.include(includeStats),
      },
    );
    return event?.dataValues;
  }

  async updateTicketsQuantity(id: number | string, newQuantity: number) {
    const event = await this.model.update({ ticketsQuantity: newQuantity }, { where: { id } });
    return event;
  }

  async update(id: number | string, data: Partial<IEvent>) {
    const event = await this.model.update(data, { where: { id } });
    return event;
  }
}
