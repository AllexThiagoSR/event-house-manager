import NewEntity from '../interfaces/NewEntity';
import UserModel from '../models/User.model';
import IUser from '../interfaces/IUser';
import ServiceReturn from '../interfaces/ServiceReturn';
import BCrypt from '../utils/BCrypt';

export default class UserService {
  private model: UserModel;

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
      return { status: 500, data: { message: 'Internal server error' } };
    }
  }
}
