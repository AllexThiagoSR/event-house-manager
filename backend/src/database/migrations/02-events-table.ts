import { DataTypes, Model, QueryInterface } from "sequelize";
import IEvent from "../../interfaces/IEvent";

export default {
  up: async (queryInterface: QueryInterface) => queryInterface.createTable<Model<IEvent>>(
    'events',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      privateEvent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'private_event',
        defaultValue: false,
      }
    }
  ),
  down: async (queryInterface: QueryInterface) => queryInterface.dropTable('events'),
}
