import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../core';
import { DeleteBankAccountResponse } from './deleteBankAccount.dto';

@Injectable()
export class DeleteBankAccountUseCase {
  constructor(private dataServices: IDataServices) {}

  async execute(id: string): Promise<DeleteBankAccountResponse> {
    try {
      const deletedBankAccount = await this.dataServices.bankAccount.delete(id);

      if (deletedBankAccount) {
        const response: DeleteBankAccountResponse = {
          code: 200,
          message: `Bank Account deleted successfully`,
        };

        return response;
      } else {
        const response: DeleteBankAccountResponse = {
          code: 400,
          message: 'Bank Account deletion failed',
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
