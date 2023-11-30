import { Module } from '@nestjs/common';
import { DataServicesModule } from '../services/database/dataServices.module';
import { BankAccountFactoryService } from './bankAccountFactory.service';
import { CreateBankAccountUseCase } from './createBankAccount';
import { FindBankAccountUseCase } from './findBankAccount';
import { UpdateBankAccountUseCase } from './updateBankAccount';
import { DeleteBankAccountUseCase } from './deleteBankAccount';

@Module({
    imports: [DataServicesModule],
    providers: [BankAccountFactoryService, CreateBankAccountUseCase, FindBankAccountUseCase, UpdateBankAccountUseCase, DeleteBankAccountUseCase],
    exports: [BankAccountFactoryService, CreateBankAccountUseCase, FindBankAccountUseCase, UpdateBankAccountUseCase, DeleteBankAccountUseCase],
})
export class BankAccountUseCaseModule {}