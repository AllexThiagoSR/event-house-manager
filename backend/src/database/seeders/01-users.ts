import { QueryInterface } from "sequelize";
import * as bcrypt from 'bcryptjs';

export default {
  up: async (queryInterface: QueryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        name: 'ADM',
        email: process.env.ADM_EMAIL || 'admin@admin.com',
        password: bcrypt.hashSync(process.env.ADM_PASSWORD || '123456789', 12),
        role_id: 1,
      },
      {
        name: 'user',
        email: 'user@gmail.com',
        password: bcrypt.hashSync('123456789', 12),
        role_id: 2,
      },
    ],
  ),
  down: async (queryInterface: QueryInterface) => queryInterface.bulkDelete('users', {}),
}
