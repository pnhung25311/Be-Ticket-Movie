import { AuthService } from './../auth/auth.service';
import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { SupabaseService } from 'src/database/supabase.service';
import { Customer } from '../utils/customer';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly authService: AuthService,
  ) {}
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
        if ((error.code = '23505'))
          return {
            status: 0,
            notification: 'Email already exists.',
            message: error.message,
          };
        throw new Error(error.message);
      }

      return { status: 1, message: 'Register successfully' };
    } catch (err) {
      console.error('Error in RegiterUser:', err);
      return {
        status: 0,
        message: 'Register failed',
        detail: err.message || err,
      };
    }
  }

  async LoginUser(dto: LoginUserDto) {
    try {
      const { data, error } = await this.supabaseService
        .getClient()
        .from('users')
        .select('*')
        .eq('email', dto.email)
        .single();
      // console.log(data);

      if (!data || error) {
        console.error('Supabase error detail:', error);
        return {
          status: 0,
          message: 'Incorrect email or password',
        };
      }

      const payload = { user_id: data.user_id, role: data.role };

      const token = this.authService.generateToken(payload);
      const refreshToken = this.authService.refreshToken(payload);
      const hashedRefreshToken = await this.customer.hashPassword(refreshToken);

      await this.setCurrentRefreshToken(data.user_id, hashedRefreshToken + '');

      const ReturnData = (await this.customer.comparePassword(
        dto.password,
        data.password_hash,
      ))
        ? {
            status: 1,
            message: 'Login successfully',
            data: data,
            token: token,
            refreshToken: refreshToken,
          }
        : { status: 0, message: 'Incorrect email or password' };

      // if (error) {
      //   console.error('Supabase error detail:', error);
      //   throw new Error(error.message);
      // }
      return ReturnData;
    } catch (err) {
      console.error('Error in LoginUser:', err);
      return {
        status: 0,
        message: 'Incorrect email or password',
        detail: err.message || err,
      };
    }
  }
  
  async setCurrentRefreshToken(userId: string, refreshToken: string) {
    console.log('Updating refresh token for user:', userId);
    console.log('New hashed refresh token:', refreshToken);

    const { error } = await this.supabaseService
      .getClient()
      .from('users')
      .update({ hashedRefreshToken: refreshToken })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating refresh token:', error);
      throw new Error(error.message);
    }
  }
}
