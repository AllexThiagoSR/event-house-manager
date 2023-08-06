import IUser from '../interfaces/IUser';
import SequelizeUser from '../database/models/SequelizeUser';
import IUserModel from '../interfaces/IUserModel';
import NewEntity from '../interfaces/NewEntity';

export default class UserModel implements IUserModel {
  model = SequelizeUser;

  public async getByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.model.findOne({ where: { email }});
    return user?.dataValues;
  }

  public async getAll(): Promise<IUser[]> {
    const users = await this.model.findAll();
    return users;
  }

  public async getById(id: string | number): Promise<IUser | undefined> {
    const user = await this.model.findByPk(id, { attributes: { exclude: ['password'] } });
    return user?.dataValues;
  }

  public async create(data: NewEntity<IUser>): Promise<IUser> {
    const newUser = await this.model.create(data);
    return newUser.dataValues;
  }

  public async deleteUser(id: string | number) {
    const affectedRows = await this.model.destroy({ where: { id } });
    return affectedRows;
  }

  public async update(id: string | number, newData: Partial<IUser>) {
    const affectedRows = await this.model.update(newData, { where: { id } });
    return affectedRows;
  }
}