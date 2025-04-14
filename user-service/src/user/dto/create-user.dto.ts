import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  address: string;

  @IsOptional()
  city: string;

  @IsOptional()
  state: string;

  @IsOptional()
  country: string;

  @IsOptional()
  zipCode: string;
}
