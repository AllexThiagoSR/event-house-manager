import IEvent from './IEvent';
import IUser from './IUser';

export default interface EventWithUsers extends IEvent {
  signedUsers: IUser[];
}
