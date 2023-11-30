import { Module } from '@nestjs/common';
import { DataServicesModule } from '../services/database/dataServices.module';
import { BankAccountFactoryService } from './bankAccountFactory.service';
import { CreateBankAccountUseCase } from './createBankAccount/createBankAccount.useCase';
import { FindBankAccountUseCase } from './findBankAccount/findBankAccount.useCase';
import { UpdateBankAccountUseCase } from './updateBankAccount/updateBankAccount.useCase';
import { DeleteBankAccountUseCase } from './deleteBankAccount/deleteBankAccount.useCase';
import { FindAllUserBankAccountUseCase } from './findAllUserBankAccount/findAllUserBankAccount.useCase';

@Module({
    imports: [DataServicesModule],
    providers: [BankAccountFactoryService, CreateBankAccountUseCase, FindBankAccountUseCase, UpdateBankAccountUseCase, DeleteBankAccountUseCase, FindAllUserBankAccountUseCase],
    exports: [BankAccountFactoryService, CreateBankAccountUseCase, FindBankAccountUseCase, UpdateBankAccountUseCase, DeleteBankAccountUseCase, FindAllUserBankAccountUseCase],
})
export class BankAccountUseCaseModule {}