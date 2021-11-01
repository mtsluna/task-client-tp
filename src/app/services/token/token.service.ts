import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Token} from '../../models/Token';
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  BASE_URL = 'http://localhost:8080/api/'

  constructor(private http: HttpClient) { }

  getTokenForLoginHttp(login: any): Observable<Token>{

    return this.http.post<Token>(this.BASE_URL+'auth/login',login);
  }

  getTokenForRefreshHttp(){
    // @ts-ignore
    let token: Token = {
      refresh_token: <any>this.getRefreshTokenFromStorage()
    };
    return this.http.post<Token>(this.BASE_URL+'auth/refresh', token).pipe(
      tap((data)=>{
        this.saveTokenInStorage(JSON.stringify(data));
      })
    );
  }

  saveTokenInStorage(token: any): void {
    localStorage.setItem('token', token);
  }

  getTokenFromStorage(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshTokenFromStorage(): string | null {
    return "Bearer "+JSON.parse(<string>localStorage.getItem('token'))["refresh_token"];
  }
}
