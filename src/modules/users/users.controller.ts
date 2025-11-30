import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  UseFilters,
  UseGuards,
  Post,
  Body,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { MyHttpExceptionFilter } from 'src/exceptionFilter/http-exception';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { UserRole } from 'src/type/user.role';
import { Roles } from 'src/decorator/roles';
import {
  CreateUserSchema,
  JoiValidationPipe,
} from 'src/pipe/validation/joi';

@UseFilters(MyHttpExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get()
  getUsers(
    @Query('id', new DefaultValuePipe(100), ParseIntPipe)
    id: number,
  ) {
    return 'User malumoti:';
  }

  @Post()
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  createUser(@Body() payload: any) {
    return 'success';
  }
}
