import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('profile')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Req() req) {
    return req.user; // user đã được gắn ở JwtAuthGuard
  }
}
