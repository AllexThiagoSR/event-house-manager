import { QueryInterface } from "sequelize";
import * as bcrypt from 'bcryptjs';

export default {
  up: async (queryInterface: QueryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        name: 'ADM',
        email: 'allexthiagodev@gmail.com',
        password: bcrypt.hashSync(process.env.ADM_PASSWORD || '123456789', 12),
        role_id: 1,
      }
    ],
  ),
  down: async (queryInterface: QueryInterface) => queryInterface.bulkDelete('users', {}),
}
