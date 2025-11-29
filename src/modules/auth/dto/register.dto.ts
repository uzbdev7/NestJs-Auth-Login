import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsMobilePhone,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  age: number;

  @IsMobilePhone()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
