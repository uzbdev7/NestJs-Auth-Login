import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private tokenParsBearrer(req: Request) {
    let type = req.headers.authorization?.split(' ')[0];
    let token = req.headers.authorization?.split(' ')[1];

    return type == 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = await this.tokenParsBearrer(req);
    console.log(token);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'shaftoli',
      });
      req['user'] = payload;
      console.log(payload);

      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
