import IEvent from "../interfaces/IEvent";
import SequelizeEvent from "../database/models/SequelizeEvent";
import NewEntity from "../interfaces/NewEntity";

export default class EventModel {
  model = SequelizeEvent;

  async create(event: NewEntity<IEvent>) {
    const newEvent = await this.model.create(event);
    return newEvent;
  }

  async getAll() {
    const events = await this.model.findAll();
    return events;
  }
}
