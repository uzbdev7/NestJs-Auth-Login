// interface ExtraRegister implements RegisterDto{
//     id:number
// }


import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private users: any[] = [];

  constructor(private jwtService: JwtService) {}

  private generateToken(id: number) {
    return {
      success: true,
      accessToken: this.jwtService.sign({ id }),
    };
  }

  async register(payload: RegisterDto) {
    const existsUser = this.users.find((el) => payload.phone == el.phone);
    if (existsUser) throw new ConflictException('User already exists');

    const newUser = {
      id: this.users.length ? this.users[this.users.length - 1].id + 1 : 1,
      fullname: payload.fullname,
      age: payload.age,
      phone: payload.phone,
      password: await bcrypt.hash(payload.password, 10),
    };

    this.users.push(newUser);

    return this.generateToken(newUser.id);
  }

  async login(payload: LoginDto) {
    const existsUser = this.users.find((el) => el.phone == payload.phone);
    if (!existsUser) throw new NotFoundException('User not registered');

    const isPasswordMatch = await bcrypt.compare(payload.password, existsUser.password);
    if (!isPasswordMatch) throw new BadRequestException('Phone or password incorrect');

    return this.generateToken(existsUser.id);
  }

  getAll() {
    return this.users;
  }
}

