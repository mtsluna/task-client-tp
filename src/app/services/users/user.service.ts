import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL = 'https://sandez.herokuapp.com/api/'

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL+'auth/list');
  }

  register(user: any) {
    return this.http.post<any>(this.BASE_URL+'auth/register', user);
  }

}
