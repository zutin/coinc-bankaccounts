import { ApiProperty } from "@nestjs/swagger";

export class DeleteBankAccountRequest {
  @ApiProperty({ example: "1234567890" })
  id: string;
}

export type DeleteBankAccountResponse = {
  code: number;
  message: string;
};
