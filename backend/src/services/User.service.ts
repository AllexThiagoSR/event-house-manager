import NewEntity from '../interfaces/NewEntity';
import UserModel from '../models/User.model';
import IUser from '../interfaces/IUser';
import ServiceReturn, { ErrorReturn } from '../interfaces/ServiceReturn';
import BCrypt from '../utils/BCrypt';

export default class UserService {
  private model: UserModel;
  private internalError = { status: 500, data: { message: 'Internal sever error' } } as ErrorReturn;

  constructor(m: UserModel = new UserModel()) {
    this.model = m
  }

  async create(data: NewEntity<IUser>): Promise<ServiceReturn<Partial<IUser>>> {
    try {
      const password = BCrypt.hash(data.password);
      const user = await this.model.create({ ...data, password, roleId: 2 });
      return { status: 201, data: { ...user, password: undefined } };
    } catch (error) {
      if ((error as Error).name === 'SequelizeUniqueConstraintError') {
        return { status: 409, data: { message: 'Email already registered' } };
      }
      return this.internalError;
    }
  }

  async deleteUser(id: number | string): Promise<ServiceReturn<undefined>> {
    try {
      await this.model.deleteUser(id);
      return { status: 204, data: undefined };
    } catch (error) {
      return this.internalError;
    }
  }

  async update(
    id: number | string, newData: Partial<IUser>,
  ): Promise<ServiceReturn<IUser>> {
    try {
      await this.model.update(id, newData);
      const user = await this.model.getById(id);
      if (!user) return { status: 400, data: { message: 'User not found' } };
      return { status: 200, data: user };
    } catch (error) {
      return this.internalError;
    }
  }
}
