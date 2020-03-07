import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { User } from '../models/user.model';

interface IsLoggedIn {
    status: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = 'http://www.ateliercanopee.com/api';

  redirectUrl: string;

  users: User[];
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  getusers(): Observable<User[]> {
    return this.http.get(`${this.baseUrl}/users.php`).pipe(
        map((res) => {
          this.users = res['data'];
          return this.users;
        }),
        catchError(this.handleError)
    );
  }

  public userLogin(email, password) {
    return this.http.post<User>(`${this.baseUrl}/login.php`, { email, password })
        .pipe(map(user => {
          this.setToken(user[0].email);
          this.getLoggedInName.emit(true);
          return user;
        }));
  }

  public userRegistration(email, password) {
    return this.http.post<User>(`${this.baseUrl}/registration.php`, { email, password })
        .pipe(map(user => {
          return user;
        }));
  }

  // token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const userToken = this.getToken();
    if (userToken != null) {
      return true;
    }
    return false;
  }
}
