import { Create, Read } from './ICRUD';
import IUser from './IUser';

export default interface IUserModel extends Create<IUser>, Read<IUser> {}
