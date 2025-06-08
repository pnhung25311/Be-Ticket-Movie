import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import {SupabaseService} from './database/supabase.service'
import {UserService } from './users/user.service'

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],

  controllers: [AppController],
  providers: [AppService, SupabaseService, UserService], 
})
export class AppModule {}
