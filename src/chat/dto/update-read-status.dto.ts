import { IsUUID } from 'class-validator';

export class UpdateReadStatusDto {
  @IsUUID()
  conversationId: string;

  @IsUUID()
  userId: string;
}
