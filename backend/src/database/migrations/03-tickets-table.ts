import { DataTypes, Model, QueryInterface } from "sequelize";
import ITicket from "../../interfaces/ITicket";

export default {
  up: async (queryInterface: QueryInterface) => queryInterface.createTable<Model<ITicket>>(
    'tickets',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'user_id',
        references: {
          key: 'id',
          model: 'users',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      eventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'event_id',
        references: {
          key: 'id',
          model: 'events',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ticketToken: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'ticket_token',
      },
      used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    }
  ),
  down: async (queryInterface: QueryInterface) => queryInterface.dropTable('tickets'),
}
