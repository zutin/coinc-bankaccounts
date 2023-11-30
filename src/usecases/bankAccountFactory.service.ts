import { Injectable } from '@nestjs/common';
import { BankAccount } from '../core/entities/bankAccount.entity';
import { CreateBankAccountRequest } from './createBankAccount/createBankAccount.dto';
import { UpdateBankAccountRequest } from './updateBankAccount/updateBankAccount.dto';

@Injectable()
export class BankAccountFactoryService {
  createBankAccount(createBankAccountRequest: CreateBankAccountRequest) {
    const bankAccount = new BankAccount();

    bankAccount.userId = createBankAccountRequest.userId;
    bankAccount.name = createBankAccountRequest.name;
    bankAccount.color = createBankAccountRequest.color;
    bankAccount.balance = createBankAccountRequest.balance;

    return bankAccount;
  }

  updateBankAccount(updateBankAccountRequest: UpdateBankAccountRequest) {
    const bankAccount = new BankAccount();

    bankAccount.name = updateBankAccountRequest.name;
    bankAccount.color = updateBankAccountRequest.color;
    bankAccount.balance = updateBankAccountRequest.balance;

    return bankAccount;
  }
}
