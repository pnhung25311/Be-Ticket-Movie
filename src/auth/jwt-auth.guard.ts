import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const [, token] = authHeader.split(' '); // Bearer <token>

    try {
      const decoded = this.authService.verifyToken(token);
      request.user = decoded; // gắn thông tin user cho các handler khác dùng
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
