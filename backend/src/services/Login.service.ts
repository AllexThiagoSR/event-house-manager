import BCrypt from '../utils/BCrypt';
import ServiceReturn from '../interfaces/ServiceReturn';
import UserModel from '../models/User.model';
import Token from '../utils/Token';

export default class LoginService {
  private model: UserModel;
  
  constructor(m: UserModel = new UserModel()) {
    this.model = m;
  }

  public async login(data: { email: string, password: string }): 
    Promise<ServiceReturn<{ token: string }>> {
    try {
      const user = await this.model.getByEmail(data.email);
      if (!user || !BCrypt.compare(data.password, user.password)) {
        return { status: 401, data: { message: 'Unauthorized user' } };
      }
      const token = new Token().generateToken({
        id: user.id,
        name: user.name,
        roleId: user.roleId,
      })
      return { status: 200, data: { token } }
    } catch (error) {
      return { status: 500, data: { message: 'Internal server error' } };
    }
  }
}
