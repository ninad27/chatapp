import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @MinLength(2, { message: 'from must have atleast 2 characters.' })
  @IsNotEmpty()
  from: string;

  @IsString()
  @MinLength(2, { message: 'to must have atleast 2 characters.' })
  @IsNotEmpty()
  to: string;

  @IsString()
  @MinLength(2, { message: 'message must have atleast 2 characters.' })
  @IsNotEmpty()
  message: string;
}
