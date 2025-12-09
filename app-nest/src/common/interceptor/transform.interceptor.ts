import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
        message: null,
      })),
    );
  }
}