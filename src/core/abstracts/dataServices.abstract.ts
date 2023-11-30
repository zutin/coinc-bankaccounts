import { BankAccount } from '../entities/bankAccount.entity';
import { IGenericRepository } from './genericRepository.abstract';

export abstract class IDataServices {
  abstract bankAccount: IGenericRepository<BankAccount>;
}
