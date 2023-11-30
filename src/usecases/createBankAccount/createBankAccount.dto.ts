import { ApiProperty } from '@nestjs/swagger';

export class CreateBankAccountRequest {
  @ApiProperty({ example: '1234567890' })
  userId: string;

  @ApiProperty({ example: 'My Bank Account' })
  name: string;

  @ApiProperty({ example: '#FFFFFF', required: false })
  color?: string;

  @ApiProperty({ example: 1000 })
  balance: number;
}

export class CreateBankAccountResponse {
  code: number;
  message: string;
}
