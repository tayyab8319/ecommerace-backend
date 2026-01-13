import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty({ message: "'First Name Required'" })
  @IsString()
  @MaxLength(30)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
