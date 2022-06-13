import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectableObservable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = localStorage.getItem('accessToken');
    let authReq;
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (authToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          'Content-type': 'application/json',
          Accept: 'application/vnd.bremeninc.v1+json'
        }
      });
    } else {
      authReq = req.clone({
        setHeaders: {
          'Content-type': 'application/json',
          Accept: 'application/vnd.bremeninc.v1+json'
        }
      });
    }

    return next.handle(authReq);
    // send cloned request with header to the next handler.
  }
}
