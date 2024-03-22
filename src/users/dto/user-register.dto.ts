import { IsEmail, IsString, Length } from 'class-validator';

export class UserRegisterDto {
  @IsEmail()
  email: string;

  @Length(6, 125)
  password: string;

  @IsString()
  name: string;
}
