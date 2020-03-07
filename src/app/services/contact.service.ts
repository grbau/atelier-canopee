import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  ServerUrl = 'http://localhost:3000/ateliercanopee/api';
  baseUrl = 'http://www.ateliercanopee.com/api';
  errorData;
  contact: Contact;
  contacts: Contact[];

  // httpOptions = {
  //   headers: new HttpHeaders({'Content-Type': 'application/json'})
  // };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
        console.log(error);

        // return an observable with a user friendly message
        return throwError('Error! something went wrong.');
  }

  contactForm(contact: Contact): Observable<Contact[]> {
        return this.http.post(`${this.baseUrl}/contact.php`, { data: contact })
            .pipe(
                map((res) => {
                    this.contacts.push(res['data']);
                    return this.contacts;
                }),
                catchError(this.handleError));
  }

  // contactForm(formData: Contact) {
  //       return this.http.post<Contact>(this.ServerUrl + '/contact', formData, this.httpOptions).pipe(
  //           catchError(this.handleError)
  //       );
  // }
}
