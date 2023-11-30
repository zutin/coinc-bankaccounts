import { BankAccount } from '../../core/entities';

export type FindBankAccountResponse = {
  code: number;
  message: string;
  bankAccount?: BankAccount;
};
