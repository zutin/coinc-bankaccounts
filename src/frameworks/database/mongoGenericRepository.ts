import { Model } from 'mongoose';
import { IGenericRepository } from '../../core';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  get(id: string): Promise<T> {
    return this._repository
      .findById(id)
      .populate(this._populateOnFind)
      .exec() as Promise<T>;
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  update(id: string, item: T): Promise<T | null> {
    return this._repository.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  delete(id: string): Promise<T | null> {
    return this._repository.findByIdAndDelete(id).exec();
  }
}
