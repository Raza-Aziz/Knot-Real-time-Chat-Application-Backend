import { IsUUID, IsString, IsEnum, IsOptional } from 'class-validator';

export class MessageDto {
  @IsUUID()
  senderId!: string;

  @IsUUID()
  conversationId!: string;

  @IsString()
  content: string;

  @IsEnum(['TEXT', 'IMAGE'])
  type: 'TEXT' | 'IMAGE';

  @IsOptional()
  fileUrl?: string;
}

// ! The Structural Guardrail: Your backend will enforce that at least one of these fields—content or fileUrl—is populated.
// ! A user cannot send a completely blank message.
