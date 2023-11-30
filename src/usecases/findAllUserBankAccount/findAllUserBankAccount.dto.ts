import { BankAccount } from '../../core/entities/bankAccount.entity';

export type FindAllUserBankAccountResponse = {
    code: number;
    message: string;
    bankAccounts?: BankAccount[];
};