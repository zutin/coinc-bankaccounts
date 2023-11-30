import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateBankAccountRequest, CreateBankAccountResponse, FindBankAccountResponse, UpdateBankAccountRequest } from '../usecases';
import { CreateBankAccountUseCase, UpdateBankAccountUseCase, DeleteBankAccountUseCase, FindBankAccountUseCase } from '../usecases';
import { ApiParam } from '@nestjs/swagger';

@Controller('/bank-accounts')
export class BankAccountController {
    constructor(
        private createBankAccountUseCase: CreateBankAccountUseCase,
        private updateBankAccountUseCase: UpdateBankAccountUseCase,
        private deleteBankAccountUseCase: DeleteBankAccountUseCase,
        private findBankAccountUseCase: FindBankAccountUseCase
    ) {}

    @Get(':id')
    @ApiParam({ name: 'id', type: String, example: '653beea9a2bf942f45771b51'})
    async findBankAccount(@Param('id') id: string): Promise<FindBankAccountResponse> {
        try{
            const bankAccount = await this.findBankAccountUseCase.execute(id);
                
            if (bankAccount.code === 200) {
                const response: FindBankAccountResponse = {
                    code: 200,
                    message: 'Bank Account found',
                    bankAccount: bankAccount.bankAccount,
                };
    
                return response;
            } else {
                const response: FindBankAccountResponse = {
                    code: 404,
                    message: 'Bank Account not found',
                };
    
                return response;
            }
        } catch(e){
            return {
                code: 400,
                message: 'Invalid parameter',
            }
        }
    }

    @Post()
    async createBankAccount(
        @Body() createBankAccountRequest: CreateBankAccountRequest): Promise<CreateBankAccountResponse> {
        
            try {
                const bankAccount = await this.createBankAccountUseCase.execute(createBankAccountRequest);
                
                if(bankAccount.code === 200) {
                    const response: CreateBankAccountResponse = {
                        code: 200,
                        message: `Bank Account ${createBankAccountRequest.name} created successfully`,
                    }

                    return response
                } else {
                    const response: CreateBankAccountResponse = {
                        code: 400,
                        message: 'Bank Account creation failed',
                    }

                    return response
                }
            } catch (e) {
                return {
                    code: 400,
                    message: 'Invalid parameter',
                }
            }
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: String, example: '653beeb6a2bf942f45771b53'})
    async updateBankAccount(
        @Param('id') id: string,
        @Body() bankaccount: UpdateBankAccountRequest,
    ) {
        return this.updateBankAccountUseCase.execute(id, bankaccount);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: String, example: '653beebfa2bf942f45771b55'})
    async deleteBankAccount(@Param('id') id: string) {
        return this.deleteBankAccountUseCase.execute(id);
    }
}
