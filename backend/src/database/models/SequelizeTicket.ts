import {
  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '.';

class SequelizeTicket extends Model<
  InferAttributes<SequelizeTicket>,
  InferCreationAttributes<SequelizeTicket>
> {
  declare userId: number;
  declare eventId: number;
  declare ticketToken: string | null;
  declare used: CreationOptional<boolean>;
}

SequelizeTicket.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        key: 'id',
        model: 'users',
      },
    },
    eventId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        key: 'id',
        model: 'events',
      },
    },
    ticketToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    tableName: 'tickets',
    underscored: true,
    timestamps: false,
    sequelize: db,
  }
);

export default SequelizeTicket;
