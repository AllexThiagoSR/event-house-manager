export interface Create<T>{
  create(data: Partial<T>): T;
}

export interface Read<T>{
  getAll(query?: object): T[];
  getById(id: number | string): T;
}
