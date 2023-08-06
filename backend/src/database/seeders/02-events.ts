import { QueryInterface } from "sequelize";
import * as bcrypt from 'bcryptjs';

export default {
  up: async (queryInterface: QueryInterface) => queryInterface.bulkInsert(
    'events',
    [
      {
        description: 'A private event to test',
        date: new Date('2023-10-11'),
        time: '18:00:00',
        private_event: true,
        tickets_quantity: 1,
        need_ticket: true,
      },
      {
        description: 'A public event to test',
        date: new Date('2023-10-11'),
        time: '18:00:00',
        private_event: false,
        tickets_quantity: 1,
        need_ticket: true,
      },
      {
        description: 'A public event to test 2',
        date: new Date('2023-10-11'),
        time: '18:00:00',
        private_event: false,
        need_ticket: false,
      },
    ],
  ),
  down: async (queryInterface: QueryInterface) => queryInterface.bulkDelete('events', {}),
}
