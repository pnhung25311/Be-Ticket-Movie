import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register-user')
  register(@Body() dto: RegisterUserDto) {
    return this.usersService.RegiterUser(dto);
  }
  @Post('login-user/')
  login(@Body() dto: LoginUserDto) {
    console.log(dto);
    return this.usersService.LoginUser(dto);
  }
}
