import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from ".";

class SequelizeEvent extends Model<
  InferAttributes<SequelizeEvent>,
  InferCreationAttributes<SequelizeEvent>
> {
  declare id: CreationOptional<number>;
  declare description: string;
  declare date: Date;
  declare time: string;
  declare privateEvent: boolean;
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
    }
  },
  {
    sequelize: db,
    tableName: 'events',
    underscored: true,
    timestamps: false,
  },
);

export default SequelizeEvent;
