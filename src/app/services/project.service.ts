import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Project } from '../models/project.model';
import {Image} from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = 'http://localhost:3000/ateliercanopee/api';
  projects: Project[];
  project: Project;
  images: Image[];

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  getProjectById(id: number) {
      return this.http.get(`${this.baseUrl}/project-list`).pipe(
          map((res) => {
              this.projects = res['data'].filter(project => project.id === id);
              return this.projects;
          }),

          catchError(this.handleError)
      );
  }

  getParticularProjects(): Observable<Project[]> {
        return this.http.get(`${this.baseUrl}/project-list`).pipe(
            map((res) => {
                this.projects = res['data'].filter(project => project.type === 'Particuliers');
                return this.projects;
            }),

            catchError(this.handleError)
        );
  }

  getCommercialProjects(): Observable<Project[]> {
    return this.http.get(`${this.baseUrl}/project-list`).pipe(
        map((res) => {
            this.projects = res['data'].filter(project => project.type === 'Commercial');
            return this.projects;
        }),

        catchError(this.handleError)
    );
  }

  getCollectifProjects(): Observable<Project[]> {
    return this.http.get(`${this.baseUrl}/project-list`).pipe(
        map((res) => {
            this.projects = res['data'].filter(project => project.id === 'Collectif');
            return this.projects;
        }),

        catchError(this.handleError)
    );
    }

  getAll(): Observable<Project[]> {
    return this.http.get(`${this.baseUrl}/project-list`).pipe(
        map((res) => {
          this.projects = res['data'];
          return this.projects;
        }),
        catchError(this.handleError)
    );
  }

  getHomeProject(): Observable<Project[]> {
      return this.http.get(`${this.baseUrl}/project-list-home`).pipe(
          map((res) => {
              this.projects = res['data'];
              return this.projects;
          }),
          catchError(this.handleError)
      );
  }

  getImageProject(id: number): Observable<Image[]> {
    return this.http.get(`${this.baseUrl}/project-image`).pipe(
        map((res) => {
            this.images = res['data'].filter(image => image.projectId === id);
            return this.images;
        }),
        catchError(this.handleError)
    );
  }

  addProject(project: Project): Observable<Project[]> {
        return this.http.post(`${this.baseUrl}/add-project`, { data: project })
            .pipe(
                map((res) => {
                    this.projects.push(res['data']);
                    return this.projects;
                }),
                catchError(this.handleError));
  }
}
