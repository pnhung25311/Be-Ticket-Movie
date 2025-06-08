// supabase.service.ts
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL!; // URL Supabase của bạn
    const supabaseKey = process.env.SUPABASE_KEY!; // Key API hoặc anon key

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('SUPABASE_URL or SUPABASE_KEY is not defined');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
    this.testConnection();
  }

  getClient() {
    return this.supabase;
  }

  // Ví dụ 1 hàm lấy dữ liệu từ bảng 'users'
  async getUsers() {
    const { data, error } = await this.supabase.from('Test').select('*');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  testConnection = async () => {  
    try {
      const { data, error } = await this.supabase
        .from('Test') // 🔁 đổi tên bảng thật ở đây
        .select('*')
        .limit(10);
      console.log(data?.length);
      if (error) {
        console.error('❌ Supabase connection failed:', error.message);
      } else {
        console.log('✅ Supabase connected successfully');
      }
    } catch (err) {
      console.error('❌ Error connecting to Supabase:', err.message);
    }  
  };
}
