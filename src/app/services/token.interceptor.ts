import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


console.log("token interceptor");
    const token: string = this.authService.token;
    let req;
    const options: any = {};
    options.url = environment.BASE_URL + request.url;

    if (token) {
      options.headers = request.headers.set('Authorization', `Bearer ${token}`);
    }
    req = request.clone({
      ...options
    });
    console.log(req.headers);

    return next.handle(req).pipe(tap(this.setToken.bind(this)));
  }

  setToken(response: HttpResponse<any>) {
    if (response && response.type !== 0) {
      let token = response.headers.get('Authorization');
      if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }

      if (token) {
        this.authService.token = token;
      }
    }
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    console.log("error interceptor");

    return next.handle(request);
  }
}
