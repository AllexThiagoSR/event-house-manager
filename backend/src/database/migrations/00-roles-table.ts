import { DataTypes, Model, QueryInterface } from "sequelize";
import IRole from "../../interfaces/IRole";

export default {
  up: async (queryInterface: QueryInterface) => queryInterface.createTable<Model<IRole>>(
    'roles',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }
  ),
  down: async (queryInterface: QueryInterface) => queryInterface.dropTable('roles'),
}
