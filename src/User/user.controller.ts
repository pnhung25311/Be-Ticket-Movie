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

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register-user')
  create(@Body() dto: RegisterUserDto) {
    return this.usersService.RegiterUser(dto);
  }
}
