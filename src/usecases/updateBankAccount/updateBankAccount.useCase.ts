import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../core';
import {
  UpdateBankAccountRequest,
  UpdateBankAccountResponse,
} from './updateBankAccount.dto';
import { BankAccountFactoryService } from '../bankAccountFactory.service';

@Injectable()
export class UpdateBankAccountUseCase {
  constructor(
    private dataServices: IDataServices,
    private bankAccountFactoryService: BankAccountFactoryService,
  ) {}

  async execute(
    id: string,
    updateBankAccountRequest: UpdateBankAccountRequest,
  ): Promise<UpdateBankAccountResponse> {
    try {
      const bankAccount = this.bankAccountFactoryService.updateBankAccount(
        updateBankAccountRequest,
      );
      const updatedBankAccount = await this.dataServices.bankAccount.update(
        id,
        bankAccount,
      );

      if (updatedBankAccount) {
        const response: UpdateBankAccountResponse = {
          code: 200,
          message: `Bank Account ${id} updated successfully`,
        };

        return response;
      } else {
        const response: UpdateBankAccountResponse = {
          code: 400,
          message: 'Bank Account update failed',
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
