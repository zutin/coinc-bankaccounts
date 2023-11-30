import { Module } from '@nestjs/common';
import { BankAccountController } from './controllers/bankAccount.controller';
import { DataServicesModule } from './services/database/dataServices.module';
import { BankAccountUseCaseModule } from './usecases';

@Module({
  imports: [BankAccountUseCaseModule, DataServicesModule],
  controllers: [BankAccountController],
  providers: [],
})
export class AppModule {}
