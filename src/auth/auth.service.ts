import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET;
  private readonly jwtRefresh = process.env.JWT_REFRESH_SECRET;

  generateToken(payload: any): string {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }

  refreshToken (payload: any): string {
    return jwt.sign(payload, this.jwtRefresh, { expiresIn: '7d' });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
