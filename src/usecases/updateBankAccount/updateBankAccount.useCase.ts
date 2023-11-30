import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../core/abstracts/dataServices.abstract';
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
    updateBankAccountRequest: UpdateBankAccountRequest,
  ): Promise<UpdateBankAccountResponse> {
    try {
      const bankAccount = this.bankAccountFactoryService.updateBankAccount(
        updateBankAccountRequest,
      );
      const updatedBankAccount = await this.dataServices.bankAccount.update(
        updateBankAccountRequest.id,
        bankAccount,
      );

      if (updatedBankAccount) {
        const response: UpdateBankAccountResponse = {
          code: 200,
          message: `Bank Account ${updateBankAccountRequest.id} updated successfully`,
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
