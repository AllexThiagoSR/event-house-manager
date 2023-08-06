import NewEntity from "./NewEntity";

export interface Create<T>{
  create(data: NewEntity<T>): T;
}

export interface Read<T>{
  getAll(query?: object): T[];
  getById(id: number | string): T;
}
