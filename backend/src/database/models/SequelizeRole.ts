import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from ".";

class SequelizeRole extends Model<
  InferAttributes<SequelizeRole>,
  InferCreationAttributes<SequelizeRole>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

SequelizeRole.init(
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
    }
  },
  {
    sequelize: db,
    tableName: 'roles',
    underscored: true,
    timestamps: false,
  },
);

export default SequelizeRole;
