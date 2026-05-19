import { IsOptional, IsUUID } from 'class-validator';

export class GetMessagesDto {
  @IsUUID()
  conversationId: string;

  limit: number;

  @IsOptional()
  cursor?: string;
}
