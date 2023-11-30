import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../core/abstracts/dataServices.abstract';
import { FindAllUserBankAccountResponse } from './findAllUserBankAccount.dto';

@Injectable()
export class FindAllUserBankAccountUseCase {
    constructor(private dataServices: IDataServices) {}

    async execute(id: string): Promise<FindAllUserBankAccountResponse> {
        try {
        const bankAccounts = await this.dataServices.bankAccount.getAll(id);

        if (bankAccounts && bankAccounts.length > 0) {
            const response: FindAllUserBankAccountResponse = {
            code: 200,
            message: 'Bank accounts found',
            bankAccounts: bankAccounts,
            };

            return response;
        } else {
            const response: FindAllUserBankAccountResponse = {
            code: 404,
            message: 'No bank accounts found',
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
