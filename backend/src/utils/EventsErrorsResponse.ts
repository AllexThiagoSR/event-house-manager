import { ErrorReturn } from '../interfaces/ServiceReturn';

export default {
  internalError: { 
    status: 500, data: { message: 'Internal Server error' },
  } as ErrorReturn,
  noTickets: { status: 409, data: { message: 'No more tickets' } } as ErrorReturn,
  notFound: { status: 404, data: { message: 'Event not found' } } as ErrorReturn,
  userNotFound: { status: 404, data: { message: 'User not found' } } as ErrorReturn,
  expireTimeHasPassed: {
    status: 409, data: { message: 'Event has already passed' },
  } as ErrorReturn,
  needInvite: { status: 401, data: { message: 'You can\'t sign to this event' } } as ErrorReturn,
  userAlreadySigned: { 
    status: 409, data: { message: 'User has already been signed to this event' },
  } as ErrorReturn,
  doNotNeedInvite: { 
    status: 400, data: { message: 'This event do not need invite' },
  } as ErrorReturn,
};

export type MappedErrors = 'internalError' | 'noTickets' | 'notFound' | 'userNotFound' 
  | 'expireTimeHasPassed' | 'needInvite' | 'doNotNeedInvite';