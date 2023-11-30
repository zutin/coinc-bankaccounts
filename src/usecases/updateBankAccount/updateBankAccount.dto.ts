import { ApiProperty } from '@nestjs/swagger';

export class UpdateBankAccountRequest {
  @ApiProperty({ example: '1234567890' })
  id: string;

  @ApiProperty({ example: 'Updated Bank Account', required: false })
  name?: string;

  @ApiProperty({ example: '#000000', required: false })
  color?: string;

  @ApiProperty({ example: 9999, required: false })
  balance?: number;
}

export class UpdateBankAccountResponse {
  code: number;
  message: string;
}
