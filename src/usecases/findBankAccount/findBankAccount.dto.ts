import { BankAccount } from '../../core/entities/bankAccount.entity';

export type FindBankAccountResponse = {
  code: number;
  message: string;
  bankAccount?: BankAccount;
};
