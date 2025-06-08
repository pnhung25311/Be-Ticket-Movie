import { Injectable } from '@nestjs/common';
import { SupabaseService } from './database/supabase.service';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('run server susscess');
    return 'Hello World!';
  }
}
