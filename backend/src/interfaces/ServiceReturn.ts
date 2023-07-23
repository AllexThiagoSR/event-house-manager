type StatusCodeOk = 200 | 201 | 204;
type StatusCodeError = 400 | 401 | 404 | 500 | 409;

type ServiceReturn<T> = { status: StatusCodeOk, data: T } 
  | { status: StatusCodeError, data: { message: string } };

export default ServiceReturn;
