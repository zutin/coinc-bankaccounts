import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../core';
import { FindBankAccountResponse } from './findBankAccount.dto';

@Injectable()
export class FindBankAccountUseCase {
  constructor(private dataServices: IDataServices) {}

  async execute(id: string): Promise<FindBankAccountResponse> {
    try {
      const bankAccount = await this.dataServices.bankAccount.get(id);

      if (bankAccount) {
        const response: FindBankAccountResponse = {
          code: 200,
          message: 'Bank Account found',
          bankAccount: bankAccount,
        };

        return response;
      } else {
        const response: FindBankAccountResponse = {
          code: 404,
          message: 'Bank Account not found',
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
