import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => queryInterface.bulkInsert(
    'test',
    [
      {
        name: 'test 1',
      },
      {
        name: 'test 2',
      }
    ]
  ),
}
