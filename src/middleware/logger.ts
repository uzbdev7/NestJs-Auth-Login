import { NextFunction, Request, Response } from 'express';

export function MyLoggger(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl, req.method);

  next();
}
