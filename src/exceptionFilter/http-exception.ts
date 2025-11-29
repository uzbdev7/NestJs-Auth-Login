import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import path from 'path';

@Catch(HttpException)
export class MyHttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const status = exception.status;
    const message = exception.getResponse();

    return res.status(status).json({
      success: false,
      statuscode: status,
      message,
      path: req.path,
    });
  }
}
