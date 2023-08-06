type StatusCodeOk = 200 | 201 | 204;
type StatusCodeError = 400 | 401 | 404 | 500 | 409;
export type ErrorReturn = { status: StatusCodeError, data: { message: string } };
export type SuccessReturn<T> = { status: StatusCodeOk, data: T };
type ServiceReturn<T> = SuccessReturn<T>
  | ErrorReturn;

export default ServiceReturn;
