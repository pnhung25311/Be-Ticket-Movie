import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import {SupabaseService} from './database/supabase.service'
import { UserModule } from './User/user.modules';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService, SupabaseService, ], 
})
export class AppModule {}
