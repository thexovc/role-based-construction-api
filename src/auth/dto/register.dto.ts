import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
