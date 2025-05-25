import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ApiException } from './api.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const message = exception.getResponse();

    if (exception instanceof ApiException) {
      response.status(status).json({
        status: exception.getErrorCode(),
        timestamp: new Date().toLocaleString(),
        path: request.url,
        message: exception.getErrorMessage(),
      });
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      message,
    });
  }
}
