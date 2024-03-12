import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: any, host: ArgumentsHost) {
    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      message = exception.message;
      status = exception.getStatus();
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(status).json({
      message,
      statusCode: status,
      ...(this.configService.get('NODE_ENV') === 'development'
        ? { error: { stack: exception.stack, response: exception.response } }
        : {}),
    });
  }
}
