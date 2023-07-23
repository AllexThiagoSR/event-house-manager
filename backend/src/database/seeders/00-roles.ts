import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => queryInterface.bulkInsert(
    'roles',
    [
      {
        name: 'Administrator',
      },
      {
        name: 'User',
      },
    ]
  ),
  down: async (queryInterface: QueryInterface) => queryInterface.bulkDelete('roles', {}),
}
