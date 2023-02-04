import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncryptionService } from '../encryption.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private encryptionService: EncryptionService) { }

  private token: string = null;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const that = this;
    let request2;
    this.token = JSON.parse(localStorage.getItem("AuthToken"));
    if (this.token != null && this.token != undefined) {
      request2 = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.token
        }
      });
    }

    return next.handle(request2);
  }
}
