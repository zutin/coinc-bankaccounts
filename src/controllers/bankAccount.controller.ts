import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateBankAccountRequest, CreateBankAccountResponse } from '../usecases/createBankAccount/createBankAccount.dto';
import { FindBankAccountResponse } from '../usecases/findBankAccount/findBankAccount.dto';
import { DeleteBankAccountRequest } from 'src/usecases/deleteBankAccount/deleteBankAccount.dto';
import { UpdateBankAccountRequest } from '../usecases/updateBankAccount/updateBankAccount.dto';
import { CreateBankAccountUseCase } from '../usecases/createBankAccount/createBankAccount.useCase';
import { UpdateBankAccountUseCase } from '../usecases/updateBankAccount/updateBankAccount.useCase';
import { DeleteBankAccountUseCase } from '../usecases/deleteBankAccount/deleteBankAccount.useCase';
import { FindBankAccountUseCase } from '../usecases/findBankAccount/findBankAccount.useCase';
import { FindAllUserBankAccountResponse } from 'src/usecases/findAllUserBankAccount/findAllUserBankAccount.dto';
import { FindAllUserBankAccountUseCase } from '../usecases/findAllUserBankAccount/findAllUserBankAccount.useCase';
import { ApiParam } from '@nestjs/swagger';

@Controller('/bank-accounts')
export class BankAccountController {
    constructor(
        private createBankAccountUseCase: CreateBankAccountUseCase,
        private updateBankAccountUseCase: UpdateBankAccountUseCase,
        private deleteBankAccountUseCase: DeleteBankAccountUseCase,
        private findBankAccountUseCase: FindBankAccountUseCase,
        private findAllUserBankAccountUseCase: FindAllUserBankAccountUseCase,
    ) {}

    @Get(':id')
    @ApiParam({ name: 'id', type: String, example: '5f9d7a3b9d3f2b1b7c9b9b1a' })
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

    @Get('/user/:id')
    @ApiParam({ name: 'id', type: String, example: '1234567890' })
    async findAllUserBankAccount(@Param('id') id: string): Promise<FindAllUserBankAccountResponse> {
        try{
            const bankAccounts = await this.findAllUserBankAccountUseCase.execute(id);
                
            if (bankAccounts.code === 200) {
                const response: FindAllUserBankAccountResponse = {
                    code: 200,
                    message: 'Bank Accounts found',
                    bankAccounts: bankAccounts.bankAccounts,
                };
    
                return response;
            } else {
                const response: FindAllUserBankAccountResponse = {
                    code: 404,
                    message: 'No bank accounts found',
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
    async createBankAccount(@Body() createBankAccountRequest: CreateBankAccountRequest): Promise<CreateBankAccountResponse> {
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

    @Put()
    async updateBankAccount(@Body() updateBankAccountRequest: UpdateBankAccountRequest) {
        return this.updateBankAccountUseCase.execute(updateBankAccountRequest);
    }

    @Delete()
    async deleteBankAccount(@Body() deleteBankAccountRequest: DeleteBankAccountRequest) {
        return this.deleteBankAccountUseCase.execute(deleteBankAccountRequest);
    }
}
