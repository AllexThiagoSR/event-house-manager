import {
  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '.';
import SequelizeUser from './SequelizeUser';
import SequelizeTicket from './SequelizeTicket';

class SequelizeEvent extends Model<
  InferAttributes<SequelizeEvent>,
  InferCreationAttributes<SequelizeEvent>
> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare date: Date;
  declare time: string;
  declare privateEvent: boolean;
  declare ticketsQuantity: number | null;
  declare needTicket: boolean;
}

SequelizeEvent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
      defaultValue: false,
    },
    ticketsQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    needTicket: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    sequelize: db,
    tableName: 'events',
    underscored: true,
    timestamps: false,
  },
);

SequelizeEvent.belongsToMany(
  SequelizeUser,
  {
    through: SequelizeTicket,
    as: 'signedUsers',
    foreignKey: 'eventId',
    otherKey: 'userId',
  },
);

SequelizeUser.belongsToMany(
  SequelizeEvent,
  {
    through: SequelizeTicket,
    as: 'signedEvents',
    foreignKey: 'userId',
    otherKey: 'eventId',
  }
);

export default SequelizeEvent;
