import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggingInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: (value) => console.log(value),
        error: (err) => console.log(err),
        complete: () => console.log('complete tap'),
        // (response) => console.log('Oh boy we got an answer'),
        //     (error) => console.log('Something might be burning back there')
      })
    );
  }
}
