import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Project } from '../models/project.model';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = 'http://www.ateliercanopee.com/api';
  projects: Project[];
  project: Project;
  images: Image[];

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  getProjectById(id: number) {
      return this.http.get(`${this.baseUrl}/project-list.php`).pipe(
          map((res) => {
              this.projects = res['data'].filter(project => project.id === id);
              return this.projects;
          }),

          catchError(this.handleError)
      );
  }

  getParticularProjects(): Observable<Project[]> {
        return this.http.get(`${this.baseUrl}/project-list.php`).pipe(
            map((res) => {
                this.projects = res['data'].filter(project => project.type === 'Particulier');
                return this.projects;
            }),

            catchError(this.handleError)
        );
  }

  getCommercialProjects(): Observable<Project[]> {
    return this.http.get(`${this.baseUrl}/project-list.php`).pipe(
        map((res) => {
            this.projects = res['data'].filter(project => project.type === 'Commercial');
            return this.projects;
        }),

        catchError(this.handleError)
    );
  }

  getCollectifProjects(): Observable<Project[]> {
    return this.http.get(`${this.baseUrl}/project-list.php`).pipe(
        map((res) => {
            this.projects = res['data'].filter(project => project.type === 'Collectif');
            return this.projects;
        }),

        catchError(this.handleError)
    );
    }

  getAll(): Observable<Project[]> {
    return this.http.get(`${this.baseUrl}/project-list.php`).pipe(
        map((res) => {
          this.projects = res['data'];
          return this.projects;
        }),
        catchError(this.handleError)
    );
  }

  getHomeProject(): Observable<Project[]> {
      return this.http.get(`${this.baseUrl}/project-list-home.php`).pipe(
          map((res) => {
              this.projects = res['data'];
              return this.projects;
          }),
          catchError(this.handleError)
      );
  }

  getImageProject(id: number): Observable<Image[]> {
    return this.http.get(`${this.baseUrl}/project-image.php`).pipe(
        map((res) => {
            this.images = res['data'].filter(image => image.projectId === id);
            return this.images;
        }),
        catchError(this.handleError)
    );
  }

  addProject(project: Project): Observable<Project[]> {
        return this.http.post(`${this.baseUrl}/add-project.php`, { data: project })
            .pipe(
                map((res) => {
                    this.projects.push(res['data']);
                    return this.projects;
                }),
                catchError(this.handleError));
  }

  updateProject(project: Project): Observable<Project[]> {
        return this.http.put(`${this.baseUrl}/update-project.php`, {data: project})
            .pipe(map((res) => {
                    const theProject = this.projects.find((item) => {
                        return +item['id'] === +project['id'];
                    });
                    if (theProject) {
                        theProject['title'] = project['title'];
                        theProject['subTitle'] = project['subTitle'];
                        theProject['type'] = project['type'];
                        theProject['description'] = project['description'];
                        theProject['location'] = project['location'];
                        theProject['realisationDate'] = project['realisationDate'];
                        theProject['surface'] = project['surface'];
                        theProject['process'] = project['process'];
                        theProject['image'] = project['image'];
                        theProject['imageFormat'] = project['imageFormat'];
                    }
                    return this.projects;
                }),
                catchError(this.handleError));
  }

  deleteProject(id: number): Observable<Project[]> {
        const params = new HttpParams()
            .set('id', id.toString());

        return this.http.delete(`${this.baseUrl}/delete-project.php`, { params: params })
            .pipe(map(res => {
                    const filteredProjects = this.projects.filter((car) => {
                        return +car['id'] !== +id;
                    });
                    return this.projects = filteredProjects;
                }),
                catchError(this.handleError));
  }

}
