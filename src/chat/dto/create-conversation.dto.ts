import { IsUUID, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class CreateConversationDto {
  @IsBoolean()
  isGroup: boolean;

  @IsUUID()
  @IsArray()
  participantIds: string[];

  @IsOptional()
  name?: string;

  @IsOptional()
  groupIcon?: string;
}
