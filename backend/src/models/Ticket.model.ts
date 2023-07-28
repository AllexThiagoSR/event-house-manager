import SequelizeTicket from '../database/models/SequelizeTicket';
import ITicket from '../interfaces/ITicket';

export default class TicketModel {
  model = SequelizeTicket;
  public async create(data: Omit<ITicket, 'id' | 'used'>) {
    const ticket = await this.model.create(data);
    return ticket.dataValues;
  }
}
