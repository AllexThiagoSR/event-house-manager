import SequelizeTicket from '../database/models/SequelizeTicket';
import ITicket from '../interfaces/ITicket';

export default class TicketModel {
  model = SequelizeTicket;
  public async create(data: Omit<ITicket, 'id' | 'used'>) {
    const ticket = await this.model.create(data);
    return ticket.dataValues;
  }

  public async getByUserAndEventIds(userId: string | number, eventId: string | number) {
    const ticket = await this.model.findOne({ where: { userId, eventId } })
    return ticket;
  }
}
