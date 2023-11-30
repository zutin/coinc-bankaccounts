import { BankAccountController } from "./bankAccount.controller";
import { CreateBankAccountUseCase, FindBankAccountUseCase, UpdateBankAccountUseCase, DeleteBankAccountUseCase } from "../usecases";
import { IDataServices } from "../core";
import { BankAccountFactoryService } from "../usecases/bankAccountFactory.service";
import { IGenericRepository } from "../core/abstracts/genericRepository.abstract";
import { BankAccount } from "../core/entities/bankAccount.entity";

describe('BankAccountController', () => {
    let bankAccountController: BankAccountController;
    let createBankAccountUseCase: CreateBankAccountUseCase;
    let updateBankAccountUseCase: UpdateBankAccountUseCase;
    let deleteBankAccountUseCase: DeleteBankAccountUseCase;
    let findBankAccountUseCase: FindBankAccountUseCase;
    let bankAccountFactoryService: BankAccountFactoryService;
    let bankAccountRepository: IGenericRepository<BankAccount>;
    let dataServices: IDataServices;

    beforeEach(async () => {
        bankAccountRepository = {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            get: jest.fn(),
        };

        dataServices = {
            bankAccount: bankAccountRepository,
        };

        bankAccountFactoryService = new BankAccountFactoryService();

        createBankAccountUseCase = new CreateBankAccountUseCase(dataServices, bankAccountFactoryService);
        updateBankAccountUseCase = new UpdateBankAccountUseCase(dataServices, bankAccountFactoryService);
        deleteBankAccountUseCase = new DeleteBankAccountUseCase(dataServices);
        findBankAccountUseCase = new FindBankAccountUseCase(dataServices);

        bankAccountController = new BankAccountController(createBankAccountUseCase, updateBankAccountUseCase, deleteBankAccountUseCase, findBankAccountUseCase);
    });

    describe('When findBankAccount success', () => {
        it('should return code 200 and a bank account', async () => {
            const bankAccount = {
                _id: '123456789',
                userId: '987654321',
                name: 'Bank Account',
                color: '#FFFFFF',
                balance: 999.99
            };
    
            const userInput = '123456789';
    
            jest.spyOn(bankAccountRepository, 'get').mockImplementation(async (userInput) => {
                if (userInput === bankAccount._id) {
                    return bankAccount;
                } else {
                    throw new Error('Input does not match');
                }
            });
    
            const response = await bankAccountController.findBankAccount(userInput);
    
            expect(response.code).toBe(200);
            expect(response.bankAccount).toBe(bankAccount);
        });
    });

    describe('When findBankAccount fails', () => {
        it('should return code 404 when account not found', async () => {
            const bankAccount = {
                _id: '123456789',
                userId: '987654321',
                name: 'Bank Account',
                color: '#FFFFFF',
                balance: 999.99
            };
    
            const userInput = '987654321';
    
            jest.spyOn(bankAccountRepository, 'get').mockImplementation(async (userInput) => {
                if (userInput === bankAccount._id) {
                    return bankAccount;
                } else {
                    throw new Error('Input does not match');
                }
            });
    
            const response = await bankAccountController.findBankAccount(userInput);
    
            expect(response.code).toBe(404);
        });
    });

    describe('When createBankAccount success', () => {
        it('should return code 200 and a success message', async () => {
            const userInput = {
                userId: '987654321',
                name: 'Bank Account',
                color: '#FFFFFF',
                balance: 999.99
            };
        
            jest.spyOn(bankAccountRepository, 'create').mockResolvedValue(userInput);
        
            const response = await bankAccountController.createBankAccount(userInput);
        
            expect(response.code).toBe(200);
            expect(response.message).toBe(`Bank Account ${userInput.name} created successfully`);
        });        
    });

    describe('When createBankAccount fails', () => {
        it('should return code 400 and a failure message', async () => {
            const userInput = {
                userId: '987654321',
                name: 'Bank Account',
                color: '#FFFFFF',
                balance: 999.99
            };
        
            jest.spyOn(bankAccountRepository, 'create').mockRejectedValue(new Error('Error creating bank account'));
        
            const response = await bankAccountController.createBankAccount(userInput);
        
            expect(response.code).toBe(400);
            expect(response.message).toBe('Bank Account creation failed');
        });        
    });

    describe('When updateBankAccount success', () => {
        it('should return code 200 and a success message', async () => {
            const bankAccount = {
                _id: '123456789',
                userId: '987654321',
                name: 'Bank Account',
                color: '#FFFFFF',
                balance: 999.99
            };

            const userInput = {
                userId: '123456789',
                name: 'Updated Account',
                color: '#000000',
                balance: 111.11
            }
        
            jest.spyOn(bankAccountRepository, 'update').mockResolvedValue(userInput);
        
            const response = await bankAccountController.updateBankAccount(bankAccount._id, userInput);
        
            expect(response.code).toBe(200);
            expect(response.message).toBe(`Bank Account ${bankAccount._id} updated successfully`);
        });
    });

});