import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../core/abstracts/dataServices.abstract';
import {
  CreateBankAccountRequest,
  CreateBankAccountResponse,
} from './createBankAccount.dto';
import { BankAccountFactoryService } from '../bankAccountFactory.service';

@Injectable()
export class CreateBankAccountUseCase {
  constructor(
    private dataServices: IDataServices,
    private bankAccountFactoryService: BankAccountFactoryService,
  ) {}

  async execute(
    createBankAccountRequest: CreateBankAccountRequest,
  ): Promise<CreateBankAccountResponse> {
    try {
      const bankAccount = this.bankAccountFactoryService.createBankAccount(
        createBankAccountRequest,
      );
      const createdBankAccount =
        await this.dataServices.bankAccount.create(bankAccount);

      if (createdBankAccount) {
        const response: CreateBankAccountResponse = {
          code: 200,
          message: `Bank Account ${createBankAccountRequest.name} created successfully`,
        };

        return response;
      } else {
        const response: CreateBankAccountResponse = {
          code: 400,
          message: 'Bank Account creation failed',
        };

        return response;
      }
    } catch (e) {
      return {
        code: 400,
        message: 'Invalid parameter',
      };
    }
  }
}
