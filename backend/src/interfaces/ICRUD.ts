import NewEntity from './NewEntity';

export interface Create<T>{
  create(data: NewEntity<T>): Promise<T>;
}

export interface Read<T>{
  getAll(query?: object): Promise<T[]>;
  getById(id: number | string): Promise<T | undefined>;
}
