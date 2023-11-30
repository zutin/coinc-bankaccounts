import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from '../../core/abstracts/dataServices.abstract';
import { MongoGenericRepository } from './mongoGenericRepository';
import { BankAccount, BankAccountDocument } from './model/bankAccount.model';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  bankAccount: MongoGenericRepository<BankAccount>;

  constructor(
    @InjectModel(BankAccount.name)
    private BankAccountRepository: Model<BankAccountDocument>,
  ) {}

  onApplicationBootstrap() {
    this.bankAccount = new MongoGenericRepository<BankAccount>(
      this.BankAccountRepository,
    );
  }
}
