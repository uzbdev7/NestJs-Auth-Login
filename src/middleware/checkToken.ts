import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export class CheckToken implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    const token = req.headers.authorization;

    if (!token) throw new UnauthorizedException('Token not found.');

    next();
  }
}
