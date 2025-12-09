// src/common/exceptions/exception.factory.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionFactory {
  static notFound(message = 'Resource not found') {
    return new HttpException({ status: HttpStatus.NOT_FOUND, error: message }, HttpStatus.NOT_FOUND);
  }
  static conflict(message = 'Conflict') {
    return new HttpException({ status: HttpStatus.CONFLICT, error: message }, HttpStatus.CONFLICT);
  }
  static badRequest(message = 'Bad request') {
    return new HttpException({ status: HttpStatus.BAD_REQUEST, error: message }, HttpStatus.BAD_REQUEST);
  }
}