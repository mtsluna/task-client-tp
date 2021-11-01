import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, switchMap, take} from 'rxjs/operators';
import {TokenService} from '../services/token/token.service';
import {Token} from '../models/Token';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router) {}
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(!request.url.includes("/auth") || request.url.includes("/auth/list")){
      if(!request.url.includes('/workspaces/name')){
        if(this.tokenService.getTokenFromStorage() != ''){
          try {
            // @ts-ignore
            request = this.addAuthToken(request, JSON.parse(this.tokenService.getTokenFromStorage())["access_token"]);
          } catch (e) {
            localStorage.clear();
            this.router.navigate(['/login']);
          }

        }
      }
    }

    // @ts-ignore
    return next.handle(request).pipe(
      catchError(error => {
        if(error instanceof HttpErrorResponse && (error.status === 403)){
          return this.handle401Error(request, next);
        }
        else{
          if(error instanceof HttpErrorResponse && error.status === 401){
            this.router.navigate(['login']);
          }
          return throwError(error);
        }
      })
    );

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.tokenService.getTokenForRefreshHttp().pipe(
        switchMap((token: Token) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access_token);

          return next.handle(this.addAuthToken(request, token.access_token));
        })
      );

    } else {
      return this.refreshTokenSubject.pipe(
        take(1),
        switchMap(token => {
          return next.handle(this.addAuthToken(request, token));
        }));
    }
  }

  addAuthToken(request: HttpRequest<any>, token: string | null){
    request = request.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + token
      }
    });
    return request;
  }
}
