import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { SupabaseService } from 'src/database/supabase.service';
import { Customer } from '../utils/customer';

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}
  private customer = new Customer();

  async RegiterUser(dto: RegisterUserDto) {
    try {
      console.log(dto.email + ' ' + dto.name);
      console.log(dto.password + ' ' + dto.phone);

      const hashed = await this.customer.hashPassword(dto.password);
      const id_user = this.customer.generateCode();

      console.log(hashed);
      console.log(id_user);

      const { data, error } = await this.supabaseService
        .getClient()
        .from('users')
        .insert([
          {
            user_id: id_user,
            name: dto.name,
            email: dto.email,
            password_hash: hashed,
            phone: dto.phone,
          },
        ]);

      if (error) {
        console.error('Supabase error detail:', error);
        if(error.code = '23505') return {status: 0, notification:"Email already exists.", message: error.message}
        throw new Error(error.message);
      }

      return { status: 1, message: 'Register successfully' };
    } catch (err) {
      console.error('Error in RegiterUser:', err);
      return { status: 0, message: 'Register failed', detail: err.message || err };
    }
  }
}
