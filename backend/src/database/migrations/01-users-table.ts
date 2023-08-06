import { DataTypes, Model, QueryInterface } from "sequelize";
import IUser from '../../interfaces/IUser';

export default {
  up: async (queryInterface: QueryInterface) => queryInterface.createTable<Model<IUser>>(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
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
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        references: {
          model: 'roles',
          key: 'id',
        },
        field: 'role_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
  ),
  down: async (queryInterface: QueryInterface) => queryInterface.dropTable('users'),
}
