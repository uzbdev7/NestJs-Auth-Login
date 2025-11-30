import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsEnum,
  Min,
  IsMobilePhone,
} from 'class-validator';
import { UserRole } from 'src/type/user.role';

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

  @IsEnum(UserRole)
  role: UserRole;
}
