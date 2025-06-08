// user.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../database/supabase.service';

@Injectable()
export class UserService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getUsers() {
    const { data, error } = await this.supabaseService.getClient()
      .from('Test')
      .select('*');

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, data };
  }
}
