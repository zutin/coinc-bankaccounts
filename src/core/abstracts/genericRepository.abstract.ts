export abstract class IGenericRepository<T> {
  abstract get(id: string): Promise<T>;
  abstract create(item: T): Promise<T>;
  abstract update(id: string, item: T): Promise<T>;
  abstract delete(id: string): Promise<T>;
  abstract getAll(id: string): Promise<T[]>;
}
