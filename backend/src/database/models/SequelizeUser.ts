import { 
  CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '.';
import SequelizeRole from './SequelizeRole';

class SequelizeUser extends Model<
  InferAttributes<SequelizeUser>,
  InferCreationAttributes<SequelizeUser>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare roleId: number;
}

SequelizeUser.init(
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
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize: db,
    tableName: 'users',
    underscored: true,
    timestamps: false,
  },
);

SequelizeUser.belongsTo(SequelizeRole, { foreignKey: 'roleId', as: 'role', targetKey: 'id' });

SequelizeRole.hasMany(SequelizeUser, { foreignKey: 'roleId', as: 'users', sourceKey: 'id' });

export default SequelizeUser;
