import { AuthModule } from './../auth/auth.modules';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule,],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {}