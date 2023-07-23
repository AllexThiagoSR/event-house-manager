import { DataTypes, Model, QueryInterface } from "sequelize";
import IUser from '../../interfaces/IUser';

export default {
  up: async (queryInterface: QueryInterface) => queryInterface.createTable<Model<IUser>>(
    'users',
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
  ),
  down: async (queryInterface: QueryInterface) => queryInterface.dropTable('users'),
}
