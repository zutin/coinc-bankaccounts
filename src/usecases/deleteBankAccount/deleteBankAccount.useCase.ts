import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../core/abstracts/dataServices.abstract';
import { DeleteBankAccountRequest, DeleteBankAccountResponse } from './deleteBankAccount.dto';

@Injectable()
export class DeleteBankAccountUseCase {
  constructor(private dataServices: IDataServices) {}

  async execute(deleteBankAccountRequest: DeleteBankAccountRequest): Promise<DeleteBankAccountResponse> {
    try {
      const deletedBankAccount = await this.dataServices.bankAccount.delete(deleteBankAccountRequest.id);

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
