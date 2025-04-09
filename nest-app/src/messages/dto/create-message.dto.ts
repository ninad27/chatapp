// src/messages/dto/create-message.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  @IsNotEmpty()
  from: number;

  @IsNumber()
  @IsNotEmpty()
  to: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}
